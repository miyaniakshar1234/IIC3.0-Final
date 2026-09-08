# ProofBridge — REST API Reference Specification

> **Base URL:** `/api/v1`  
> **Protocol:** HTTPS • **Format:** JSON (RFC 8259) • **Error Standard:** RFC 7807 Problem Details  
> **Authentication:** Supabase JWT / Session Cookie / `X-ProofBridge-Persona` (Demo Test Harness)

---

## 1. Global Conventions & Standards

### 1.1 Authentication & Persona Headers
All protected endpoints require an authenticated session. During hackathon evaluation and automated integration testing, the server accepts the `X-ProofBridge-Persona` header to test role-based permissions without requiring repeated OAuth browser handshakes:

```http
X-ProofBridge-Persona: student | recruiter | reviewer | dean
```

### 1.2 Standard Success Response Envelope
All single-resource queries and mutations return data wrapped in an object payload:
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2026-09-08T18:45:00.000Z",
    "requestId": "req_8f1b3c4a"
  }
}
```

### 1.3 Standard Error Envelope (RFC 7807)
```json
{
  "success": false,
  "error": {
    "code": "CONCURRENCY_CONFLICT",
    "message": "The application was modified by another reviewer. Expected version 3, found 4.",
    "status": 409,
    "details": {
      "currentVersion": 4,
      "expectedVersion": 3
    }
  }
}
```

---

## 2. Authentication & Session Endpoints

### `POST /api/v1/auth/signup`
Registers a new platform user profile and binds them to an organization.

#### Request Headers:
`Content-Type: application/json`

#### Request Body:
```json
{
  "email": "candidate@university.edu",
  "password": "SecurePassword123!",
  "fullName": "Meera Sharma",
  "role": "student",
  "organizationId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

#### Responses:
* `201 Created`: Returns created profile and initial session cookie.
* `400 Bad Request`: Validation failure (e.g. invalid email format or weak password).
* `409 Conflict`: User with this email already registered.

---

### `POST /api/v1/auth/login`
Authenticates user credentials and issues an HTTP-only session JWT.

#### Request Body:
```json
{
  "email": "candidate@university.edu",
  "password": "SecurePassword123!"
}
```

#### Responses:
* `200 OK`: Returns authenticated session details and role memberships.
* `401 Unauthorized`: Invalid credentials.

---

## 3. Opportunities & Role Genomes

### `GET /api/v1/opportunities`
Retrieves published opportunities, internships, and job listings.

#### Query Parameters:
* `status` (optional): `published` | `draft` | `closed` (Defaults to `published`).
* `organization_id` (optional): Filter opportunities by hiring company UUID.
* `limit` (optional): Page size (Default: 20, Max: 100).

#### Response `200 OK`:
```json
{
  "success": true,
  "data": [
    {
      "id": "e4b10b0a-74d3-4fc9-b6b5-0c7f1a8e9d22",
      "title": "Junior Data Analyst Intern",
      "organizationName": "Acme Analytics Corp",
      "compensation": "₹45,000 / month",
      "location": "Bengaluru (Hybrid)",
      "status": "published",
      "deadline": "2026-10-15T23:59:59Z",
      "requiredSkillsCount": 4
    }
  ]
}
```

---

### `POST /api/v1/opportunities`
Publishes a new opportunity with a weighted capability matrix (Role Genome).

#### Request Body:
```json
{
  "title": "Junior Data Analyst Intern",
  "description": "Looking for analytical candidates capable of extracting and querying messy relational data.",
  "location": "Bengaluru (Hybrid)",
  "compensation": "₹45,000 / month",
  "deadline": "2026-10-15T23:59:59Z",
  "skills": [
    { "skillId": "skill_sql", "requiredLevel": 3, "weight": 35, "isMandatory": true },
    { "skillId": "skill_spreadsheets", "requiredLevel": 3, "weight": 25, "isMandatory": false },
    { "skillId": "skill_communication", "requiredLevel": 4, "weight": 16, "isMandatory": false },
    { "skillId": "skill_analytical_reasoning", "requiredLevel": 3, "weight": 24, "isMandatory": true }
  ]
}
```

#### Responses:
* `201 Created`: Opportunity and skills registered.
* `400 Bad Request`: Weights do not sum to 100 or mandatory skills missing level.
* `403 Forbidden`: Authenticated user lacks employer management permissions.

---

### `GET /api/v1/opportunities/:id/match`
Computes the live `coverage-v1` match vector between the requesting student and the opportunity.

#### Response `200 OK`:
```json
{
  "success": true,
  "data": {
    "opportunityId": "e4b10b0a-74d3-4fc9-b6b5-0c7f1a8e9d22",
    "studentId": "d5a8e034-2c3f-4e01-8b27-5d0b986a4e7f",
    "coveragePercentage": 96.0,
    "isEligible": true,
    "breakdown": [
      {
        "skillId": "skill_sql",
        "skillName": "SQL & Relational Modeling",
        "requiredLevel": 3,
        "verifiedLevel": 3,
        "weight": 0.35,
        "contributedScore": 0.35,
        "isMandatory": true,
        "isSatisfied": true
      },
      {
        "skillId": "skill_spreadsheets",
        "skillName": "Spreadsheet Modeling",
        "requiredLevel": 3,
        "verifiedLevel": 3,
        "weight": 0.25,
        "contributedScore": 0.25,
        "isMandatory": false,
        "isSatisfied": true
      },
      {
        "skillId": "skill_communication",
        "skillName": "Technical Communication",
        "requiredLevel": 4,
        "verifiedLevel": 3,
        "weight": 0.16,
        "contributedScore": 0.12,
        "isMandatory": false,
        "isSatisfied": false
      },
      {
        "skillId": "skill_analytical_reasoning",
        "skillName": "Analytical Reasoning",
        "requiredLevel": 3,
        "verifiedLevel": 3,
        "weight": 0.24,
        "contributedScore": 0.24,
        "isMandatory": true,
        "isSatisfied": true
      }
    ],
    "bridgeActions": []
  }
}
```

---

## 4. Challenges & Evidence Submissions

### `POST /api/v1/challenges/:id/submissions`
Creates or updates a draft challenge submission.

#### Request Body:
```json
{
  "title": "Monthly Sales SQL Query & Cohort Analysis",
  "content": "SELECT date_trunc('month', order_date), SUM(amount) FROM orders GROUP BY 1;",
  "contributionStatement": "I authored the window functions independently. Verified results against synthetic seeds.",
  "aiDisclosure": "Used Claude 3.5 Sonnet to check SQL syntax edge-cases.",
  "referenceLinks": [
    "https://github.com/student/sales-analysis-sql"
  ]
}
```

---

### `POST /api/v1/submissions/:id/finalize`
Freezes the submission revision into an immutable state and assigns it to the faculty review queue.

#### Responses:
* `200 OK`: Submission locked, SHA-256 digest sealed, status set to `under_review`.
* `400 Bad Request`: Missing mandatory contribution defense statement.
* `409 Conflict`: Submission already finalized.

---

## 5. Reviewer Queue & Rubric Publication

### `GET /api/v1/reviewer/queue`
Fetches pending student submissions assigned to the authenticated faculty member.

---

### `POST /api/v1/reviews/:id/publish`
Atomically writes the completed rubric evaluation, commits `skill_attainments`, and dispatches outbox events.

#### Request Body:
```json
{
  "submissionId": "b1e9c2a0-4321-4f9a-8e2b-10f5e3d7a8c9",
  "scores": [
    { "criterionId": "crit_sql_correctness", "level": 4, "rationale": "Queries pass all test cases without Cartesian joins." },
    { "criterionId": "crit_index_perf", "level": 3, "rationale": "Proper EXPLAIN ANALYZE execution plan demonstrated." },
    { "criterionId": "crit_defense_integrity", "level": 3, "rationale": "Clear defense of group-by logic in contribution statement." }
  ],
  "awardedLevel": 3,
  "summaryFeedback": "Solid relational modeling and query optimization."
}
```

#### Responses:
* `200 OK`: Review published; student Skill Twin updated with verified Level 3 attainment.
* `400 Bad Request`: Unrated rubric criteria detected.
* `403 Forbidden`: Actor is not the designated reviewer.

---

## 6. Applications & State Transitions

### `POST /api/v1/applications`
Submits a job application with an immutable frozen snapshot of the candidate's verified evidence.

#### Request Body:
```json
{
  "opportunityId": "e4b10b0a-74d3-4fc9-b6b5-0c7f1a8e9d22",
  "selectedRevisionIds": [
    "b1e9c2a0-4321-4f9a-8e2b-10f5e3d7a8c9"
  ]
}
```

#### Responses:
* `201 Created`: Application created, scoped `evidence_grants` issued to hiring employer.
* `409 Conflict`: Candidate has already applied to this opportunity.

---

### `POST /api/v1/applications/:id/transitions`
Transitions the candidate through recruitment stages with optimistic locking.

#### Request Body:
```json
{
  "targetStatus": "shortlisted",
  "expectedVersion": 1,
  "notes": "Strong SQL benchmark and verified faculty recommendation."
}
```

#### Responses:
* `200 OK`: Application transitioned; audit event recorded.
* `409 Conflict`: Concurrency conflict (record version changed).

---

## 7. Cryptographic Verification & Demo Reset

### `POST /api/v1/verifier/verify`
Zero-gas offline cryptographic verification of a W3C Verifiable Credential.

#### Request Body:
```json
{
  "credential": { ... }
}
```

#### Response `200 OK`:
```json
{
  "success": true,
  "data": {
    "isValid": true,
    "issuer": "did:proofbridge:org:manipal-jaipur",
    "subject": "did:proofbridge:student:meera-sharma",
    "competency": "SQL & Relational Modeling",
    "level": 3,
    "issuedAt": "2026-09-08T18:30:00Z",
    "tamperCheck": "PASSED"
  }
}
```

---

### `POST /api/v1/demo/reset`
Resets the live database to the canonical demonstration seed state.

#### Response `200 OK`:
```json
{
  "success": true,
  "message": "Database reset to canonical demo state successfully.",
  "data": {
    "institutionsSeeded": 2,
    "employersSeeded": 2,
    "studentsSeeded": 6,
    "opportunitiesSeeded": 3
  }
}
```
