-- ============================================================================
-- ProofBridge — Atomic Business Functions (P0)
-- Strict State Transitions, Multi-Row Integrity & Outbox Creation
-- Version: 1.0 (IIC 3.0 MUJ Final)
-- ============================================================================

-- 1. FUNCTION: publish_opportunity
-- Validates weights sum to 100, approved employer, and published status
CREATE OR REPLACE FUNCTION publish_opportunity(
    p_opportunity_id UUID,
    p_actor_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_employer_id UUID;
    v_status TEXT;
    v_total_weight INT;
    v_org_status TEXT;
    v_version INT;
BEGIN
    -- Check opportunity existence and lock row
    SELECT employer_org_id, status, version 
    INTO v_employer_id, v_status, v_version
    FROM opportunities
    WHERE id = p_opportunity_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'NOT_FOUND: Opportunity does not exist';
    END IF;

    IF v_status != 'draft' THEN
        RAISE EXCEPTION 'STATE_CONFLICT: Only draft opportunities can be published';
    END IF;

    -- Check actor membership in employer org
    IF NOT EXISTS (
        SELECT 1 FROM memberships
        WHERE org_id = v_employer_id AND user_id = p_actor_id AND role IN ('recruiter', 'admin') AND status = 'active'
    ) THEN
        RAISE EXCEPTION 'FORBIDDEN: Actor is not an active recruiter for this organization';
    END IF;

    -- Check employer organization approval
    SELECT status INTO v_org_status FROM organizations WHERE id = v_employer_id;
    IF v_org_status != 'approved' THEN
        RAISE EXCEPTION 'ORGANIZATION_NOT_APPROVED: Employer organization must be approved to publish';
    END IF;

    -- Validate skills weights sum to exactly 100
    SELECT COALESCE(SUM(weight), 0) INTO v_total_weight
    FROM opportunity_skills
    WHERE opportunity_id = p_opportunity_id;

    IF v_total_weight != 100 THEN
        RAISE EXCEPTION 'VALIDATION_ERROR: Opportunity skill weights must total 100, got %', v_total_weight;
    END IF;

    -- Update opportunity
    UPDATE opportunities
    SET status = 'published',
        version = version + 1,
        updated_at = now()
    WHERE id = p_opportunity_id;

    -- Insert Audit Event
    INSERT INTO audit_events (actor_id, action, entity_type, entity_id, org_id, reason)
    VALUES (p_actor_id, 'PUBLISH_OPPORTUNITY', 'opportunity', p_opportunity_id, v_employer_id, 'Opportunity published by recruiter');

    RETURN jsonb_build_object(
        'opportunity_id', p_opportunity_id,
        'status', 'published',
        'new_version', v_version + 1
    );
END;
$$;

-- 2. FUNCTION: finalize_submission
-- Locks draft revision, validates non-empty work, sets submitted_at
CREATE OR REPLACE FUNCTION finalize_submission(
    p_submission_id UUID,
    p_actor_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_student_id UUID;
    v_challenge_id UUID;
    v_current_rev INT;
    v_deadline TIMESTAMPTZ;
    v_status TEXT;
    v_revision_id UUID;
    v_body TEXT;
BEGIN
    SELECT student_id, challenge_id, current_revision, status
    INTO v_student_id, v_challenge_id, v_current_rev, v_status
    FROM submissions
    WHERE id = p_submission_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'NOT_FOUND: Submission does not exist';
    END IF;

    IF v_student_id != p_actor_id THEN
        RAISE EXCEPTION 'FORBIDDEN: You do not own this submission';
    END IF;

    -- Check challenge deadline
    SELECT deadline INTO v_deadline FROM challenges WHERE id = v_challenge_id;
    IF v_deadline < now() THEN
        RAISE EXCEPTION 'DEADLINE_PASSED: Challenge submission deadline has passed';
    END IF;

    -- Check revision content
    SELECT id, body INTO v_revision_id, v_body
    FROM submission_revisions
    WHERE submission_id = p_submission_id AND revision_no = v_current_rev;

    IF NOT FOUND OR trim(v_body) = '' THEN
        RAISE EXCEPTION 'VALIDATION_ERROR: Cannot finalize an empty submission revision';
    END IF;

    -- Update revision and submission
    UPDATE submission_revisions
    SET submitted_at = now()
    WHERE id = v_revision_id;

    UPDATE submissions
    SET status = 'submitted',
        version = version + 1,
        updated_at = now()
    WHERE id = p_submission_id;

    -- Record event
    INSERT INTO submission_events (submission_id, revision_id, actor_id, action, reason)
    VALUES (p_submission_id, v_revision_id, p_actor_id, 'SUBMITTED', 'Finalized by student');

    RETURN jsonb_build_object(
        'submission_id', p_submission_id,
        'revision_id', v_revision_id,
        'status', 'submitted'
    );
END;
$$;

-- 3. FUNCTION: publish_review
-- Atomically creates review, scores, skill_attainments, and outbox notification
CREATE OR REPLACE FUNCTION publish_review(
    p_assignment_id UUID,
    p_actor_id UUID,
    p_scores JSONB -- Array of {criterion_id, level, rationale}
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_reviewer_id UUID;
    v_revision_id UUID;
    v_status TEXT;
    v_submission_id UUID;
    v_student_id UUID;
    v_review_id UUID;
    v_score_item JSONB;
    v_criterion_id UUID;
    v_skill_id UUID;
    v_level INT;
    v_rationale TEXT;
    v_attainments_count INT := 0;
BEGIN
    -- Check assignment and lock
    SELECT reviewer_id, revision_id, status
    INTO v_reviewer_id, v_revision_id, v_status
    FROM reviewer_assignments
    WHERE id = p_assignment_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'NOT_FOUND: Reviewer assignment not found';
    END IF;

    IF v_reviewer_id != p_actor_id THEN
        RAISE EXCEPTION 'FORBIDDEN: You are not the assigned reviewer';
    END IF;

    -- Get student information
    SELECT s.id, s.student_id
    INTO v_submission_id, v_student_id
    FROM submission_revisions sr
    JOIN submissions s ON s.id = sr.submission_id
    WHERE sr.id = v_revision_id;

    -- Check self-review prohibition
    IF v_student_id = p_actor_id THEN
        RAISE EXCEPTION 'FORBIDDEN: Reviewers cannot review their own submissions';
    END IF;

    -- Insert Review row
    INSERT INTO reviews (assignment_id, revision_id, reviewer_id, status, published_at)
    VALUES (p_assignment_id, v_revision_id, p_actor_id, 'published', now())
    RETURNING id INTO v_review_id;

    -- Iterate and insert scores + attainments
    FOR v_score_item IN SELECT * FROM jsonb_array_elements(p_scores)
    LOOP
        v_criterion_id := (v_score_item->>'criterion_id')::UUID;
        v_level := (v_score_item->>'level')::INT;
        v_rationale := v_score_item->>'rationale';

        IF v_level < 0 OR v_level > 4 THEN
            RAISE EXCEPTION 'VALIDATION_ERROR: Review level must be between 0 and 4';
        END IF;

        -- Get mapped skill
        SELECT skill_id INTO v_skill_id
        FROM rubric_criteria
        WHERE id = v_criterion_id;

        IF NOT FOUND THEN
            RAISE EXCEPTION 'VALIDATION_ERROR: Criterion ID % does not exist', v_criterion_id;
        END IF;

        -- Insert score
        INSERT INTO review_scores (review_id, criterion_id, level, rationale)
        VALUES (v_review_id, v_criterion_id, v_level, v_rationale);

        -- If level > 0, insert skill attainment
        IF v_level > 0 THEN
            INSERT INTO skill_attainments (student_id, skill_id, review_id, criterion_id, level, reviewed_at)
            VALUES (v_student_id, v_skill_id, v_review_id, v_criterion_id, v_level, now());
            v_attainments_count := v_attainments_count + 1;
        END IF;
    END LOOP;

    -- Update assignment and submission
    UPDATE reviewer_assignments
    SET status = 'completed', updated_at = now()
    WHERE id = p_assignment_id;

    UPDATE submissions
    SET status = 'reviewed', version = version + 1, updated_at = now()
    WHERE id = v_submission_id;

    -- Insert Outbox Event for in-app notification
    INSERT INTO outbox_events (type, payload_json, status)
    VALUES (
        'REVIEW_PUBLISHED',
        jsonb_build_object(
            'student_id', v_student_id,
            'review_id', v_review_id,
            'submission_id', v_submission_id,
            'attainments_count', v_attainments_count
        ),
        'pending'
    );

    -- Insert Notification directly for P0 instant display
    INSERT INTO notifications (recipient_id, title, message)
    VALUES (
        v_student_id,
        'Evidence Reviewed',
        format('Your submission has been reviewed. %s skill attainment(s) created.', v_attainments_count)
    );

    RETURN jsonb_build_object(
        'review_id', v_review_id,
        'status', 'published',
        'submission_status', 'reviewed',
        'attainments_created', v_attainments_count
    );
END;
$$;

-- 4. FUNCTION: submit_application
-- Freezes application snapshot and creates scoped evidence grants
CREATE OR REPLACE FUNCTION submit_application(
    p_opportunity_id UUID,
    p_student_id UUID,
    p_selected_revisions UUID[],
    p_snapshot JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_opp_status TEXT;
    v_opp_deadline TIMESTAMPTZ;
    v_employer_id UUID;
    v_app_id UUID;
    v_rev_id UUID;
    v_rev_owner UUID;
BEGIN
    -- Check opportunity status and deadline
    SELECT status, deadline, employer_org_id
    INTO v_opp_status, v_opp_deadline, v_employer_id
    FROM opportunities
    WHERE id = p_opportunity_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'NOT_FOUND: Opportunity not found';
    END IF;

    IF v_opp_status != 'published' THEN
        RAISE EXCEPTION 'STATE_CONFLICT: Can only apply to published opportunities';
    END IF;

    IF v_opp_deadline < now() THEN
        RAISE EXCEPTION 'DEADLINE_PASSED: Opportunity application deadline has passed';
    END IF;

    -- Check for duplicate application
    IF EXISTS (
        SELECT 1 FROM applications 
        WHERE student_id = p_student_id AND opportunity_id = p_opportunity_id
    ) THEN
        RAISE EXCEPTION 'DUPLICATE_APPLICATION: You have already applied for this opportunity';
    END IF;

    -- Insert Application with frozen snapshot
    INSERT INTO applications (student_id, opportunity_id, status, snapshot_json)
    VALUES (p_student_id, p_opportunity_id, 'submitted', p_snapshot)
    RETURNING id INTO v_app_id;

    -- Record initial application event
    INSERT INTO application_events (application_id, actor_id, to_status, reason)
    VALUES (v_app_id, p_student_id, 'submitted', 'Student submitted application with selected evidence');

    -- Validate ownership of selected revisions and create grants
    IF p_selected_revisions IS NOT NULL THEN
        FOREACH v_rev_id IN ARRAY p_selected_revisions
        LOOP
            SELECT s.student_id INTO v_rev_owner
            FROM submission_revisions sr
            JOIN submissions s ON s.id = sr.submission_id
            WHERE sr.id = v_rev_id;

            IF v_rev_owner != p_student_id THEN
                RAISE EXCEPTION 'EVIDENCE_NOT_OWNED: You cannot share evidence you do not own';
            END IF;

            -- Attach to application
            INSERT INTO application_evidence (application_id, revision_id)
            VALUES (v_app_id, v_rev_id);

            -- Create scoped grant for employer
            INSERT INTO evidence_grants (application_id, revision_id, employer_org_id)
            VALUES (v_app_id, v_rev_id, v_employer_id);
        END LOOP;
    END IF;

    RETURN jsonb_build_object(
        'application_id', v_app_id,
        'status', 'submitted',
        'applied_at', now()
    );
END;
$$;

-- 5. FUNCTION: transition_application
-- Recruiter or student status transition with expected_version concurrency
CREATE OR REPLACE FUNCTION transition_application(
    p_application_id UUID,
    p_actor_id UUID,
    p_to_status TEXT,
    p_reason TEXT,
    p_expected_version INT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_curr_status TEXT;
    v_curr_version INT;
    v_student_id UUID;
    v_opp_id UUID;
    v_employer_id UUID;
BEGIN
    SELECT a.status, a.version, a.student_id, a.opportunity_id, o.employer_org_id
    INTO v_curr_status, v_curr_version, v_student_id, v_opp_id, v_employer_id
    FROM applications a
    JOIN opportunities o ON o.id = a.opportunity_id
    WHERE a.id = p_application_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'NOT_FOUND: Application not found';
    END IF;

    -- Concurrency check
    IF v_curr_version != p_expected_version THEN
        RAISE EXCEPTION 'VERSION_CONFLICT: Expected version % does not match current version %', p_expected_version, v_curr_version;
    END IF;

    -- If student is withdrawing
    IF p_to_status = 'withdrawn' THEN
        IF p_actor_id != v_student_id THEN
            RAISE EXCEPTION 'FORBIDDEN: Only the student can withdraw an application';
        END IF;

        -- Revoke all active evidence grants
        UPDATE evidence_grants
        SET revoked_at = now()
        WHERE application_id = p_application_id AND revoked_at IS NULL;
    ELSE
        -- Recruiter transition: check membership
        IF NOT EXISTS (
            SELECT 1 FROM memberships
            WHERE org_id = v_employer_id AND user_id = p_actor_id AND role IN ('recruiter', 'admin') AND status = 'active'
        ) THEN
            RAISE EXCEPTION 'FORBIDDEN: Only the owning employer can update application status';
        END IF;
    END IF;

    -- Update application status
    UPDATE applications
    SET status = p_to_status,
        version = version + 1,
        updated_at = now()
    WHERE id = p_application_id;

    -- Record event
    INSERT INTO application_events (application_id, actor_id, from_status, to_status, reason)
    VALUES (p_application_id, p_actor_id, v_curr_status, p_to_status, p_reason);

    RETURN jsonb_build_object(
        'application_id', p_application_id,
        'from_status', v_curr_status,
        'to_status', p_to_status,
        'version', v_curr_version + 1
    );
END;
$$;
