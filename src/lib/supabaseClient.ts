import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sample-project.supabase.co';
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sample-key';

// Browser-safe client with Row-Level Security
export const supabase = createClient(supabaseUrl, supabasePublishableKey);
