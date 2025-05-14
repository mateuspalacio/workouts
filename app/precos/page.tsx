"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PrecosPage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-24 bg-background text-foreground space-y-16">
      {/* Header */}
      <motion.section
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold">Escolha seu plano</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Comece com o plano gratuito ou desbloqueie todo o conteúdo com o plano PRO.
        </p>
      </motion.section>

      {/* Pricing Cards */}
      <motion.div
        className="grid md:grid-cols-2 gap-8 max-w-4xl w-full px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Free Plan */}
        <Card className="bg-slate-50 shadow-xl border border-muted/20 rounded-xl relative">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">Gratuito</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <ul className="text-sm text-muted-foreground list-disc ml-4">
              <li>4 treinos por mês</li>
              <li>Vídeos explicativos</li>
              <li>Acesso imediato</li>
              <li>Suporte básico</li>
            </ul>
            <Link href="/sign-up">
              <Button variant="default" className="w-full">Começar de graça</Button>
            </Link>
          </CardContent>
        </Card>

        {/* PRO Plan */}
        <Card className="bg-slate-50 shadow-xl border border-muted/20 rounded-xl relative">
          {/* Highlight Badge */}
          <div className="absolute top-4 right-4 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full shadow">
            Mais popular
          </div>
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">PRO — R$20/mês</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <ul className="text-sm text-muted-foreground list-disc ml-4">
              <li>20 treinos novos todo mês</li>
              <li>Marcar treinos como concluídos</li>
              <li>Conteúdo exclusivo</li>
              <li>Suporte prioritário</li>
            </ul>
            <Link href="/upgrade">
              <Button className="w-full">Assinar plano PRO</Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
