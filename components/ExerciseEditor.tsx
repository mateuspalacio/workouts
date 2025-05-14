"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ExerciseTemplate } from "@/types/Workout";

type Exercise = {
  id: string;
  name: string;
  sets_reps: string;
  video_url: string;
  notes?: string;
};

export default function ExerciseEditor({ workoutId }: { workoutId: string }) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [form, setForm] = useState<Omit<Exercise, "id">>({
    name: "",
    sets_reps: "",
    video_url: "",
    notes: "",
  });
  const [status, setStatus] = useState<string | null>(null);
    const [templates, setTemplates] = useState<ExerciseTemplate[]>([]);
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");

    useEffect(() => {
    const loadTemplates = async () => {
        const { data } = await supabase.from("exercise_templates").select("*").order("name");
        if (data) setTemplates(data);
    };
    loadTemplates();
    }, []);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("exercises")
        .select("*")
        .eq("workout_id", workoutId)
        .order("id");
      if (data) setExercises(data);
    };
    load();
  }, [workoutId]);

  const handleAdd = async () => {
    if (!form.name || !form.sets_reps) return;

    const { data, error } = await supabase
      .from("exercises")
      .insert([{ ...form, workout_id: workoutId }])
      .select()
      .single();

    if (error) return setStatus("Erro ao adicionar exercício.");

    setExercises((prev) => [...prev, data]);
    setForm({ name: "", sets_reps: "", video_url: "", notes: "" });
    setStatus(null);
  };

  const handleUpdate = async (id: string, field: keyof Exercise, value: string) => {
    const updated = exercises.map((ex) =>
      ex.id === id ? { ...ex, [field]: value } : ex
    );
    setExercises(updated);

    const { error } = await supabase
      .from("exercises")
      .update({ [field]: value })
      .eq("id", id);
    if (error) setStatus("Erro ao atualizar.");
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("exercises").delete().eq("id", id);
    if (!error) {
      setExercises((prev) => prev.filter((ex) => ex.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-sm text-muted-foreground">Exercícios</h4>

      {exercises.map((ex) => (
        <div key={ex.id} className="border p-3 rounded space-y-2 relative">
          <Input
            value={ex.name}
            onChange={(e) => handleUpdate(ex.id, "name", e.target.value)}
            placeholder="Nome"
          />
          <Input
            value={ex.sets_reps}
            onChange={(e) => handleUpdate(ex.id, "sets_reps", e.target.value)}
            placeholder="Séries e repetições"
          />
          <Input
            value={ex.video_url}
            onChange={(e) => handleUpdate(ex.id, "video_url", e.target.value)}
            placeholder="URL do vídeo"
          />
          <Textarea
            value={ex.notes || ""}
            onChange={(e) => handleUpdate(ex.id, "notes", e.target.value)}
            placeholder="Notas"
          />
          <button
            onClick={() => handleDelete(ex.id)}
            className="absolute top-2 right-2 text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <div className="border p-3 rounded space-y-2">
  <h5 className="font-semibold text-sm mb-1">Adicionar exercício</h5>

  <select
    value={selectedTemplateId}
    onChange={(e) => {
      const id = e.target.value;
      setSelectedTemplateId(id);
      const t = templates.find((t) => t.id === id);
      if (t) {
        setForm({
          name: t.name,
          sets_reps: t.sets_reps,
          video_url: t.video_url,
          notes: t.notes || "",
        });
      }
    }}
    className="border p-2 rounded w-full"
  >
    <option value="">— Usar template —</option>
    {templates.map((t) => (
      <option key={t.id} value={t.id}>
        {t.name}
      </option>
    ))}
  </select>

  <Input
    value={form.name}
    onChange={(e) => setForm({ ...form, name: e.target.value })}
    placeholder="Nome do exercício"
  />
  <Input
    value={form.sets_reps}
    onChange={(e) => setForm({ ...form, sets_reps: e.target.value })}
    placeholder="Séries e repetições"
  />
  <Input
    value={form.video_url}
    onChange={(e) => setForm({ ...form, video_url: e.target.value })}
    placeholder="URL do vídeo"
  />
  <Textarea
    value={form.notes}
    onChange={(e) => setForm({ ...form, notes: e.target.value })}
    placeholder="Notas (opcional)"
  />

  <Button onClick={handleAdd}>Adicionar exercício</Button>
</div>


      {status && <p className="text-sm text-red-500">{status}</p>}
    </div>
  );
}
