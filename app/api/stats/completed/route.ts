import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clerkId = searchParams.get("clerkId");
  const month = searchParams.get("month");

  if (!clerkId || !month) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const { data: userRow, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_id", clerkId)
    .single();

  if (userError || !userRow) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const [year, monthNum] = month.split("-").map(Number);
  const start = `${year}-${String(monthNum).padStart(2, "0")}-01`;
  const end = new Date(year, monthNum, 1).toISOString().split("T")[0];

  const { count, error } = await supabase
    .from("user_workout_done")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userRow.id)
    .gte("done_at", start)
    .lt("done_at", end);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, count: count || 0 });
}
