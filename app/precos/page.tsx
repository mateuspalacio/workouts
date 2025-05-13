// app/precos/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrecosPage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-16">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Escolha seu plano</h1>
        <p className="text-muted-foreground text-lg">
          Comece com o plano gratuito ou desbloqueie todo o conteúdo com o plano PRO.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Plano Gratuito */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Gratuito</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <ul className="text-sm text-muted-foreground list-disc ml-4">
              <li>4 treinos por mês</li>
              <li>Vídeos explicativos</li>
              <li>Acesso imediato</li>
            </ul>
            <Link href="/sign-up">
              <Button variant="outline">Começar de graça</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Plano PRO */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">PRO — R$20/mês</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <ul className="text-sm text-muted-foreground list-disc ml-4">
              <li>20 treinos novos todo mês</li>
              <li>Marcar treinos como concluídos</li>
              <li>Conteúdo exclusivo</li>
              <li>Suporte prioritário</li>
            </ul>
            <Link href="/upgrade">
              <Button>Assinar plano PRO</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
