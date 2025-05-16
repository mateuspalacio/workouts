"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  tag?: string;
};

export default function WorkoutGrid({ month, tag }: { month: string; tag?: string }) {
  const { user, isLoaded } = useUser();
  const isPremium = usePremium();
  const plano = isPremium ? "pro" : "free";

  const [workouts, setWorkouts] = useState<Workout[]>([]);
const [doneWorkouts, setDoneWorkouts] = useState<string[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!isLoaded || !user?.id) return;

  const fetchData = async () => {
    setLoading(true);

    // Fetch workouts
    const res = await fetch(`/api/workouts?month=${month}&tag=${tag}&plano=${plano}`);
    const workoutJson = await res.json();

    // Fetch done workouts
    const doneRes = await fetch(`/api/users/${user.id}/done`);
    const doneJson = await doneRes.json();

    setWorkouts(workoutJson || []);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDoneWorkouts((doneJson || []).map((w: any) => w.workout_id));
    setLoading(false);
  };

  fetchData();
}, [isLoaded, plano, user?.id, tag, month]);

async function markWorkoutDone(workoutId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/workouts/${workoutId}/done`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  return await res.json(); // { success: true/false, ... }
}
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {workouts.map((workout) => {
        const isDone = doneWorkouts.includes(workout.id);

        return (
          <Card key={workout.id}>
            <CardContent className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold">{workout.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2"
                style={{ minHeight: "3.5rem" }} >
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
              <p className="text-xs text-muted-foreground italic">Tag: {workout.tag}</p>

            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
