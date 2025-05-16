import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { clerkId } = await req.json();

  const { data, error } = await supabase
    .from("users")
    .select("ispremium")
    .eq("clerk_id", clerkId)
    .single();

  if (error) {
    return NextResponse.json({ ispremium: false }, { status: 200 });
  }

  return NextResponse.json({ ispremium: data?.ispremium ?? false });
}
