import HomeHero from "@/components/HomeHero";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Benefits from "@/components/Benefits";
import AboutAlexandre from "@/components/AboutAlexandre";
import OurProduct from "@/components/OurProduct";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function HomePage() {
  return (
    <main className="space-y-0">
      {/* HERO */}
      <section className="py-10 bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
        <div className="max-w-3xl px-6 py-2 mx-auto">
          <HomeHero />
        </div>
      </section>

        <div className="py-2 mx-auto">
          <OurProduct/>
          </div>
      {/* VIDEO PREVIEW */}
      <section className="py-10 bg-background text-foreground">
        <div className="max-w-3xl px-6 mx-auto text-center space-y-6">
          <h2 className="text-2xl font-bold">Veja como funciona</h2>
          <p className="text-muted-foreground">
            Cada treino vem com vídeo. Alexandre mostra como fazer com técnica e segurança, não importa o exercício.
          </p>
          <div className="aspect-video rounded overflow-hidden shadow-lg border">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&showinfo=0"
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              title="Demonstração de treino"
            />
          </div>
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
          </div>
        </div>
      </section>

      {/* BENEFITS + WHY US */}
      <section className="py-24 bg-background text-foreground">
        <div className="max-w-5xl px-6 mx-auto space-y-24">
          <Benefits />
          {/*<WhyUs />*/}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection/>

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
