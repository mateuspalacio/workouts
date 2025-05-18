"use client";

import { useUser, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomeHero() {
  const { user, isSignedIn } = useUser();

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
    <section className="text-center space-y-6">
      <motion.section
  className="text-center space-y-6"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
    Transforme seu corpo com treinos online guiados por um expert
  </h1>
  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
    Treinos mensais com vídeos explicativos, feitos por um personal com quase 30 anos de
    experiência. Resultados reais, na sua rotina.
  </p>
</motion.section>

      <div className="flex justify-center mt-4 gap-4 flex-wrap">
        {isSignedIn ? (
            <Link href={'/dashboard'}>
          <Button size="lg" className="text-lg mt-2">
            Ir para o Painel de Treinos
          </Button>
          </Link>
        ) : (
          <SignUpButton mode="modal">
            <Button size="lg" className="text-lg mt-2">Começar agora</Button>
          </SignUpButton>
        )}
            {!isPremium ? (<Link href={'/precos'}>
        <Button variant="secondary" size="lg" className="text-lg mt-2"> 
          Ver plano Pro
        </Button>
        </Link>) : (<div/>)}
      </div>
    </section>
  );
}
