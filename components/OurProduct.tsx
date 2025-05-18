"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function OurProduct() {
  
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
      className="w-full bg-slate-900 text-white py-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
        <h2 className="text-3xl font-bold leading-tight">
          Este é o nosso produto.
        </h2>
        <p className="text-white/80 text-base max-w-2xl mx-auto">
          Treinos reais, pensados mês a mês, com vídeos, explicação e estrutura. Não é um app genérico — é a experiência do Alexandre aplicada no seu dia a dia.
        </p>
        {!isPremium ? (<Link href="/precos">
          <Button size="lg" variant={"secondary"} className="text-lg mt-2">
            Assinar agora
          </Button>
        </Link>):(  <Link href={'/dashboard'}>
          <Button size="lg" variant={"secondary"} className="text-lg mt-2">
            Ir para o Painel de Treinos
          </Button>
          </Link>)}
      </div>
    </motion.section>
  );
}
