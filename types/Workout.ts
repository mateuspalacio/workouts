
export type ExerciseTemplate = {
  id: string;
  name: string;
  sets_reps: string;
  video_url: string;
  notes?: string;
};

export type Exercise = {
  id?: string;
  name: string;
  sets_reps: string;
  video_url: string;
  notes?: string;
};

export type Workout = {
  id?: string;
  title: string;
  description: string;
  is_free: boolean;
  month: string;
  tag?: string;
  exercises: Exercise[];
  release_at?: string;
};

export type DoneWorkout = {
  workout_id: string;
  done_at: string;
  title: string;
};
