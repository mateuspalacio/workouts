import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");

  if (!month) {
    return NextResponse.json({ error: "Mês não informado." }, { status: 400 });
  }

  // Step 1: Get internal UUID from Clerk ID
  const { data: userRow } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_id", userId)
    .single();

  if (!userRow) {
    return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
  }

  const [year, monthNum] = month.split("-").map(Number);
  const start = `${year}-${String(monthNum).padStart(2, "0")}-01`;
  const end = new Date(year, monthNum, 1).toISOString().split("T")[0];

  // Step 2: Query workout completions
  const { data, error } = await supabase
    .from("user_workout_done")
    .select("workout_id, done_at, workouts(title)")
    .eq("user_id", userRow.id)
    .gte("done_at", start)
    .lt("done_at", end)
    .order("done_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "Erro ao buscar stats." }, { status: 500 });
  }

  // Step 3: Aggregate
  const byWeek: Record<string, number> = {};
  const completed: { workout_id: string; title: string; date: string }[] = [];

  data.forEach((item) => {
    const date = new Date(item.done_at);
    const weekKey = `Semana ${Math.floor((date.getDate() - 1) / 7) + 1}`;
    byWeek[weekKey] = (byWeek[weekKey] || 0) + 1;

    completed.push({
      workout_id: item.workout_id,
      title: item.workouts?.title || "Treino",
      date: date.toLocaleDateString("pt-BR"),
    });
  });

  return NextResponse.json({
    chart: Object.entries(byWeek).map(([week, count]) => ({ week, count })),
    completed,
  });
}
