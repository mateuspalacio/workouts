import { supabase } from '../lib/supabase';

export async function getOrCreateUser(clerkId: string, email: string) {
  await supabase
    .from('users')
    .upsert({ clerk_id: clerkId, email: email }, { onConflict: 'clerk_id' });
}
