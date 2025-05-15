"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <motion.main
      className="max-w-3xl mx-auto px-6 py-24 space-y-8 text-foreground"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold">Política de Privacidade</h1>

      <p className="text-muted-foreground">
        Nós valorizamos a sua privacidade. Este aplicativo armazena apenas os dados necessários para
        o gerenciamento da sua conta e assinatura.
      </p>

      <p>
        Nunca vendemos seus dados. Seus treinos e informações pessoais não são reutilizados, nem
        compartilhados com terceiros, nem usados para treinar modelos de inteligência artificial.
      </p>

      <p>
        Todas as requisições são feitas de forma segura e criptografada. Se você tiver dúvidas ou
        preocupações sobre o uso dos seus dados, entre em contato conosco em:{' '}
        <a href="mailto:suporte@Elevio.app" className="underline">
          suporte@Elevio.app
        </a>
        .
      </p>
    </motion.main>
  );
}
