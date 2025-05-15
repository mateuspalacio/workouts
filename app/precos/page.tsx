"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SignUpButton, useClerk, useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function PrecosPage() {
  
  const [loading, setLoading] = useState('');
  const { user } = useUser();
  const { openSignIn } = useClerk(); // <-- This is how you open the sign-in modal
  const handleCheckout = async (plan: 'monthly' | 'yearly') => {
    if (!user) {
      openSignIn(); // <-- Now it works
      return;
    }

    setLoading(plan);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        body: JSON.stringify({ plan }),
        headers: { 'Content-Type': 'application/json' },
      });

      const { url, error } = await res.json();

      if (url) {
        window.location.href = url;
      } else {
        console.error('Stripe checkout failed:', error);
        alert('Algum erro aconteceu, por favor tente novamente.');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Algum erro aconteceu, por favor tente novamente.');
    } finally {
      setLoading('');
    }
  };

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
        className="grid md:grid-cols-3 gap-8 max-w-6xl w-full px-4"
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
              <li>Sem Histórico</li>
              <li>Suporte básico</li>
            </ul>
            <SignUpButton mode="modal">
              <Button variant="default" className="w-full">Começar de graça</Button>
            </SignUpButton>
          </CardContent>
        </Card>

        {/* PRO Monthly */}
        <Card className="bg-slate-50 shadow-xl border border-muted/20 rounded-xl relative">
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
              <li>Histórico PRO</li>
              <li>Suporte prioritário</li>
            </ul>
              <Button className="w-full"
            onClick={() => handleCheckout('monthly')}
            disabled={loading === 'monthly'}>
              
            {loading === 'monthly' ? 'Redirecionando...' : 'Assinar Plano Mensal'}
            </Button>
          </CardContent>
        </Card>

        {/* PRO Yearly */}
        <Card className="bg-slate-50 shadow-xl border border-muted/20 rounded-xl relative">
          <div className="absolute top-4 right-4 text-xs bg-green-600 text-white px-2 py-0.5 rounded-full shadow">
            Melhor valor
          </div>
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">PRO Anual — R$200/ano</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <ul className="text-sm text-muted-foreground list-disc ml-4">
              <li>Economize R$40 no ano</li>
              <li>20 treinos novos todo mês</li>
              <li>Marcar como concluído</li>
              <li>Histórico PRO</li>
              <li>Suporte prioritário</li>
            </ul>
              <Button className="w-full"
            onClick={() => handleCheckout('yearly')}
            disabled={loading === 'yearly'}>
              
            {loading === 'yearly' ? 'Redirecionando...' : 'Assinar plano Anual'}</Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
