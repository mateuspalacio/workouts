import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: userRow } = await supabase.from("users").select("email").eq("clerk_id", userId).single();
  if (userRow?.email !== "mateuspalacio@gmail.com") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { error } = await supabase.from("exercise_templates").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Erro ao deletar template" }, { status: 500 });

  return NextResponse.json({ success: true });
}
