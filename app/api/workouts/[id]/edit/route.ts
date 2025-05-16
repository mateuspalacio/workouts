import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    params = await params;
  const { userId } = await auth();
  const workoutId = params.id;

  if (!userId) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { data: userRow } = await supabase
    .from("users")
    .select("email")
    .eq("clerk_id", userId)
    .single();

  if (!userRow || userRow.email !== "mateuspalacio@gmail.com") {
    return NextResponse.json({ error: "Acesso negado." }, { status: 403 });
  }

  const body = await req.json();
  const { title, description, is_free, tag, release_at, month, exercises } = body;

  if (!title || !month || !Array.isArray(exercises)) {
    return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
  }

  // Update workout
  const { error: workoutErr } = await supabase
    .from("workouts")
    .update({ title, description, is_free, tag, release_at, month })
    .eq("id", workoutId);

  if (workoutErr) {
    return NextResponse.json({ error: "Erro ao atualizar treino." }, { status: 500 });
  }

  // Clear old exercises
  await supabase.from("exercises").delete().eq("workout_id", workoutId);

  // Reinsert
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newExercises = exercises.map((ex: any) => ({
    workout_id: workoutId,
    name: ex.name,
    sets_reps: ex.sets_reps,
    video_url: ex.video_url,
    notes: ex.notes || "",
  }));

  const { error: insertError } = await supabase
    .from("exercises")
    .insert(newExercises);

  if (insertError) {
    return NextResponse.json({ error: "Erro ao salvar exercícios." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
