// app/api/users/[clerk_id]/done/route.ts
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { clerk_id: string } }) {
    params = await params;
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_id", params.clerk_id)
    .single();

  if (!data) return NextResponse.json({ done: [] });
  if (error) console.error(error);

  const { data: done } = await supabase
    .from("user_workout_done")
    .select("workout_id")
    .eq("user_id", data.id);

  return NextResponse.json(done || []);
}
