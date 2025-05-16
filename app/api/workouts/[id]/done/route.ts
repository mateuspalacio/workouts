import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
    params = await params;
  const { userId } = await auth();
  const workoutId = params.id;

  if (!userId) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  // Get internal UUID
  const { data: userRow, error: userErr } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_id", userId)
    .single();

  if (userErr || !userRow) {
    return NextResponse.json(
      { error: "Usuário não encontrado." },
      { status: 404 }
    );
  }

  const internalId = userRow.id;

  // Check if already marked
  const { data: existing } = await supabase
    .from("user_workout_done")
    .select("id")
    .eq("user_id", internalId)
    .eq("workout_id", workoutId)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ success: true, alreadyDone: true });
  }

  // Insert new record
  const { error: insertError } = await supabase.from("user_workout_done").insert({
    user_id: internalId,
    workout_id: workoutId,
    done_at: new Date().toISOString(),
  });

  if (insertError) {
    return NextResponse.json({ error: "Erro ao salvar." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
