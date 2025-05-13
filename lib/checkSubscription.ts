import { isBefore } from 'date-fns';
import { supabase } from '../lib/supabase';

export async function validateUserSubscription(clerkId: string) {
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', clerkId)
    .single();

  if (
    user?.subscription_ends_at &&
    isBefore(new Date(user.subscription_ends_at), new Date()) && user?.cancel_at_period_end &&
    user.ispremium
  ) {
    await supabase
      .from('users')
      .update({ ispremium: false, subscription_status: 'expired' })
      .eq('clerk_id', clerkId);
  }

  return user;
}
