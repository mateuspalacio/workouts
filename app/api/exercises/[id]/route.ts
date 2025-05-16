// app/api/exercises/[id]/route.ts
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    params = await params;
  const updates = await req.json();

  const { error } = await supabase
    .from("exercises")
    .update(updates)
    .eq("id", params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

// app/api/exercises/[id]/route.ts (continue)
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
        params = await params;

  const { error } = await supabase
    .from("exercises")
    .delete()
    .eq("id", params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
