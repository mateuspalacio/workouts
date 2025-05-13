// app/actions/mark-workout-done.ts
"use server";

import { supabase } from "@/lib/supabase";
import { currentUser } from "@clerk/nextjs/server";

export async function markWorkoutDone(workoutId: string) {
  const user = await currentUser();
  if (!user) return { error: "Não autenticado." };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = await supabase
    .from("user_workout_done")
    .upsert({
      user_id: user.id,
      workout_id: workoutId,
    });

  if (error) {
    console.error("Erro ao marcar treino como concluído:", error);
    return { error: "Erro ao salvar progresso." };
  }

  return { success: true };
}
