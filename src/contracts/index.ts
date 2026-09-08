import { z } from 'zod';

// ============================================================================
// Standard Response Envelopes
// ============================================================================
export interface ApiResponse<T> {
  data: T;
  meta: {
    request_id: string;
    next_cursor?: string;
    has_more?: boolean;
  };
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    field_errors?: Record<string, string[]>;
    request_id: string;
  };
}

// ============================================================================
// Opportunity Schemas
// ============================================================================
export const OpportunitySkillRequirementSchema = z.object({
  skill_id: z.string().uuid(),
  required_level: z.number().int().min(1).max(4),
  weight: z.number().int().min(1).max(100),
});

export const CreateOpportunitySchema = z.object({
  org_id: z.string().uuid(),
  title: z.string().min(3).max(160),
  description: z.string().min(10).max(12000),
  work_mode: z.enum(['remote', 'hybrid', 'onsite']),
  location_text: z.string().optional(),
  duration_text: z.string().min(1).max(100),
  deadline: z.string().datetime(),
  compensation: z.object({
    kind: z.enum(['paid', 'unpaid', 'unspecified']),
    amount_minor: z.number().int().nonnegative().optional(),
    currency: z.string().length(3).default('INR'),
    pay_period: z.enum(['month', 'week', 'lump_sum']).optional(),
  }),
  audience_institution_ids: z.array(z.string().uuid()).min(1),
  requirements: z.array(OpportunitySkillRequirementSchema).min(1).max(20),
});

// ============================================================================
// Submission Schemas
// ============================================================================
export const FinalizeSubmissionSchema = z.object({
  expected_version: z.number().int().positive(),
});

export const SaveSubmissionDraftSchema = z.object({
  title: z.string().min(1).max(160),
  body: z.string().min(1).max(20000),
  contribution: z.string().min(1).max(4000),
  links: z.array(
    z.object({
      url: z.string().url().refine((val) => val.startsWith('https://'), {
        message: 'Only HTTPS reference links are permitted',
      }),
      label: z.string().min(1).max(100),
    })
  ).max(10).default([]),
  expected_version: z.number().int().positive(),
});

// ============================================================================
// Review Schemas
// ============================================================================
export const ReviewCriterionScoreSchema = z.object({
  criterion_id: z.string().uuid(),
  level: z.number().int().min(0).max(4),
  rationale: z.string().min(1).max(2000),
});

export const PublishReviewSchema = z.object({
  scores: z.array(ReviewCriterionScoreSchema).min(1),
  expected_version: z.number().int().positive(),
});

// ============================================================================
// Application Schemas
// ============================================================================
export const SubmitApplicationSchema = z.object({
  opportunity_id: z.string().uuid(),
  selected_revision_ids: z.array(z.string().uuid()).default([]),
  sharing_confirmed: z.literal(true, {
    errorMap: () => ({ message: 'You must confirm sharing selected evidence with the employer' }),
  }),
});

export const TransitionApplicationSchema = z.object({
  to_status: z.enum(['shortlisted', 'interview', 'offered', 'accepted', 'rejected', 'withdrawn', 'declined']),
  reason: z.string().min(1).max(1000),
  expected_version: z.number().int().positive(),
});
