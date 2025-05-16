import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();

  const workouts = body.workouts;

  if (!Array.isArray(workouts)) {
    return NextResponse.json({ success: false, message: "Invalid format" }, { status: 400 });
  }

  try {
    for (const workout of workouts) {
      const { title, description, is_free, tag, month, release_at, exercises } = workout;

      const { data: created, error } = await supabase
        .from("workouts")
        .insert({
          title,
          description,
          is_free,
          tag,
          month: new Date(`${month}-01`),
          release_at: release_at ? new Date(release_at) : null,
        })
        .select("id")
        .single();

      if (error || !created?.id) {
        throw new Error("Erro ao inserir treino.");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formattedExercises = exercises.map((ex: any) => ({
        workout_id: created.id,
        name: ex.name,
        sets_reps: ex.sets_reps,
        video_url: ex.video_url,
        notes: ex.notes,
      }));

      const { error: exError } = await supabase
        .from("exercises")
        .insert(formattedExercises);

      if (exError) throw new Error("Erro ao inserir exercícios.");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: (err as Error).message },
      { status: 500 }
    );
  }
}
