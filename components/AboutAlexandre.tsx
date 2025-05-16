"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutAlexandre() {
  return (
    <motion.section
      className="py-12 bg-background text-foreground"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
       <div className="space-y-4">
        <Image
          src="/alexandre-2.jpeg"
          width={400}
          height={400}
          alt="Alexandre Melo"
          className="rounded-xl shadow-xl object-cover w-full max-h-[400px]"
        />
        <Image
          src="/alexandre-3.jpeg"
          width={400}
          height={400}
          alt="Alexandre Melo"
          className="rounded-xl shadow-xl object-cover w-full max-h-[400px]"
        />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Sobre o Alexandre</h2>
  <p className="text-muted-foreground text-base leading-relaxed">
    Com três décadas dedicadas à promoção da saúde, performance e qualidade de vida, o professor <strong>Alexandre Melo Façanha da Costa</strong> é referência quando o assunto é treinamento físico com ciência, técnica e resultados.
  </p>
  <p className="text-muted-foreground text-base leading-relaxed">
    Graduado em Educação Física pela <strong>UNIFOR (1997)</strong> e pós-graduado em <strong>Fisiologia do Exercício pela UNIFESP (2001)</strong>, Alexandre possui uma sólida base acadêmica aliada a uma vasta experiência prática. Seu registro profissional é o <strong>CREF 365G</strong>.
  </p>
  <p className="text-muted-foreground text-base leading-relaxed">
    Desde o início da sua trajetória, atua com ênfase em <strong>musculação, treinamento funcional e performance esportiva</strong>. Iniciou seus trabalhos com Treinamento Funcional ainda nos anos 2000, sendo um dos precursores da modalidade em Fortaleza. Atuou como docente na <strong>FANOR</strong>, ministrando a disciplina de <strong>Neurofisiologia Aplicada ao Treinamento Funcional</strong>, unindo teoria e prática no desenvolvimento de profissionais da área.
  </p>
  <p className="text-muted-foreground text-base leading-relaxed">
    Durante cerca de 15 anos, foi responsável pelo preparo físico de <strong>atletas de MMA de alto nível</strong>, como Júnior Killer, Samurai, Paulo Guerreiro, Índio, Jorge Soares, Gigueto, Andrezinho, Hermes França e muitos outros. Também colaborou com o treinamento de <strong>boxeadores como Joaquim Carneiro</strong>, consolidando sua reputação no esporte de alto rendimento.
  </p>
  <p className="text-muted-foreground text-base leading-relaxed">
    Desde 2014, é <strong>Level 1 de CrossFit</strong>, tendo atuado como <strong>coach e Head Coach</strong> por cerca de 8 anos em uma das unidades da <strong>CrossFit Porão</strong>. Soma ainda mais de <strong>25 anos de atuação como personal trainer</strong>, com uma abordagem personalizada, segura e eficaz para todos os públicos.
  </p>
  <p className="text-muted-foreground text-base leading-relaxed">
    Fundador do <strong>CTAM - Centro de Treinamento Alexandre Melo</strong>, que operou de 1990 a 2022, Alexandre também é <strong>palestrante nas áreas de treinamento resistido, biomecânica aplicada à musculação, levantamento de peso olímpico (LPO) e Kettlebell Training</strong>.
  </p>
  <p className="text-muted-foreground text-base leading-relaxed">
    Aqui, cada treino é construído com propósito, embasamento técnico e compromisso com o seu resultado.
  </p>

        </div>
      </div>
    </motion.section>
  );
}
