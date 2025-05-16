"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

type ChartEntry = {
  week: string;
  count: number;
};

type DoneWorkout = {
  workout_id: string;
  title: string;
  date: string; // ← renamed from done_at
};

export default function WorkoutStats({ month }: { month: string }) {
  const { isLoaded } = useUser();
  const [chartData, setChartData] = useState<ChartEntry[]>([]);
  const [completedList, setCompletedList] = useState<DoneWorkout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !month) return;

    const loadStats = async () => {
      setLoading(true);
      const res = await fetch(`/api/stats?month=${month}`);
      const json = await res.json();

      if (res.ok) {
        setChartData(json.chart || []);
        setCompletedList(json.completed || []);
      } else {
        console.error("Erro buscando estatísticas:", json.error);
      }

      setLoading(false);
    };

    loadStats();
  }, [isLoaded, month]);

  if (loading) {
    return <Skeleton className="h-[200px] w-full" />;
  }

  if (chartData.length === 0 && completedList.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-2">Resumo do mês</h2>

      <div className="w-full h-[200px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="week" />
            <YAxis allowDecimals={false} />
            <Tooltip formatter={(value: number) => [`${value}`, "Quantidade"]} />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold mb-2">Treinos concluídos</h3>
        {completedList.map((item) => (
          <div
            key={item.workout_id + item.date}
            className="p-3 border rounded-md text-sm"
          >
            <p className="font-medium">{item.title}</p>
            <p className="text-muted-foreground">Feito em {item.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
