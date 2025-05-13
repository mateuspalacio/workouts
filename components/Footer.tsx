import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background text-muted-foreground mt-10">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
        {/* Left side */}
        <div className="text-center sm:text-left space-y-1">
          <p>&copy; {new Date().getFullYear()} WriteFlux</p>
          <p>
            Contato: <a href="mailto:hey@writefluxai.com" className="hover:underline">hey@writefluxai.com</a>
          </p>
        </div>

        {/* Right side links */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="hover:underline underline-offset-4">Home</Link>
          <Link href="/precos" className="hover:underline underline-offset-4">Planos</Link>
          <Link href="/privacidade" className="hover:underline underline-offset-4">Privacy</Link>
          <Link href="/termos" className="hover:underline underline-offset-4">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
