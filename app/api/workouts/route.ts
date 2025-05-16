import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const tag = searchParams.get("tag");
  const from = searchParams.get("from");
  const plano = searchParams.get("plano"); // Optional now!

  let query = supabase
    .from("workouts")
    .select("id, title, description, is_free, tag, month, release_at, exercises(*)");

  if (from) {
    const fromDate = `${from}-01`;

    query = query
      .gte("month", fromDate)
      .order("month", { ascending: true })
      .order("title", { ascending: true });

  } else if (month) {
    const [year, monthNum] = month.split("-").map(Number);
    const monthStart = `${year}-${String(monthNum).padStart(2, "0")}-01`;
    const nextMonth = new Date(year, monthNum, 1);
    const monthEnd = nextMonth.toISOString().split("T")[0];

    query = query
      .gte("month", monthStart)
      .lt("month", monthEnd)
      .lte("release_at", new Date().toISOString()) // hide unreleased
      .order("title", { ascending: true });
  }

  if (tag && tag !== 'Todas') {
    query = query.eq("tag", tag);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let filtered = data || [];

  if (plano === "free") {
    filtered = filtered.filter((w) => w.is_free).slice(0, 4);
  } else if (plano === "pro") {
    filtered = filtered.slice(0, 20);
  }

  return NextResponse.json(filtered);
}
