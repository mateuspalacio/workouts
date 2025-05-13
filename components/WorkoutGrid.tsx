// app/dashboard/components/WorkoutGrid.tsx
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import { Workout } from "@/types/Workout";
import { markWorkoutDone } from "@/actions/markWorkoutDone";
import WorkoutModal from "./WorkoutModal";

export default function WorkoutGrid() {
  const { user, isLoaded } = useUser();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [doneWorkouts, setDoneWorkouts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const plano = user?.publicMetadata?.plano === "pro" ? "pro" : "free";

  useEffect(() => {
    if (!isLoaded) return;

    const fetchWorkouts = async () => {
      setLoading(true);

      const currentMonth = new Date().toISOString().slice(0, 7); // '2025-05'
      const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .ilike("month", `${currentMonth}%`)
        .order("title", { ascending: true });

      if (error) {
        console.error("Erro ao buscar treinos:", error);
      } else {
        const filtered =
          plano === "pro"
            ? data.slice(0, 20)
            : data.filter((w) => w.is_free).slice(0, 4);

        setWorkouts(filtered);
      }

      setLoading(false);
    };
const fetchDoneWorkouts = async () => {
  const { data, error } = await supabase
    .from("user_workout_done")
    .select("workout_id")
    .eq("user_id", user?.id);
if (error){
    console.error('Erro lendo treinos feitos', error)
}
  if (data) {
    setDoneWorkouts(data.map((item) => item.workout_id));
  }
};

    fetchWorkouts();
    fetchDoneWorkouts();
  }, [isLoaded, plano, user?.id]);
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }
{workouts.map((workout) => {
  const isDone = doneWorkouts.includes(workout.id);

  return (
    <Card key={workout.id}>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">{workout.title}</h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
          {workout.description}
        </p>

        <div className="flex flex-col gap-2">
          <a
            href={workout.video_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WorkoutModal video_url={workout.video_url} title={workout.title} description={workout.description}/>
          </a>

          {plano === "pro" && (
            <form
              action={async () => {
                const res = await markWorkoutDone(workout.id);
                if (res.success) {
                  setDoneWorkouts((prev) => [...prev, workout.id]);
                }
              }}
            >
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                disabled={isDone}
              >
                {isDone ? "Concluído ✅" : "Marcar como concluído"}
              </Button>
            </form>
          )}
        </div>
      </CardContent>
    </Card>
  );
})}

}
