"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mzzrogol", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await res.json();

      if (data.ok || data.success) {
        setSubmitted(true);
        form.reset();
      } else {
        setError("Algo deu errado. Tente novamente.");
      }
    } catch (err) {
      console.error(err);
      setError("Algo deu errado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main
      className="max-w-2xl mx-auto px-6 py-12 bg-slate-50 rounded-2xl shadow-xl border border-muted/20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold mb-4 text-background">Suporte</h1>
      <p className="text-background mb-8">
        Está com alguma dúvida ou problema? Preencha o formulário abaixo e entraremos em contato o mais rápido possível.
      </p>

      {submitted ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg">
          Obrigado! Sua mensagem foi enviada com sucesso.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-background">Seu email</Label>
            <Input  className="text-background"
              type="email"
              name="email"
              id="email"
              required
              placeholder="voce@exemplo.com"
            />
          </div>

          <div>
            <Label  className="text-background" htmlFor="subject">Assunto</Label>
            <Input  className="text-background"
              type="text"
              name="subject"
              id="subject"
              required
              placeholder="Qual o problema?"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-background">Mensagem</Label>
            <Textarea  className="text-background"
              name="message"
              id="message"
              rows={5}
              required
              placeholder="Explique com detalhes o que está acontecendo ou deixe seu feedback"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar mensagem"}
          </Button>
        </form>
      )}
    </motion.main>
  );
}
