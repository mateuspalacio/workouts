import { supabase } from "./supabase";

export async function logToolUsage(clerkId: string, toolName: string) {
  const { error } = await supabase.from('usage_log').insert([
    {
      clerk_id: clerkId,
      tool_name: toolName,
    },
  ]);

  if (error) {
    console.error('Failed to log tool usage:', error.message);
  }

  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0); // Reset to today's midnight

  await supabase
    .from('usage_log')
    .delete()
    .lt('created_at', midnight.toISOString());
}
