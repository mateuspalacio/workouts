import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: userRow } = await supabase.from("users").select("email").eq("clerk_id", userId).single();
  if (userRow?.email !== "mateuspalacio@gmail.com") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { data, error } = await supabase.from("exercise_templates").select("*").order("name");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: userRow } = await supabase.from("users").select("email").eq("clerk_id", userId).single();
  if (userRow?.email !== "mateuspalacio@gmail.com") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { name, sets_reps, video_url, notes } = body;

  if (!name || !sets_reps || !video_url) {
    return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
  }

  const { error } = await supabase.from("exercise_templates").insert([{ name, sets_reps, video_url, notes }]);
  if (error) return NextResponse.json({ error: "Erro ao salvar template" }, { status: 500 });

  return NextResponse.json({ success: true });
}
