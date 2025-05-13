import { supabase } from '../lib/supabase';

const DAILY_LIMIT = 5;

export async function checkRateLimit(clerkId: string, toolName: string): Promise<{
  allowed: boolean;
  remaining: number;
}> {
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from('usage_log')
    .select('*', { count: 'exact', head: true })
    .eq('clerk_id', clerkId)
    .eq('tool_name', toolName)
    .gte('created_at', startOfDay.toISOString());

  if (error) {
    console.error('Rate limit check failed:', error.message);
    return { allowed: true, remaining: DAILY_LIMIT }; // fail open
  }

  const remaining = Math.max(DAILY_LIMIT - (count || 0), 0);
  return {
    allowed: remaining > 0,
    remaining,
  };
}
