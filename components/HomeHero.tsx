"use client";

import { useUser, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeHero() {
  const { isSignedIn } = useUser();

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
          <Button size="lg">
            Seus Treinos
          </Button>
          </Link>
        ) : (
          <SignUpButton mode="modal">
            <Button size="lg">Começar agora</Button>
          </SignUpButton>
        )}
            <Link href={'/precos'}>
        <Button variant="secondary" size="lg">
          Ver plano Pro
        </Button>
        </Link>
      </div>
    </section>
  );
}
