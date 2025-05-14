"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutAlexandre() {
  return (
    <motion.section
      className="py-24 bg-background text-foreground"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <Image
          src="/pt-foto.jpg"
          width={400}
          height={400}
          alt="Alexandre Melo"
          className="rounded-xl shadow-xl object-cover w-full max-h-[400px]"
        />
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Sobre o Alexandre</h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Alexandre Melo é um personal trainer com quase 30 anos de experiência em treinamento físico,
            musculação, reabilitação e preparação funcional. Referência em Fortaleza, já auxiliou centenas
            de alunos em academias tradicionais, estúdios e treinamentos personalizados.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            Reconhecido por sua didática clara, paciência e metodologia prática, Alexandre também
            é amplamente recomendado por nutricionistas e fisioterapeutas da região.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            Agora, você pode treinar com a experiência dele no seu ritmo — onde estiver.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
