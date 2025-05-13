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
import { WorkoutModalProps } from "@/types/WorkoutModalProps";

export default function WorkoutModal({
  title,
  description,
  video_url,
}: WorkoutModalProps) {
  // Extract YouTube video ID for embed
  const getVideoId = (url: string) => {
    const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(video_url);

  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Ver vídeo</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[720px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {videoId ? (
          <div className="aspect-video mt-4">
            <iframe
              className="rounded w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Vídeo do treino"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p className="text-red-500 text-sm">URL do vídeo inválida.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

