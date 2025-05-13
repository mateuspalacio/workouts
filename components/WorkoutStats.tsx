"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

type DoneWorkout = {
  workout_id: string;
  done_at: string;
  title: string;
};

export default function WorkoutStats({ month }: { month: string }) {
  const { user, isLoaded } = useUser();
  const [data, setData] = useState<{ week: string; count: number }[]>([]);
  const [completedList, setCompletedList] = useState<DoneWorkout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user?.id || !month) return;

    const loadStats = async () => {
      setLoading(true);

      // Step 1: Get internal user UUID
      const { data: userRow } = await supabase
        .from("users")
        .select("id")
        .eq("clerk_id", user.id)
        .single();

      if (!userRow) return;

      // Step 2: Define month range
      const [year, monthNum] = month.split("-").map(Number);
      const start = `${year}-${String(monthNum).padStart(2, "0")}-01`;
      const end = new Date(year, monthNum, 1).toISOString().split("T")[0];

      // Step 3: Get all completions + workout title
      const { data: done, error } = await supabase
        .from("user_workout_done")
        .select("workout_id, done_at, workouts(title)")
        .eq("user_id", userRow.id)
        .gte("done_at", start)
        .lt("done_at", end)
        .order("done_at", { ascending: false });

      if (!done || error) {
        console.error("Erro ao buscar stats:", error);
        setLoading(false);
        return;
      }

      // Step 4: Format for chart
      const byWeek: Record<string, number> = {};
      const list: DoneWorkout[] = [];

      done.forEach((entry) => {
        const date = new Date(entry.done_at);
        const weekKey = `Semana ${Math.floor((date.getDate() - 1) / 7) + 1}`;
        byWeek[weekKey] = (byWeek[weekKey] || 0) + 1;

        list.push({
          workout_id: entry.workout_id,
          done_at: date.toLocaleDateString("pt-BR"),
          title: entry.workouts?.title || "Treino",
        });
      });

      const chartData = Object.entries(byWeek).map(([week, count]) => ({
        week,
        count,
      }));

      setData(chartData);
      setCompletedList(list);
      setLoading(false);
    };

    loadStats();
  }, [isLoaded, user?.id, month]);

  if (loading) {
    return <Skeleton className="h-[200px] w-full" />;
  }

  if (data.length === 0 && completedList.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-2">Resumo do mês</h2>

      <div className="w-full h-[200px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="week" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold mb-2">Treinos concluídos</h3>
        {completedList.map((item) => (
          <div
            key={item.workout_id + item.done_at}
            className="p-3 border rounded-md text-sm"
          >
            <p className="font-medium">{item.title}</p>
            <p className="text-muted-foreground">Feito em {item.done_at}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
