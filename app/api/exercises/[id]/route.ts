// app/api/exercises/[id]/route.ts
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const updates = await req.json();

  const { error } = await supabase
    .from("exercises")
    .update(updates)
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

// app/api/exercises/[id]/route.ts (continue)
export async function DELETE(_: NextRequest,  context: { params: { id: string } }) {
  const { id } = context.params;

  const { error } = await supabase
    .from("exercises")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
