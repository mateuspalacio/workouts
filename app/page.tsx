import HomeHero from "@/components/HomeHero";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Benefits from "@/components/Benefits";
import AboutAlexandre from "@/components/AboutAlexandre";
import OurProduct from "@/components/OurProduct";
import TestimonialsSection from "@/components/TestimonialsSection";
import { validateUserSubscription } from "@/lib/checkSubscription";
import { getOrCreateUser } from "@/lib/getOrCreateUser";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const user = await currentUser();
  if (user) {
    
  const clerkId = user.id;
  const email = user.emailAddresses?.[0]?.emailAddress;

  // Ensure user exists
  await getOrCreateUser(clerkId, email);
  await validateUserSubscription(clerkId)
  }


  return (
    <main className="space-y-0">
      {/* HERO */}
      <section className="py-10 bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
        <div className="max-w-3xl px-6 py-2 mx-auto">
          <HomeHero />
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 bg-muted/10 text-foreground">
        <div className="max-w-5xl px-6 mx-auto grid md:grid-cols-2 gap-10 items-center">
          <Image
            src="/alexandre.jpeg"
            width={200}
            height={100}
            alt="Personal Trainer"
            className="rounded-xl shadow-xl object-cover w-full max-h-[400px]"
          />
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Alexandre Melo</h2>
            <p className="text-muted-foreground text-base">
              Personal trainer com quase 30 anos de experiência, referência em Fortaleza. Alexandre já
              ajudou centenas de pessoas a treinarem com consistência e resultado.
            </p>
            <ul className="list-disc pl-5 text-muted-foreground text-sm">
              <li>Treinador recomendado por profissionais da saúde em Fortaleza</li>
              <li>Experiência em academias, CrossFit, reabilitação e alto rendimento</li>
              <li>Treinos práticos, diretos e com execução segura</li>
            </ul>
            <div className="text-center">
            <Link href={'/depoimentos'}>
        <Button variant="secondary" size="lg" className="text-lg mt-2">
          Ver Depoimentos
        </Button>
        </Link></div>
          </div>
        </div>
      </section>

        <div className="mx-auto">
          <OurProduct/>
          </div>
          
      {/* BENEFITS + WHY US */}
      <section className="py-6 bg-background text-foreground">
        <div className="max-w-5xl px-6 mx-auto space-y-24">
          <Benefits />
          {/*<WhyUs />*/}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection/>

      {/* VIDEO PREVIEW */}
      <section className="py-10 bg-background text-foreground">
        <div className="max-w-3xl px-6 mx-auto text-center space-y-6">
          <h2 className="text-2xl font-bold">Como funciona?</h2>
          <p className="text-muted-foreground">
            Cada treino vem com vídeo. Alexandre mostra como fazer com técnica e segurança, não importa o exercício.
          </p>
          {/*<div className="aspect-video rounded overflow-hidden shadow-lg border">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&showinfo=0"
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              title="Demonstração de treino"
            />
          </div>*/}
        </div>
      </section>

      {/* RESULTS */}
      <section className="py-24 bg-background text-foreground">
        <div className="max-w-3xl px-6 mx-auto text-center space-y-6">
          <h2 className="text-2xl font-bold">Treino real. Resultado real.</h2>
          <p className="text-muted-foreground">
            Esse não é um app genérico. Alexandre cria cada treino manualmente, com estrutura mensal e
            foco em evolução progressiva. Cada mês, você recebe um plano novo e atualizado.
          </p>
        </div>
      </section>
      {/*<TestimonialsPeersSection/>*/}
      <section className="py-20 bg-muted/10">
  <div className="max-w-6xl mx-auto px-6 space-y-8 text-center">
    <h2 className="text-2xl font-bold">Veja como é por dentro</h2>
    <p className="text-muted-foreground max-w-2xl mx-auto">
      Interface simples, intuitiva e pensada para o treino. Assista, marque como feito, acompanhe seu progresso.
    </p>

    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
      <div className="rounded-xl overflow-hidden shadow border bg-background">
        <Image src="/painel.png" width={400} height={400} alt="Dashboard preview" className="w-full object-cover" />
      </div>
      <div className="rounded-xl overflow-hidden shadow border bg-background">
        <Image src="/stats.png" width={400} height={400} alt="Estatísticas do treino" className="w-full object-cover" />
      </div>
    </div>
  </div>
</section>

      <AboutAlexandre/>
      {/* FAQ */}
      <section className="py-24 bg-muted/10 text-foreground">
        <div className="max-w-2xl px-6 mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-center">Perguntas frequentes</h2>
          <Card className="bg-muted border border-muted-foreground/10">
            <CardContent className="p-6 space-y-4 text-muted-foreground text-sm">
              <details className="border-b pb-4">
                <summary className="font-medium cursor-pointer">Preciso de equipamentos?</summary>
                <p className="mt-2">
                  A maioria dos treinos são para academia, mas você pode adaptar com halteres e elásticos
                  em casa. Muitos exercícios também podem ser feitos com itens como cadeiras ou banquinhos.
                </p>
              </details>
              <details className="border-b pb-4">
                <summary className="font-medium cursor-pointer">Posso cancelar quando quiser?</summary>
                <p className="mt-2">
                  Sim! O plano PRO é mensal e você pode cancelar a qualquer momento.
                </p>
              </details>
              <details>
                <summary className="font-medium cursor-pointer">O plano gratuito expira?</summary>
                <p className="mt-2">
                  Não. Você pode continuar acessando os 4 treinos gratuitos todo mês, sem pagar nada.
                </p>
              </details>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
