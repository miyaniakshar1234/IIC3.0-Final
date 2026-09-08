-- ============================================================================
-- ProofBridge — Complete Synthetic Seed Fixtures (IIC 3.0 MUJ Final)
-- Deterministic Demonstration Fixture: Meera (61% -> 96% Match Leap)
-- Version: 1.0 (8 Sep 2026)
-- ============================================================================

-- Clean existing data in reverse dependency order
TRUNCATE TABLE
    idempotency_records,
    notifications,
    outbox_events,
    audit_events,
    outcomes,
    application_events,
    evidence_grants,
    application_evidence,
    applications,
    submission_events,
    correction_requests,
    skill_attainments,
    review_scores,
    reviews,
    reviewer_assignments,
    evidence_links,
    submission_revisions,
    submissions,
    rubric_criteria,
    challenge_audiences,
    challenges,
    opportunity_skills,
    opportunity_audiences,
    opportunities,
    declared_skills,
    skill_aliases,
    skills,
    platform_admins,
    enrollments,
    student_profiles,
    memberships,
    organizations,
    profiles
CASCADE;

-- 1. PROFILES
INSERT INTO profiles (id, display_name, timezone) VALUES
    ('00000000-0000-0000-0000-000000000001', 'Meera Patel', 'Asia/Kolkata'),
    ('00000000-0000-0000-0000-000000000002', 'Rahul Sharma', 'Asia/Kolkata'),
    ('00000000-0000-0000-0000-000000000003', 'Ananya Iyer', 'Asia/Kolkata'),
    ('00000000-0000-0000-0000-000000000004', 'Rohit Verma', 'Asia/Kolkata'),
    ('00000000-0000-0000-0000-000000000005', 'Priya Nair', 'Asia/Kolkata'),
    ('00000000-0000-0000-0000-000000000006', 'Vikram Singh', 'Asia/Kolkata'),
    ('00000000-0000-0000-0000-000000000010', 'Dr. Alok Sharma (Faculty Reviewer)', 'Asia/Kolkata'),
    ('00000000-0000-0000-0000-000000000020', 'Neha Verma (Sample Analytics Studio)', 'Asia/Kolkata'),
    ('00000000-0000-0000-0000-000000000021', 'Dev Patel (Example Web Lab)', 'Asia/Kolkata'),
    ('00000000-0000-0000-0000-000000000030', 'Prof. Sunita Gupta (College Coordinator)', 'Asia/Kolkata'),
    ('00000000-0000-0000-0000-000000000099', 'System Admin', 'Asia/Kolkata');

-- 2. ORGANIZATIONS (2 Institutions, 2 Employers for isolation checks)
INSERT INTO organizations (id, kind, name, status) VALUES
    ('10000000-0000-0000-0000-000000000001', 'institution', 'Demo College of Computing', 'approved'),
    ('10000000-0000-0000-0000-000000000002', 'institution', 'Sample Institute of Technology', 'approved'),
    ('20000000-0000-0000-0000-000000000001', 'employer', 'Sample Analytics Studio', 'approved'),
    ('20000000-0000-0000-0000-000000000002', 'employer', 'Example Web Lab', 'approved');

-- 3. MEMBERSHIPS
INSERT INTO memberships (org_id, user_id, role, status) VALUES
    ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000010', 'reviewer', 'active'),
    ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000030', 'coordinator', 'active'),
    ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000020', 'recruiter', 'active'),
    ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000021', 'recruiter', 'active');

-- 4. STUDENT PROFILES
INSERT INTO student_profiles (user_id, headline, program, graduation_year) VALUES
    ('00000000-0000-0000-0000-000000000001', 'Aspiring Data Analyst | MCA 2026', 'Master of Computer Applications', 2026),
    ('00000000-0000-0000-0000-000000000002', 'Software Engineering Enthusiast', 'B.Tech Computer Science', 2026),
    ('00000000-0000-0000-0000-000000000003', 'Data Science & Machine Learning', 'Master of Computer Applications', 2026),
    ('00000000-0000-0000-0000-000000000004', 'Full Stack Developer', 'B.Tech Computer Science', 2027),
    ('00000000-0000-0000-0000-000000000005', 'Database Specialist', 'Master of Computer Applications', 2026),
    ('00000000-0000-0000-0000-000000000006', 'Business Intelligence Enthusiast', 'Master of Computer Applications', 2026);

-- 5. ENROLLMENTS (All enrolled in Demo College of Computing)
INSERT INTO enrollments (student_id, institution_id, status) VALUES
    ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'active'),
    ('00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'active'),
    ('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'active'),
    ('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', 'active'),
    ('00000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000001', 'active'),
    ('00000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000001', 'active');

-- 6. CANONICAL SKILLS
INSERT INTO skills (id, slug, name, category, description) VALUES
    ('30000000-0000-0000-0000-000000000001', 'sql', 'SQL', 'Data & Analytics', 'Relational database querying, aggregations, joins, data cleaning and validation'),
    ('30000000-0000-0000-0000-000000000002', 'spreadsheets', 'Spreadsheets', 'Data & Analytics', 'Formulas, pivot tables, lookup models and data validation'),
    ('30000000-0000-0000-0000-000000000003', 'communication', 'Written Communication', 'Professional Skills', 'Clear technical writing, executive summaries and documentation'),
    ('30000000-0000-0000-0000-000000000004', 'analytical-reasoning', 'Analytical Reasoning', 'Cognitive', 'Structured problem breakdown, root cause analysis and hypothesis testing'),
    ('30000000-0000-0000-0000-000000000005', 'git', 'Git Version Control', 'Software Engineering', 'Branching, commit hygiene, rebasing and code review workflows');

-- 7. OPPORTUNITIES (Sample Analytics Studio)
INSERT INTO opportunities (
    id, employer_org_id, title, description, status, deadline,
    work_mode, location_text, duration_text, compensation_kind, amount_minor, currency, pay_period, version
) VALUES (
    '40000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    'Junior Data Analyst Intern',
    'Join our analytics consulting practice to transform raw transactional data into actionable client insights. You will write robust SQL queries, clean complex business datasets, and synthesize executive findings.',
    'published',
    now() + INTERVAL '30 days',
    'hybrid',
    'Jaipur / Remote',
    '3 months',
    'paid',
    2500000, -- INR 25,000.00
    'INR',
    'month',
    1
);

-- Opportunity Audience
INSERT INTO opportunity_audiences (opportunity_id, institution_id) VALUES
    ('40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001'),
    ('40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002');

-- Opportunity Skills & Weights (Sum = 100)
-- SQL: Req 3, W 35 | Spreadsheets: Req 3, W 25 | Comm: Req 4, W 16 | Reasoning: Req 3, W 24
INSERT INTO opportunity_skills (opportunity_id, skill_id, required_level, weight) VALUES
    ('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 3, 35),
    ('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', 3, 25),
    ('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000003', 4, 16),
    ('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000004', 3, 24);

-- 8. CHALLENGES (Linked to Opportunity)
INSERT INTO challenges (
    id, employer_org_id, opportunity_id, title, brief, status, deadline, effort_minutes, ai_policy, rubric_version
) VALUES (
    '50000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    '40000000-0000-0000-0000-000000000001',
    'Explain monthly sales from a messy dataset',
    'You are provided with a raw relational sales dump containing null buyer keys, duplicate order IDs, and inconsistent product names. Submit 3 optimized SQL queries: (1) deduplicated monthly revenue trend, (2) top 5 customer cohorts, and (3) anomaly detection for return rates. Include an executive summary and a Contribution Statement explaining your methodology.',
    'published',
    now() + INTERVAL '20 days',
    120,
    'allowed_with_disclosure',
    1
);

INSERT INTO challenge_audiences (challenge_id, institution_id) VALUES
    ('50000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001');

-- 9. RUBRIC CRITERIA FOR SQL CHALLENGE
INSERT INTO rubric_criteria (id, challenge_id, rubric_version, skill_id, title, anchors_json) VALUES
(
    '60000000-0000-0000-0000-000000000001',
    '50000000-0000-0000-0000-000000000001',
    1,
    '30000000-0000-0000-0000-000000000001',
    'SQL Query Correctness, Deduplication & Validation',
    jsonb_build_object(
        '0', 'Submitted queries fail to execute or do not demonstrate relational data processing.',
        '1', 'Retrieves and filters a single table; basic syntax without joins or deduplication.',
        '2', 'Correctly joins two tables and computes routine sum aggregations; duplicate rows remain.',
        '3', 'Cleanly handles duplicate IDs, NULL values, and multi-table joins; validates intermediate results and explains trade-offs.',
        '4', 'Production-ready queries with indexing strategy, window functions, and comprehensive data quality boundary tests.'
    )
);

-- 10. HISTORICAL REVIEWS & ATTAINMENTS FOR MEERA (Baseline 61% Coverage)
-- Dummy baseline review for Spreadsheet (Level 3), Comm (Level 3), Reasoning (Level 3)
INSERT INTO skill_attainments (id, student_id, skill_id, review_id, criterion_id, level, reviewed_at) VALUES
    (
        '70000000-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000001',
        '30000000-0000-0000-0000-000000000002', -- Spreadsheets
        '00000000-0000-0000-0000-000000000000',
        '00000000-0000-0000-0000-000000000000',
        3, -- Level 3
        now() - INTERVAL '10 days'
    ),
    (
        '70000000-0000-0000-0000-000000000003',
        '00000000-0000-0000-0000-000000000001',
        '30000000-0000-0000-0000-000000000003', -- Written Communication
        '00000000-0000-0000-0000-000000000000',
        '00000000-0000-0000-0000-000000000000',
        3, -- Level 3 (Required is 4)
        now() - INTERVAL '8 days'
    ),
    (
        '70000000-0000-0000-0000-000000000004',
        '00000000-0000-0000-0000-000000000001',
        '30000000-0000-0000-0000-000000000004', -- Analytical Reasoning
        '00000000-0000-0000-0000-000000000000',
        '00000000-0000-0000-0000-000000000000',
        3, -- Level 3
        now() - INTERVAL '5 days'
    );

-- 11. MEERA'S PENDING SQL SUBMISSION (For the live demo!)
INSERT INTO submissions (id, student_id, challenge_id, current_revision, status, version) VALUES (
    '80000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001', -- Meera
    '50000000-0000-0000-0000-000000000001', -- Messy Sales Challenge
    1,
    'submitted',
    1
);

INSERT INTO submission_revisions (
    id, submission_id, revision_no, rubric_version, title, body, contribution, submitted_at
) VALUES (
    '81000000-0000-0000-0000-000000000001',
    '80000000-0000-0000-0000-000000000001',
    1,
    1,
    'Monthly Revenue Trend & Deduplication Analysis',
    '-- Query 1: Deduplicated Monthly Revenue with Window Functions
WITH clean_orders AS (
    SELECT 
        order_id, 
        buyer_id, 
        order_date, 
        amount, 
        ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY updated_at DESC) AS rn
    FROM raw_orders
    WHERE order_id IS NOT NULL
)
SELECT 
    DATE_TRUNC(''month'', order_date) AS sales_month,
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(amount) AS net_revenue
FROM clean_orders
WHERE rn = 1 AND amount > 0
GROUP BY 1
ORDER BY 1;

-- Query 2: Top Customer Cohorts
SELECT 
    c.cohort_group,
    COUNT(DISTINCT c.customer_id) AS customer_count,
    ROUND(AVG(o.amount), 2) AS avg_spend
FROM customers c
LEFT JOIN clean_orders o ON o.buyer_id = c.customer_id
GROUP BY 1;',
    'I designed the CTE to eliminate duplicate order records using ROW_NUMBER() over order_id ordered by latest update timestamp. I filtered out null buyer IDs and negative invoice amounts. I used Claude 3.5 Sonnet to benchmark CTE execution time versus subqueries.',
    now()
);

-- Assigned to Dr. Alok Sharma (Faculty Reviewer)
INSERT INTO reviewer_assignments (
    id, revision_id, reviewer_id, assigned_by, status, version
) VALUES (
    '82000000-0000-0000-0000-000000000001',
    '81000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000010', -- Dr. Sharma
    '00000000-0000-0000-0000-000000000030', -- Prof. Gupta
    'assigned',
    1
);
