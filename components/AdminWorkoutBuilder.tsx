"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Exercise, ExerciseTemplate, Workout } from "@/types/Workout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function AdminWorkoutBuilder() {
  const [templates, setTemplates] = useState<ExerciseTemplate[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [currentWorkout, setCurrentWorkout] = useState<Omit<Workout, "exercises">>({
    title: "",
    description: "",
    is_free: true,
    month: new Date().toISOString().slice(0, 7),
  release_at: "",
  });

  const [exerciseForm, setExerciseForm] = useState<Exercise>({
    name: "",
    sets_reps: "",
    video_url: "",
    notes: "",
  });

  const [exerciseQueue, setExerciseQueue] = useState<Exercise[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
    const TAG_OPTIONS = ["Força", "Cardio", "Superior", "Inferiores", "Mobilidade"];

  const { user, isLoaded } = useUser();
  const isAdmin = user?.emailAddresses[0]?.emailAddress === "mateuspalacio@gmail.com";
  // Load exercise templates from Supabase
  useEffect(() => {
  const fetchTemplates = async () => {
    const res = await fetch("/api/exercise-templates");
    const json = await res.json();

    if (json.success) {
      setTemplates(json.templates);
    } else {
      console.error("Erro ao buscar templates:", json.message);
    }
  };

  fetchTemplates();
}, []);


  const handleAddExercise = () => {
    if (!exerciseForm.name || !exerciseForm.sets_reps) return;
    setExerciseQueue((prev) => [...prev, exerciseForm]);
    setExerciseForm({ name: "", sets_reps: "", video_url: "", notes: "" });
    setSelectedTemplateId("");
  };

  const handleAddWorkout = () => {
    if (!currentWorkout.title) return;
    const fullWorkout: Workout = {
      ...currentWorkout,
      exercises: exerciseQueue,
    };
    setWorkouts((prev) => [...prev, fullWorkout]);
    setCurrentWorkout({
      title: "",
      description: "",
      is_free: true,
      month: new Date().toISOString().slice(0, 7),
    });
    setExerciseQueue([]);
  };

  const handleTemplateChange = (id: string) => {
    const template = templates.find((t) => t.id === id);
    if (template) {
      setExerciseForm({
        name: template.name,
        sets_reps: template.sets_reps,
        video_url: template.video_url,
        notes: template.notes || "",
      });
      setSelectedTemplateId(id);
    }
  };

  const removeWorkout = (index: number) => {
    setWorkouts((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExercise = (index: number) => {
    setExerciseQueue((prev) => prev.filter((_, i) => i !== index));
  };

  const publishAll = async () => {
  setLoading(true);
  setStatus(null);

  const res = await fetch("/api/workouts/bulk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ workouts }),
  });

  const result = await res.json();

  if (res.ok && result.success) {
    setStatus("Todos os treinos foram publicados com sucesso!");
    setWorkouts([]);
  } else {
    setStatus(result.message || "Erro ao publicar os treinos.");
  }

  setLoading(false);
};

  const router = useRouter();

useEffect(() => {
  if (isLoaded && !isAdmin) {
    router.push("/");
  }
}, [isLoaded, isAdmin, router]);

if (!isLoaded || !isAdmin) return null;

  return (
    <div className="space-y-10">
      {/* Workout Form */}
      <section>
        <h2 className="text-xl font-bold mb-4">Novo Treino</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={currentWorkout.title}
              onChange={(e) => setCurrentWorkout({ ...currentWorkout, title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={currentWorkout.description}
              onChange={(e) => setCurrentWorkout({ ...currentWorkout, description: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="month">Mês</Label>
            <Input
              id="month"
              type="month"
              value={currentWorkout.month}
              onChange={(e) => setCurrentWorkout({ ...currentWorkout, month: e.target.value })}
            />
          </div>
          <div>
  <Label htmlFor="release_at">Liberar em</Label>
  <Input
    id="release_at"
    type="datetime-local"
    value={currentWorkout.release_at || ""}
    onChange={(e) =>
      setCurrentWorkout({
        ...currentWorkout,
        release_at: e.target.value,
      })
    }
  />
</div>

        <div>
  <Label htmlFor="tag">Categoria</Label>
  <Select
    value={currentWorkout.tag || ""}
    onValueChange={(value) =>
      setCurrentWorkout({ ...currentWorkout, tag: value })
    }
  >
    <SelectTrigger className="w-full">
      <SelectValue placeholder="— Nenhuma —" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="Nenhuma">— Nenhuma —</SelectItem>
      {TAG_OPTIONS.map((tag) => (
        <SelectItem key={tag} value={tag}>
          {tag}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>


         <div>
  <Label htmlFor="is_free">Plano</Label>
  <Select
    value={currentWorkout.is_free ? "free" : "pro"}
    onValueChange={(value) =>
      setCurrentWorkout({ ...currentWorkout, is_free: value === "free" })
    }
  >
    <SelectTrigger className="w-full">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="free">Gratuito</SelectItem>
      <SelectItem value="pro">PRO</SelectItem>
    </SelectContent>
  </Select>
</div>

        </div>
      </section>

      {/* Exercise Add Form */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Adicionar Exercício</h3>
        <div className="space-y-2">
          <div>
  <Label>Usar template</Label>
  <Select
    value={selectedTemplateId}
    onValueChange={(id) => handleTemplateChange(id)}
  >
    <SelectTrigger className="w-full">
      <SelectValue placeholder="— Nenhum —" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="Nenhum">— Nenhum —</SelectItem>
      {templates.map((t) => (
        <SelectItem key={t.id} value={t.id}>
          {t.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>


          <div>
            <Label>Nome</Label>
            <Input
              value={exerciseForm.name}
              onChange={(e) => setExerciseForm({ ...exerciseForm, name: e.target.value })}
            />
          </div>
          <div>
            <Label>Séries e Repetições</Label>
            <Input
              value={exerciseForm.sets_reps}
              onChange={(e) => setExerciseForm({ ...exerciseForm, sets_reps: e.target.value })}
            />
          </div>
          <div>
            <Label>URL do vídeo</Label>
            <Input
              value={exerciseForm.video_url}
              onChange={(e) => setExerciseForm({ ...exerciseForm, video_url: e.target.value })}
            />
          </div>
          <div>
            <Label>Notas</Label>
            <Textarea
              value={exerciseForm.notes}
              onChange={(e) => setExerciseForm({ ...exerciseForm, notes: e.target.value })}
            />
          </div>

          <Button type="button" onClick={handleAddExercise}>
            Adicionar exercício
          </Button>
        </div>

        {/* Preview Exercise Queue */}
        {exerciseQueue.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium mb-2">Exercícios adicionados</h4>
            <ul className="space-y-2">
              {exerciseQueue.map((ex, i) => (
                <li key={i} className="border p-3 rounded relative">
                  <p className="font-semibold">{ex.name} — {ex.sets_reps}</p>
                  <p className="text-sm text-muted-foreground italic">{ex.video_url}</p>
                  {ex.notes && <p className="text-sm">{ex.notes}</p>}
                  <button
                    type="button"
                    onClick={() => removeExercise(i)}
                    className="absolute top-2 right-2 text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Add Workout Button */}
        <Button className="mt-6" onClick={handleAddWorkout}>
          Adicionar treino à lista
        </Button>
      </section>

      {/* Preview & Publish */}
      {workouts.length > 0 && (
        <section>
          <h3 className="text-xl font-bold mb-4">Treinos prontos para publicação</h3>
          {workouts.map((w, i) => (
            <div key={i} className="border rounded p-4 mb-6 relative">
              <p className="text-lg font-semibold mb-1">
                {w.title} ({w.is_free ? "Gratuito" : "PRO"}) — {w.month}
              </p>
              <p className="text-sm text-muted-foreground mb-2">{w.description}</p>
              <ul className="space-y-1">
                {w.exercises.map((ex, idx) => (
                  <li key={idx} className="text-sm">
                    • {ex.name} ({ex.sets_reps})
                  </li>
                ))}
              </ul>
              <button
                onClick={() => removeWorkout(i)}
                className="absolute top-2 right-2 text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          <Button onClick={publishAll} disabled={loading}>
            {loading ? "Publicando..." : "Publicar todos"}
          </Button>
        </section>
      )}

      {status && <p className="text-sm mt-4">{status}</p>}
    </div>
  );
}
