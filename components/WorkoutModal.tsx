"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getYoutubeId } from "@/lib/getYoutubeId";

type Exercise = {
  id: string;
  name: string;
  sets_reps: string;
  video_url: string;
  notes?: string;
};

export default function WorkoutModal({
  title,
  description,
  exercises,
}: {
  title: string;
  description: string;
  exercises: Exercise[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          Ver treino completo
        </Button>
      </DialogTrigger>
<DialogContent className="w-full max-w-screen-lg max-h-[90vh] overflow-y-auto">

  <DialogHeader>
    <DialogTitle className="text-xl">{title}</DialogTitle>
    <DialogDescription>{description}</DialogDescription>
  </DialogHeader>

  <div className="mt-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 pb-4">
    {exercises.map((ex) => {
      const vid = getYoutubeId(ex.video_url);

      return (
        <div key={ex.id} className="space-y-2 border rounded p-3 shadow-sm bg-background">
          <div>
            <p className="font-semibold text-base">{ex.name}</p>
            <p className="text-sm text-muted-foreground">{ex.sets_reps}</p>
            {ex.notes && (
              <p className="text-sm italic text-muted-foreground">{ex.notes}</p>
            )}
          </div>

          {vid && (
            <div className="aspect-video w-full rounded overflow-hidden border">
              <iframe
                src={`https://www.youtube.com/embed/${vid}?rel=0&modestbranding=1&showinfo=0`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
                title={`Vídeo de ${ex.name}`}
              />
            </div>
          )}
        </div>
      );
    })}
  </div>
</DialogContent>

    </Dialog>
  );
}
