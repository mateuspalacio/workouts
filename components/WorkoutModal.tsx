import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
        <Button variant="outline" size="sm">
          Ver treino completo
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <ul className="space-y-4 mt-4">
          {exercises.map((ex) => (
            <li key={ex.id} className="border rounded p-3">
              <p className="font-semibold">{ex.name}</p>
              <p className="text-sm text-muted-foreground">{ex.sets_reps}</p>
              {ex.video_url && (
                <a
                  href={ex.video_url}
                  target="_blank"
                  className="text-blue-600 text-sm underline"
                >
                  Ver vídeo
                </a>
              )}
              {ex.notes && <p className="text-sm mt-1">{ex.notes}</p>}
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
