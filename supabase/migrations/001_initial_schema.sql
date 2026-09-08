-- ============================================================================
-- ProofBridge — Initial Schema Migration (P0)
-- 24 Relational Entities with Strict Constraints, Foreign Keys & Indexes
-- Version: 1.0 (IIC 3.0 MUJ Final)
-- ============================================================================

-- Enable pgcrypto for UUID generation if not enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. PROFILES (Base user identity)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_name TEXT NOT NULL,
    timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. ORGANIZATIONS (Academic institutions & Employers)
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kind TEXT NOT NULL CHECK (kind IN ('institution', 'employer')),
    name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
    version INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. MEMBERSHIPS (User-to-Organization role mappings)
CREATE TABLE IF NOT EXISTS memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('recruiter', 'reviewer', 'coordinator', 'admin')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'pending')),
    version INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_org_user_role UNIQUE (org_id, user_id, role)
);

-- 4. STUDENT_PROFILES (Student-specific academic metadata)
CREATE TABLE IF NOT EXISTS student_profiles (
    user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    headline TEXT,
    program TEXT NOT NULL,
    graduation_year INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. ENROLLMENTS (Student enrolled in an institution)
CREATE TABLE IF NOT EXISTS enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    institution_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'withdrawn', 'completed')),
    consent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_active_student_enrollment UNIQUE (student_id)
);

-- 6. PLATFORM_ADMINS (Exceptional administrative access)
CREATE TABLE IF NOT EXISTS platform_admins (
    user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    granted_by UUID REFERENCES profiles(id),
    granted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. SKILLS (Curated canonical catalog)
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. SKILL_ALIASES (Normalized alias lookup)
CREATE TABLE IF NOT EXISTS skill_aliases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    normalized_alias TEXT NOT NULL UNIQUE
);

-- 9. DECLARED_SKILLS (Unverified student claims)
CREATE TABLE IF NOT EXISTS declared_skills (
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    claimed_level INT NOT NULL CHECK (claimed_level BETWEEN 1 AND 4),
    declared_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (student_id, skill_id)
);

-- 10. OPPORTUNITIES (Internship & placement postings)
CREATE TABLE IF NOT EXISTS opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employer_org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'closed', 'archived')),
    deadline TIMESTAMPTZ NOT NULL,
    work_mode TEXT NOT NULL CHECK (work_mode IN ('remote', 'hybrid', 'onsite')),
    location_text TEXT,
    duration_text TEXT NOT NULL,
    compensation_kind TEXT NOT NULL CHECK (compensation_kind IN ('paid', 'unpaid', 'unspecified')),
    amount_minor INT,
    currency TEXT DEFAULT 'INR',
    pay_period TEXT CHECK (pay_period IN ('month', 'week', 'lump_sum', null)),
    version INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 11. OPPORTUNITY_AUDIENCES (Eligible institutions)
CREATE TABLE IF NOT EXISTS opportunity_audiences (
    opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
    institution_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    PRIMARY KEY (opportunity_id, institution_id)
);

-- 12. OPPORTUNITY_SKILLS (Required skills, levels & weights)
CREATE TABLE IF NOT EXISTS opportunity_skills (
    opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE RESTRICT,
    required_level INT NOT NULL CHECK (required_level BETWEEN 1 AND 4),
    weight INT NOT NULL CHECK (weight BETWEEN 1 AND 100),
    PRIMARY KEY (opportunity_id, skill_id)
);

-- 13. CHALLENGES (Industry challenge briefs & rubrics)
CREATE TABLE IF NOT EXISTS challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employer_org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    brief TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'closed', 'archived')),
    deadline TIMESTAMPTZ NOT NULL,
    effort_minutes INT NOT NULL CHECK (effort_minutes > 0),
    ai_policy TEXT NOT NULL DEFAULT 'allowed_with_disclosure',
    rubric_version INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 14. CHALLENGE_AUDIENCES (Target institutions)
CREATE TABLE IF NOT EXISTS challenge_audiences (
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    institution_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    PRIMARY KEY (challenge_id, institution_id)
);

-- 15. RUBRIC_CRITERIA (Anchored 1–4 levels per skill)
CREATE TABLE IF NOT EXISTS rubric_criteria (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    rubric_version INT NOT NULL DEFAULT 1,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE RESTRICT,
    title TEXT NOT NULL,
    anchors_json JSONB NOT NULL,
    CONSTRAINT unique_challenge_version_skill UNIQUE (challenge_id, rubric_version, skill_id)
);

-- 16. SUBMISSIONS (Student challenge progress)
CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE RESTRICT,
    current_revision INT NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'under_review', 'reviewed', 'changes_requested')),
    version INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_student_challenge UNIQUE (student_id, challenge_id)
);

-- 17. SUBMISSION_REVISIONS (Immutable finalized revisions)
CREATE TABLE IF NOT EXISTS submission_revisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    revision_no INT NOT NULL,
    rubric_version INT NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    contribution TEXT NOT NULL,
    submitted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_submission_revision UNIQUE (submission_id, revision_no)
);

-- 18. EVIDENCE_LINKS (HTTPS reference links for submissions)
CREATE TABLE IF NOT EXISTS evidence_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    revision_id UUID NOT NULL REFERENCES submission_revisions(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    label TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 19. REVIEWER_ASSIGNMENTS (Assigning a reviewer to a revision)
CREATE TABLE IF NOT EXISTS reviewer_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    revision_id UUID NOT NULL REFERENCES submission_revisions(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    assigned_by UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    status TEXT NOT NULL DEFAULT 'assigned' CHECK (status IN ('assigned', 'in_progress', 'completed', 'declined')),
    version INT NOT NULL DEFAULT 1,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 20. REVIEWS (Published human assessments)
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID NOT NULL REFERENCES reviewer_assignments(id) ON DELETE RESTRICT,
    revision_id UUID NOT NULL REFERENCES submission_revisions(id) ON DELETE RESTRICT,
    reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'voided')),
    published_at TIMESTAMPTZ,
    void_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 21. REVIEW_SCORES (Per-criterion score and rationale)
CREATE TABLE IF NOT EXISTS review_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    criterion_id UUID NOT NULL REFERENCES rubric_criteria(id) ON DELETE RESTRICT,
    level INT NOT NULL CHECK (level BETWEEN 0 AND 4),
    rationale TEXT NOT NULL,
    CONSTRAINT unique_review_criterion UNIQUE (review_id, criterion_id)
);

-- 22. SKILL_ATTAINMENTS (Active reviewed proof records)
CREATE TABLE IF NOT EXISTS skill_attainments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE RESTRICT,
    review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    criterion_id UUID NOT NULL REFERENCES rubric_criteria(id) ON DELETE RESTRICT,
    level INT NOT NULL CHECK (level BETWEEN 0 AND 4),
    reviewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    valid_until TIMESTAMPTZ,
    CONSTRAINT unique_attainment_review_criterion UNIQUE (review_id, criterion_id)
);

-- 23. CORRECTION_REQUESTS (Student dispute channel)
CREATE TABLE IF NOT EXISTS correction_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE RESTRICT,
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    resolved_by UUID REFERENCES profiles(id),
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 24. SUBMISSION_EVENTS (Audit log of submission progress)
CREATE TABLE IF NOT EXISTS submission_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    revision_id UUID REFERENCES submission_revisions(id) ON DELETE SET NULL,
    actor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    action TEXT NOT NULL,
    reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 25. APPLICATIONS (Student applies to an opportunity)
CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE RESTRICT,
    status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'shortlisted', 'interview', 'offered', 'accepted', 'rejected', 'withdrawn', 'declined')),
    snapshot_json JSONB NOT NULL,
    version INT NOT NULL DEFAULT 1,
    applied_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_student_opportunity_application UNIQUE (student_id, opportunity_id)
);

-- 26. APPLICATION_EVIDENCE (Selected revisions attached to application)
CREATE TABLE IF NOT EXISTS application_evidence (
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    revision_id UUID NOT NULL REFERENCES submission_revisions(id) ON DELETE RESTRICT,
    PRIMARY KEY (application_id, revision_id)
);

-- 27. EVIDENCE_GRANTS (Scoped employer permission to view private artifact)
CREATE TABLE IF NOT EXISTS evidence_grants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    revision_id UUID NOT NULL REFERENCES submission_revisions(id) ON DELETE CASCADE,
    employer_org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    revoked_at TIMESTAMPTZ,
    CONSTRAINT unique_application_revision_grant UNIQUE (application_id, revision_id)
);

-- 28. APPLICATION_EVENTS (Append-only hiring transition trail)
CREATE TABLE IF NOT EXISTS application_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    actor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    from_status TEXT,
    to_status TEXT NOT NULL,
    reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 29. OUTCOMES (Confirmed hiring completion records)
CREATE TABLE IF NOT EXISTS outcomes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    kind TEXT NOT NULL CHECK (kind IN ('internship', 'placement')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled', 'unconfirmed')),
    start_date DATE NOT NULL,
    end_date DATE,
    confirmed_by UUID REFERENCES profiles(id),
    confirmed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_application_outcome UNIQUE (application_id)
);

-- 30. AUDIT_EVENTS (Tamper-proof system audit log)
CREATE TABLE IF NOT EXISTS audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    reason TEXT,
    metadata_json JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 31. OUTBOX_EVENTS (Transactional event outbox for notifications)
CREATE TABLE IF NOT EXISTS outbox_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL,
    payload_json JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    attempts INT NOT NULL DEFAULT 0,
    next_attempt_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 32. NOTIFICATIONS (In-app notifications)
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    event_id UUID REFERENCES outbox_events(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 33. IDEMPOTENCY_RECORDS (Durable request deduplication)
CREATE TABLE IF NOT EXISTS idempotency_records (
    actor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    operation TEXT NOT NULL,
    key TEXT NOT NULL,
    request_hash TEXT NOT NULL,
    result_ref JSONB NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (actor_id, operation, key)
);

-- ============================================================================
-- PERFORMANCE & FILTERING INDEXES (Index Plan from 08_DATABASE_DOC.md)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_memberships_user_status ON memberships(user_id, status, org_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_inst_status ON enrollments(institution_id, status, student_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_org_status ON opportunities(employer_org_id, status, deadline);
CREATE INDEX IF NOT EXISTS idx_opportunity_audiences_inst ON opportunity_audiences(institution_id, opportunity_id);
CREATE INDEX IF NOT EXISTS idx_submissions_student_challenge ON submissions(student_id, challenge_id);
CREATE INDEX IF NOT EXISTS idx_reviewer_assignments_status ON reviewer_assignments(reviewer_id, status);
CREATE INDEX IF NOT EXISTS idx_skill_attainments_student ON skill_attainments(student_id, skill_id, reviewed_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_opp_status ON applications(opportunity_id, status, applied_at DESC);
CREATE INDEX IF NOT EXISTS idx_evidence_grants_active ON evidence_grants(employer_org_id, revision_id) WHERE revoked_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_id, read_at);
CREATE INDEX IF NOT EXISTS idx_outbox_events_status ON outbox_events(status, next_attempt_at);
