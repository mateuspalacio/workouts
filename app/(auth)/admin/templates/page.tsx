"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type Template = {
  id: string;
  name: string;
  sets_reps: string;
  video_url: string;
  notes?: string;
};

export default function TemplateManagerPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [form, setForm] = useState<Omit<Template, "id">>({
    name: "",
    sets_reps: "",
    video_url: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const { user, isLoaded } = useUser();
  const router = useRouter();
  const isAdmin = user?.emailAddresses[0]?.emailAddress === "mateuspalacio@gmail.com";

  useEffect(() => {
    if (isLoaded && !isAdmin) router.push("/");
  }, [isLoaded, isAdmin]);

  useEffect(() => {
    const loadTemplates = async () => {
      const { data } = await supabase.from("exercise_templates").select("*").order("name");
      if (data) setTemplates(data);
    };
    loadTemplates();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const { data, error } = await supabase
      .from("exercise_templates")
      .insert(form)
      .select()
      .single();

    if (error) {
      setStatus("Erro ao salvar template.");
      setLoading(false);
      return;
    }

    setTemplates((prev) => [...prev, data]);
    setForm({ name: "", sets_reps: "", video_url: "", notes: "" });
    setStatus("Template criado com sucesso!");
    setLoading(false);
  };

  return (
    <main className="max-w-xl p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-6">Criar novo template de exercício</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <div>
          <Label htmlFor="name">Nome do exercício</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="sets_reps">Séries e repetições</Label>
          <Input
            id="sets_reps"
            value={form.sets_reps}
            onChange={(e) => setForm({ ...form, sets_reps: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="video_url">URL do vídeo</Label>
          <Input
            id="video_url"
            value={form.video_url}
            onChange={(e) => setForm({ ...form, video_url: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="notes">Notas</Label>
          <Textarea
            id="notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar template"}
        </Button>

        {status && <p className="text-sm mt-2">{status}</p>}
      </form>

      {/* List of Templates */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Templates existentes</h2>
        <ul className="space-y-3">
          {templates.map((t) => (
            <li key={t.id} className="border p-4 rounded">
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.sets_reps}</p>
              <p className="text-sm italic">{t.video_url}</p>
              {t.notes && <p className="text-sm">{t.notes}</p>}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
