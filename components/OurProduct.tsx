"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OurProduct() {
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
        <Link href="/precos">
          <Button size="lg" variant={"secondary"} className="text-lg mt-2">
            Assinar agora
          </Button>
        </Link>
      </div>
    </motion.section>
  );
}
