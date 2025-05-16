// app/api/exercises/route.ts
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const workout_id = searchParams.get("workout_id");

  if (!workout_id) {
    return NextResponse.json({ error: "Missing workout_id" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("workout_id", workout_id)
    .order("id");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

// app/api/exercises/route.ts (continue)
export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("exercises")
    .insert([body])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}
