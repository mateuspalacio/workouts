import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  // Step 1: Admin-only check
  const { data: userRow } = await supabase
    .from("users")
    .select("email")
    .eq("clerk_id", userId)
    .single();

  const adminEmails = ["mateuspalacio@gmail.com"];
  if (!userRow || !adminEmails.includes(userRow.email)) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 403 });
  }

  // Step 2: Parse and validate body
  const body = await req.json();
  const { title, description, is_free, month, tag, release_at, exercises } = body;

  if (!title || !month || !Array.isArray(exercises) || exercises.length === 0) {
    return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
  }

  // Step 3: Insert workout
  const { data: workout, error: workoutErr } = await supabase
    .from("workouts")
    .insert({
      title,
      description,
      is_free,
      tag,
      month,
      release_at: release_at || new Date().toISOString(),
    })
    .select("id")
    .single();

  if (workoutErr || !workout) {
    return NextResponse.json({ error: "Erro ao salvar treino." }, { status: 500 });
  }

  // Step 4: Insert exercises
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const insertExercises = exercises.map((ex: any) => ({
    workout_id: workout.id,
    name: ex.name,
    sets_reps: ex.sets_reps,
    video_url: ex.video_url,
    notes: ex.notes || "",
  }));

  const { error: exError } = await supabase
    .from("exercises")
    .insert(insertExercises);

  if (exError) {
    return NextResponse.json({ error: "Erro ao salvar exercícios." }, { status: 500 });
  }

  return NextResponse.json({ success: true, workoutId: workout.id });
}
