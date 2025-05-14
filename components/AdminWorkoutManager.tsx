"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { Trash2, Save } from "lucide-react";
import ExerciseEditor from "./ExerciseEditor";

const TAGS = ["Força", "Cardio", "Superior", "Inferiores", "Mobilidade"];

type Workout = {
  id: string;
  title: string;
  description: string;
  is_free: boolean;
  tag?: string;
  month: string;
  release_at: string;
};

export default function AdminWorkoutManager() {
  const now = new Date();
  const [month, setMonth] = useState(now.toISOString().slice(0, 7)); // YYYY-MM
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [editing, setEditing] = useState<Record<string, Workout>>({});
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .gte("month", `${month}-01`)
        .lt("month", new Date(Number(month.split("-")[0]), Number(month.split("-")[1]), 1).toISOString().slice(0, 10))
        .order("title");

      if (error) console.error(error);
      else setWorkouts(data || []);
      setLoading(false);
    };

    fetch();
  }, [month]);

  const handleEditChange = (id: string, field: keyof Workout, value: string | boolean) => {
    setEditing((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const startEditing = (workout: Workout) => {
    setEditing((prev) => ({ ...prev, [workout.id]: { ...workout } }));
  };

  const cancelEditing = (id: string) => {
    setEditing((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const saveChanges = async (id: string) => {
    const update = editing[id];
    const { error } = await supabase
      .from("workouts")
      .update({
        title: update.title,
        description: update.description,
        is_free: update.is_free,
        tag: update.tag,
  release_at: update.release_at
    ? new Date(update.release_at)
    : null,
      })
      .eq("id", id);

    if (error) {
      setStatus("Erro ao salvar alterações.");
    } else {
      setWorkouts((prev) =>
        prev.map((w) => (w.id === id ? { ...w, ...update } : w))
      );
      cancelEditing(id);
      setStatus("Alterações salvas com sucesso.");
    }
  };

  const deleteWorkout = async (id: string) => {
    const { error } = await supabase.from("workouts").delete().eq("id", id);
    if (!error) {
      setWorkouts((prev) => prev.filter((w) => w.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Mês</Label>
        <Input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full max-w-xs"
        />
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : workouts.length === 0 ? (
        <p>Nenhum treino para esse mês.</p>
      ) : (
        workouts.map((w) =>
          editing[w.id] ? (
            <div key={w.id} className="p-4 border rounded space-y-2">
              <div>
                <Label>Título</Label>
                <Input
                  value={editing[w.id].title}
                  onChange={(e) =>
                    handleEditChange(w.id, "title", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={editing[w.id].description}
                  onChange={(e) =>
                    handleEditChange(w.id, "description", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Tag</Label>
                <select
                  value={editing[w.id].tag || ""}
                  onChange={(e) =>
                    handleEditChange(w.id, "tag", e.target.value)
                  }
                  className="border p-2 rounded w-full"
                >
                  <option value="">— Nenhuma —</option>
                  {TAGS.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Plano</Label>
                <select
                  value={editing[w.id].is_free ? "free" : "pro"}
                  onChange={(e) =>
                    handleEditChange(w.id, "is_free", e.target.value === "free")
                  }
                  className="border p-2 rounded w-full"
                >
                  <option value="free">Gratuito</option>
                  <option value="pro">PRO</option>
                </select>
              </div>
<div>
  <Label>Data de liberação</Label>
  <Input
    type="datetime-local"
    value={editing[w.id].release_at?.slice(0, 16) || ""}
    onChange={(e) =>
      handleEditChange(w.id, "release_at", e.target.value)
    }
  />
</div>

              <div className="flex gap-2 mt-3">
                <Button onClick={() => saveChanges(w.id)}>
                  <Save size={16} className="mr-1" /> Salvar
                </Button>
                <Button variant="secondary" onClick={() => cancelEditing(w.id)}>
                  Cancelar
                </Button>
              </div>
  <div className="mt-2 pl-4 border-l">
    <ExerciseEditor workoutId={w.id} />
  </div>

            </div>
          ) : (
            <div
              key={w.id}
              className="p-4 border rounded flex justify-between items-start gap-4"
            >
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold">{w.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {w.description}
                </p>
                <p className="text-xs">
                  📌 {w.tag || "Sem tag"} — Plano:{" "}
                  <strong>{w.is_free ? "Gratuito" : "PRO"}</strong>
                </p>
                <p className="text-xs text-muted-foreground">
  Liberar em: {w.release_at ? new Date(w.release_at).toLocaleString("pt-BR") : "—"}
</p>

              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" onClick={() => startEditing(w)}>
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteWorkout(w.id)}
                >
                  <Trash2 size={16} className="mr-1" /> Excluir
                </Button>
              </div>
            </div>
          )
        )
      )}

      {status && <p className="text-sm text-muted-foreground">{status}</p>}
    </div>
  );
}
