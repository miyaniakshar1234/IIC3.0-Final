import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Parse .env.local manually
const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const idx = trimmed.indexOf('=');
    if (idx !== -1) {
      env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
    }
  }
});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

console.log('Connecting to Supabase at:', url ? url.substring(0, 20) + '...' : 'NONE');

const supabase = createClient(url, key);

async function testConnection() {
  try {
    // Check if table 'profiles' or any public table exists or test an auth ping
    const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.log('API Response received (Error or Table not created yet):', error.message, '| Code:', error.code);
      if (error.code === '42P01' || error.message.includes('relation "public.profiles" does not exist')) {
        console.log('>>> CONNECTED SUCCESSFULLY! (Schema tables have not been created yet) <<<');
      } else {
        console.log('Response detail:', error);
      }
    } else {
      console.log('>>> CONNECTED SUCCESSFULLY! Tables are present. Profiles count:', data);
    }
  } catch (err) {
    console.error('Connection failed:', err.message);
  }
}

testConnection();
