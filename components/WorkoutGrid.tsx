"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import { markWorkoutDone } from "@/actions/markWorkoutDone";
import { usePremium } from "@/context/PremiumContext";
import WorkoutModal from "./WorkoutModal";

type Exercise = {
  id: string;
  name: string;
  sets_reps: string;
  video_url: string;
  notes?: string;
};

type Workout = {
  id: string;
  title: string;
  description: string;
  is_free: boolean;
  month: string;
  exercises: Exercise[];
};

export default function WorkoutGrid({ month, tag }: { month: string; tag?: string }) {
  const { user, isLoaded } = useUser();
  const isPremium = usePremium();
  const plano = isPremium ? "pro" : "free";

  const [workouts, setWorkouts] = useState<Workout[]>([]);
const [doneWorkouts, setDoneWorkouts] = useState<string[]>([]);
const [loading, setLoading] = useState(true);

  const fetchUserUUID = async (clerkId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_id", clerkId)
    .single();

  if (error || !data) {
    console.error("Erro ao buscar UUID do usuário:", error);
    return null;
  }

  return data.id as string;
};

  useEffect(() => {
    if (!isLoaded || !user?.id) return;

    const fetchWorkoutsAndExercises = async () => {
      setLoading(true);

    const [year, monthNum] = month.split("-").map(Number);
    const monthStart = `${year}-${String(monthNum).padStart(2, "0")}-01`;
    const monthEnd = new Date(year, monthNum, 1).toISOString().split("T")[0];


      const { data: rawWorkouts, error } = await supabase
        .from("workouts")
        .select("*, exercises(*)")
        .gte("month", monthStart)
        .lt("month", monthEnd)
        .order("title", { ascending: true });

      if (error) {
        console.error("Erro ao buscar treinos:", error);
        setLoading(false);
        return;
      }

      let filtered = rawWorkouts;

if (plano === "free") {
  filtered = filtered.filter((w) => w.is_free).slice(0, 4);
} else {
  filtered = filtered.slice(0, 20);
}

if (tag) {
  filtered = filtered.filter((w) => w.tag === tag);
}


      setWorkouts(filtered);
      setLoading(false);
    };

    const fetchDoneWorkouts = async () => {
  const uuid = await fetchUserUUID(user.id);

  if (!uuid) return;

  const { data, error } = await supabase
    .from("user_workout_done")
    .select("workout_id")
    .eq("user_id", uuid); // UUID from users table

  if (error) {
    console.error("Erro lendo treinos feitos", error);
    return;
  }

  if (data) {
    setDoneWorkouts(data.map((item) => item.workout_id));
  }
};


    fetchWorkoutsAndExercises();
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {workouts.map((workout) => {
        const isDone = doneWorkouts.includes(workout.id);

        return (
          <Card key={workout.id}>
            <CardContent className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold">{workout.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {workout.description}
              </p>

              <WorkoutModal
                title={workout.title}
                description={workout.description}
                exercises={workout.exercises}
              />

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
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
