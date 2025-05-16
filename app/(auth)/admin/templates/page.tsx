"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type Template = {
  id: string;
  name: string;
  sets_reps: string;
  video_url: string;
  notes?: string;
};

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [form, setForm] = useState({
    name: "",
    sets_reps: "",
    video_url: "",
    notes: "",
  });

  const fetchTemplates = async () => {
    const res = await fetch("/api/templates");
    const data = await res.json();
    setTemplates(data || []);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleSubmit = async () => {
    const res = await fetch("/api/templates", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setForm({ name: "", sets_reps: "", video_url: "", notes: "" });
      fetchTemplates();
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/templates/${id}`, { method: "DELETE" });
    fetchTemplates();
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-10">
      <section>
        <h1 className="text-2xl font-bold mb-4">Templates de Exercício</h1>
        <div className="grid gap-4">
          {templates.map((t) => (
            <div
              key={t.id}
              className="border rounded p-4 relative bg-background"
            >
              <h2 className="font-semibold">{t.name}</h2>
              <p className="text-sm text-muted-foreground">
                {t.sets_reps} —{" "}
                <a
                  href={t.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  ver vídeo
                </a>
              </p>
              {t.notes && (
                <p className="text-sm text-muted-foreground italic">{t.notes}</p>
              )}
              <button
                onClick={() => handleDelete(t.id)}
                className="absolute top-2 right-2 text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Novo Template</h2>
        <div className="space-y-4">
          <div>
            <Label>Nome</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <Label>Séries e repetições</Label>
            <Input
              value={form.sets_reps}
              onChange={(e) => setForm({ ...form, sets_reps: e.target.value })}
            />
          </div>
          <div>
            <Label>Vídeo</Label>
            <Input
              value={form.video_url}
              onChange={(e) => setForm({ ...form, video_url: e.target.value })}
            />
          </div>
          <div>
            <Label>Notas (opcional)</Label>
            <Textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <Button onClick={handleSubmit}>Salvar template</Button>
        </div>
      </section>
    </div>
  );
}
