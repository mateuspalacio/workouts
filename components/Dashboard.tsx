"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import WorkoutGrid from "./WorkoutGrid";
import { usePremium } from "@/context/PremiumContext";
import WorkoutStats from "./WorkoutStats";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

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
  if (!isLoaded || !user?.id || !isPremium) return;

  const fetchCount = async () => {
    const res = await fetch(`/api/stats/completed?clerkId=${user.id}&month=${selectedMonth}`);
    const json = await res.json();
    if (json.success) {
      setCompletedCount(json.count);
    } else {
      console.error("Erro ao buscar estatísticas:", json.error);
    }
  };

  fetchCount();
}, [isLoaded, user?.id, selectedMonth, isPremium]);


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
    <main className="p-6 max-w-7xl mx-auto">
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
                selectedMonth === m ? "bg-primary text-white" : "bg-ghost"
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
    
    <Select value={filterTag} onValueChange={setFilterTag}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filtrar por tag" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Todas">Todas</SelectItem>
        <SelectItem value="Força">Força</SelectItem>
        <SelectItem value="Cardio">Cardio</SelectItem>
        <SelectItem value="Inferiores">Inferiores</SelectItem>
        <SelectItem value="Superior">Superior</SelectItem>
      </SelectContent>
    </Select>
    
  </div>
)}

      <section>
        <WorkoutGrid month={selectedMonth} tag={filterTag} />
        {isPremium && (<WorkoutStats month={selectedMonth} />)}

      </section>
    </main>
  );
}
