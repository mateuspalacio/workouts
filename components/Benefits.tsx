"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Clock4, Dumbbell, Star } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function Benefits() {
  
  const { user } = useUser();

    const [isPremium, setIsPremium] = useState(false);
    
      useEffect(() => {
        const checkPremiumStatus = async () => {
          if (!user?.id) return;
    
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
              method: "POST",
              body: JSON.stringify({ clerkId: user.id }),
              headers: { "Content-Type": "application/json" },
            });
    
            if (!res.ok) {
              throw new Error("Failed to fetch user data");
            }
    
            const json = await res.json();
            setIsPremium(json?.ispremium ?? false);
          } catch (err) {
            console.error("Error checking premium status:", err);
          }
        };
    
        checkPremiumStatus();
      }, [user]);
    
  return (
    <motion.section
      className="space-y-6 text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold">O que você recebe</h2>

      <div className="grid sm:grid-cols-2 gap-8 text-left">
        {/* Free Plan Card */}
        <div className="relative bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 text-slate-800">
          <div className="absolute top-4 right-4 text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full shadow">
            Grátis
          </div>
          <h3 className="text-lg font-semibold text-center">Plano Gratuito</h3>
          <ul className="space-y-2 text-sm mt-4">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              4 treinos mensais
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Vídeos explicativos
            </li>
            <li className="flex items-center gap-2 text-slate-400">❌ Histórico de treinos</li>
            <li className="flex items-center gap-2 text-slate-400">❌ Marcar como concluído</li>
          </ul>
        </div>

        {/* PRO Plan Card */}
        <div className="relative bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 text-slate-800">
          <div className="absolute top-4 right-4 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full shadow">
            Mais popular
          </div>
          <h3 className="text-lg font-semibold text-center">Plano PRO — R$ 20/mês</h3>
          <ul className="space-y-2 text-sm mt-4">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              20 treinos mensais
            </li>
            <li className="flex items-center gap-2">
              <Clock4 className="w-4 h-4 text-blue-600" />
              Acesso ao histórico
            </li>
            <li className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-blue-600" />
              Marcar treinos como feitos
            </li>
            <li className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              Mais variedade, mais resultado
            </li>
            <li className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              Use todas as futuras funcionalidades no pré-lançamento!
            </li>
          </ul>
          {!isPremium ? (<Link href="/precos">
            <Button className="w-full mt-6">Assinar agora</Button>
          </Link>):(<Link href={'/dashboard'}>
          <Button size="lg" className="w-full mt-6">
            Ir para o Painel de Treinos
          </Button>
          </Link>)}
          
        </div>
      </div>
    </motion.section>
  );
}
