import Image from "next/image";

export default function TestimonialsPeersSection() {
  return (
    <section className="py-24 bg-muted/10 text-foreground">
      <div className="max-w-5xl px-6 mx-auto text-center space-y-10">
        <h2 className="text-2xl font-bold">O que dizem outros profissionais que trabalharam com Alexandre</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[
            {
              name: "Goni Personal",
              text: "Tive formação e mentoria com o Alexandre e considero uma de minhas grandes experiências.",
              image: "/depoimento1.jpeg",
            },
            {
              name: "Daniel",
              text: "Voltei a treinar depois de anos parado. Agora faço todo mês e adoro.",
              image: "/daniel.jpeg",
            },
            {
              name: "Teixeira",
              text: "Os vídeos são super didáticos. Me sinto mais segura treinando sozinha.",
              image: "/pr.jpeg",
            },
            {
              name: "Priscila e Frota",
              text: "Os vídeos são super didáticos. Me sinto mais segura treinando sozinha.",
              image: "/priscilafrota.jpeg",
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="bg-white text-slate-900 border border-muted/20 rounded-xl p-6 shadow-sm flex flex-col items-center text-center h-full"
            >
              <Image
                src={t.image}
                alt={t.name}
                width={200}
                height={200}
                className="rounded-full object-cover mb-4 shadow-md"
              />
              <p className="text-sm font-medium leading-relaxed mb-4">&quot;{t.text}&quot;</p>
              <p className="text-xs text-muted-foreground">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
