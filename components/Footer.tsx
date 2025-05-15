import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background text-muted-foreground mt-10">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
        {/* Left side */}
        <div className="text-center sm:text-left space-y-1">
          <p>&copy; {new Date().getFullYear()} Elevio</p>
          <p>
            Contato: <a href="mailto:hey@Elevioai.com" className="hover:underline">hey@Elevioai.com</a>
          </p>
        </div>
<p>
          Plataforma de treino online com planos mensais, vídeos explicativos e personal trainer
          profissional. Ideal para quem quer treinar com método e regularidade.
        </p>
        <p>
          Palavras-chave: treino musculação online, treino para academia Brasil, personal trainer,
          treino gratuito, plano de treino mensal.
        </p>
        {/* Right side links */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/privacidade" className="hover:underline underline-offset-4">Privacidade</Link>
          <Link href="/termos" className="hover:underline underline-offset-4">Termos</Link>
        </div>
      </div>
    </footer>
  );
}
