"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Save } from "lucide-react";
import ExerciseEditor from "./ExerciseEditor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const TAGS = ["Força", "Cardio", "Superior", "Inferiores", "Mobilidade"];

type Workout = {
  id: string;
  title: string;
  description: string;
  is_free: boolean;
  tag?: string;
  month: string;
  release_at: string;
  exercises?: unknown[];
};


export default function AdminWorkoutManager() {
  const now = new Date();
  const [month, setMonth] = useState(now.toISOString().slice(0, 7));
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [editing, setEditing] = useState<Record<string, Workout>>({});
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, isLoaded } = useUser();
const isAdmin = user?.emailAddresses[0]?.emailAddress === "mateuspalacio@gmail.com";
  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      const res = await fetch(`/api/workouts?from=${month}`);
const json = await res.json();
console.log("Fetched workouts:", json); // <- this will help confirm

if (Array.isArray(json)) {
  setWorkouts(json); // ✅ ACTUALLY update your state
} else {
  console.error("Unexpected response from API:", json);
}

      setLoading(false);
    };

    fetchWorkouts();
  }, [month]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditChange = (id: string, field: keyof Workout, value: any) => {
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

    const res = await fetch(`/api/workouts/${id}/edit`, {
      method: "PUT",
      body: JSON.stringify(update),
      headers: { "Content-Type": "application/json" },
    });
if (res.ok) {
  cancelEditing(id);
  setStatus("Alterações salvas com sucesso.");
  const refreshed = await fetch(`/api/workouts?from=${month}`);
  const data = await refreshed.json();
  if (Array.isArray(data)) {
  setWorkouts(data);
} else {
  console.error("API returned unexpected format:", data);
}

}

     else {
      setStatus("Erro ao salvar alterações.");
    }
  };

  const deleteWorkout = async (id: string) => {
    const res = await fetch(`/api/workouts/${id}`, { method: "DELETE" });
    if (res.ok) {
      setWorkouts((prev) => prev.filter((w) => w.id !== id));
    }
  };

  const router = useRouter();

useEffect(() => {
  if (isLoaded && !isAdmin) {
    router.push("/");
  }
}, [isLoaded, isAdmin, router]);

if (!isLoaded || !isAdmin) return null;

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
                  onChange={(e) => handleEditChange(w.id, "title", e.target.value)}
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
  <Select
    value={editing[w.id].tag || ""}
    onValueChange={(value) => handleEditChange(w.id, "tag", value)}
  >
    <SelectTrigger className="w-full">
      <SelectValue placeholder="— Nenhuma —" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="Nenhuma">— Nenhuma —</SelectItem>
      {TAGS.map((tag) => (
        <SelectItem key={tag} value={tag}>
          {tag}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

              <div>
  <Label>Plano</Label>
  <Select
    value={editing[w.id].is_free ? "free" : "pro"}
    onValueChange={(value) =>
      handleEditChange(w.id, "is_free", value === "free")
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
                <p className="text-sm text-muted-foreground">{w.description}</p>
                <p className="text-xs">
                  📌 {w.tag || "Sem tag"} — Plano:{" "}
                  <strong>{w.is_free ? "Gratuito" : "PRO"}</strong>
                </p>
                <p className="text-xs text-muted-foreground">
                  Liberar em:{" "}
                  {w.release_at
                    ? new Date(w.release_at).toLocaleString("pt-BR")
                    : "—"}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" onClick={() => startEditing(w)}>
                  Editar
                </Button>
                <Button variant="destructive" onClick={() => deleteWorkout(w.id)}>
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
