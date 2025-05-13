"use client";

import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import WorkoutGrid from "./WorkoutGrid";

export default function DashboardContent() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <Skeleton className="h-8 w-[200px] mb-4" />
        <Skeleton className="h-4 w-[300px]" />
      </main>
    );
  }

  const plano = user?.publicMetadata?.plano === "pro" ? "PRO" : "Gratuito";

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Olá, {user?.firstName} 👋</h1>
      <p className="text-muted-foreground mb-6">
        Seu plano atual: <strong>{plano}</strong>
      </p>

      <section>
        <h2 className="text-xl font-semibold mb-4">Seus treinos</h2>
        <div className="border rounded-md p-4 text-muted-foreground">
          Aqui vão aparecer os treinos do mês, de acordo com seu plano.
        </div>
        <WorkoutGrid />
      </section>
    </main>
  );
}
