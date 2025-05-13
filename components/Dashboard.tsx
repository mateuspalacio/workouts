"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import WorkoutGrid from "./WorkoutGrid";
import { usePremium } from "@/context/PremiumContext";
import { supabase } from "@/lib/supabase";
import WorkoutStats from "./WorkoutStats";
import { Label } from "./ui/label";

export default function DashboardContent() {
  const { user, isLoaded } = useUser();
  const isPremium = usePremium();

  const now = new Date();
  const months = [...Array(3)].map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i);
    return d.toISOString().slice(0, 7); // 'YYYY-MM'
  });

  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [completedCount, setCompletedCount] = useState(0);
  const [filterTag, setFilterTag] = useState<string>("");

  useEffect(() => {
    if (!isLoaded || !user?.id) return;

    const fetchUserUUID = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("clerk_id", user.id)
        .single();

        if (error) console.error(error);
      if (data) {

        const start = `${now.getFullYear()}-${String(
          now.getMonth() + 1
        ).padStart(2, "0")}-01`;
        const end = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          1
        ).toISOString().split("T")[0];

        const { count } = await supabase
          .from("user_workout_done")
          .select("*", { count: "exact", head: true })
          .eq("user_id", data.id)
          .gte("done_at", start)
          .lt("done_at", end);

        setCompletedCount(count || 0);
      } else {
        console.error("Usuário não encontrado na tabela users.");
      }
    };

    fetchUserUUID();
  }, [isLoaded, user?.id]);

  if (!isLoaded) {
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <Skeleton className="h-8 w-[200px] mb-4" />
        <Skeleton className="h-4 w-[300px]" />
      </main>
    );
  }

  const plano = isPremium ? "PRO" : "Gratuito";

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Olá, {user?.firstName} 👋</h1>
      <p className="text-muted-foreground mb-2">
        Seu plano atual: <strong>{plano}</strong>
      </p>

      {isPremium && (
        <p className="text-muted-foreground mb-4">
          Treinos concluídos este mês: <strong>{completedCount}</strong>
        </p>
      )}

      {isPremium && (
        <div className="mb-6 flex gap-2">
          {months.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              className={`text-sm px-3 py-1 border rounded ${
                selectedMonth === m ? "bg-primary text-white" : "bg-muted"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      )}

{isPremium && (
  <div className="mb-4 flex gap-2 items-center">
    <Label htmlFor="tagFilter">Filtrar por tag</Label>
    <select
      id="tagFilter"
      value={filterTag}
      onChange={(e) => setFilterTag(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="">Todas</option>
      <option value="Força">Força</option>
      <option value="Cardio">Cardio</option>
      <option value="Inferiores">Inferiores</option>
      <option value="Superior">Superior</option>
    </select>
  </div>
)}

      <section>
        <WorkoutGrid month={selectedMonth} tag={filterTag} />
        {isPremium && (<WorkoutStats month={selectedMonth} />)}

      </section>
    </main>
  );
}
