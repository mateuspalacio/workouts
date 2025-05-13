import { supabase } from '@/lib/supabase';

export async function getOrCreateUser(clerkId: string, email: string) {
  const {error} = await supabase
    .from('users')
    .upsert({ clerk_id: clerkId, email }, { onConflict: 'clerk_id' });
    if (error) {
      console.error(error)
    }
}
