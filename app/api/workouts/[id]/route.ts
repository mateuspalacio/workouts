import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    params = await params;
  const { userId } =  await auth();
  const workoutId = params.id;

  if (!userId) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  // Admin-only email check
  const { data: userRow } = await supabase
    .from("users")
    .select("email")
    .eq("clerk_id", userId)
    .single();

  if (!userRow || userRow.email !== "mateuspalacio@gmail.com") {
    return NextResponse.json({ error: "Acesso negado." }, { status: 403 });
  }

  // First: delete exercises for this workout
  const { error: exErr } = await supabase
    .from("exercises")
    .delete()
    .eq("workout_id", workoutId);

  if (exErr) {
    return NextResponse.json({ error: "Erro ao remover exercícios." }, { status: 500 });
  }

  // Then delete workout
  const { error: wkErr } = await supabase
    .from("workouts")
    .delete()
    .eq("id", workoutId);

  if (wkErr) {
    return NextResponse.json({ error: "Erro ao remover treino." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
