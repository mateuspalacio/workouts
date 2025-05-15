"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <motion.main
      className="max-w-3xl mx-auto px-6 py-24 space-y-8 bg-slate-50 rounded-2xl shadow-xl border border-muted/20 text-background"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold">Termos de Uso</h1>

      <p className="text-muted">
        Ao utilizar este aplicativo, você concorda com os termos descritos abaixo.
      </p>

      <ul className="list-disc list-inside space-y-2 text-muted">
        <li>Não utilize esta plataforma para fins ilegais, prejudiciais ou antiéticos.</li>
        <li>Você é o único responsável pelo uso dos treinos e conteúdos aqui disponibilizados.</li>
        <li>Podemos modificar funcionalidades, planos e preços a qualquer momento.</li>
        <li>Assinaturas PRO renovam automaticamente, salvo cancelamento antes do fim do ciclo.</li>
      </ul>

      <p className="text-muted">
        Em caso de dúvidas sobre os termos, entre em contato conosco em:{' '}
        <a href="mailto:suporte@Elevio.app" className="underline">
          suporte@Elevio.app
        </a>
        .
      </p>
    </motion.main>
  );
}
