import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sample-project.supabase.co';
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sample-key';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Standard server client executing with user token context (RLS enforced)
 */
export function createServerSupabaseClient(accessToken?: string) {
  return createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      persistSession: false,
    },
    global: {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    },
  });
}

/**
 * Privileged admin client: ONLY used for database seed or exceptional admin jobs
 * Never exposed to browser bundles or untrusted route handlers!
 */
export function getAdminClient() {
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for admin database operations');
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
}
