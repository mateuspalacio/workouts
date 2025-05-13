// app/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      {/* Hero Section */}
      <section className="w-full max-w-4xl text-center py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Treinos de academia direto no seu celular
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Receba treinos de musculação todo mês com vídeos explicativos, feitos por um treinador com mais de 30 anos de experiência.
        </p>
        <Link href="/sign-up">
          <Button size="lg">Comece agora de graça</Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl py-16 grid gap-8 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Treinos gratuitos</h2>
            <p className="text-sm text-muted-foreground">
              Acesse 4 treinos todo mês sem pagar nada.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Plano PRO</h2>
            <p className="text-sm text-muted-foreground">
              Desbloqueie 20 treinos mensais e marque como concluído.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Vídeos exclusivos</h2>
            <p className="text-sm text-muted-foreground">
              Assista vídeos privados no YouTube com instruções detalhadas.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16">
        <h3 className="text-2xl font-semibold mb-4">Pronto pra treinar com propósito?</h3>
        <Link href="/sign-up">
          <Button size="lg">Criar minha conta</Button>
        </Link>
      </section>
    </main>
  );
}
