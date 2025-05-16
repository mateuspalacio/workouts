import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  // Step 1: get user UUID and plan
  const { data: userRow, error } = await supabase
    .from("users")
    .select("id, ispremium")
    .eq("clerk_id", userId)
    .single();

  if (error || !userRow) {
    return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
  }

  if (!userRow.ispremium) {
    return NextResponse.json({ error: "Apenas usuários PRO podem ver o histórico." }, { status: 403 });
  }

  // Step 2: Get current + previous 2 months
  const today = new Date();
  const current = new Date(today.getFullYear(), today.getMonth(), 1);
  const past = new Date(today.getFullYear(), today.getMonth() - 2, 1);

  const currentISO = current.toISOString();
  const pastISO = past.toISOString();

  const { data: workouts, error: workoutErr } = await supabase
    .from("workouts")
    .select("id, title, description, month, tag, exercises(*)")
    .gte("month", pastISO)
    .lt("month", currentISO)
    .order("month", { ascending: false });

  if (workoutErr) {
    return NextResponse.json({ error: "Erro ao buscar treinos passados." }, { status: 500 });
  }

  return NextResponse.json({ success: true, workouts });
}
