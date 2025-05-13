"use server";

import { supabase } from "@/lib/supabase";
import { currentUser } from "@clerk/nextjs/server";

export async function markWorkoutDone(workoutId: string) {
  const clerkUser = await currentUser();
  if (!clerkUser) return { success: false };

  // Step 1: Get UUID from users table
  const { data: userRow, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_id", clerkUser.id)
    .single();

  if (!userRow || userError) return { success: false };

  // Step 2: Check if already exists
  const { count } = await supabase
    .from("user_workout_done")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userRow.id)
    .eq("workout_id", workoutId);

  if (count && count > 0) return { success: false };

  // Step 3: Insert
  const { error: insertError } = await supabase.from("user_workout_done").insert({
    user_id: userRow.id,
    workout_id: workoutId,
  });

  return { success: !insertError };
}
