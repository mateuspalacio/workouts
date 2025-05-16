import Image from "next/image";

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/10 text-foreground">
      <div className="max-w-5xl px-6 mx-auto text-center space-y-10">
        <h2 className="text-2xl font-bold">O que dizem nossos alunos</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[
            {
              name: "Beatriz",
              text: "Simplesmente os melhores treinos que já fiz! Treinos diversificados, fáceis de seguir e eficazes numa rotina pesada.",
              image: "/bia.jpeg",
            },
            {
              name: "Daniel",
              text: "Voltei a treinar depois de anos parado. Com Alexandre foi o único que realmente vi resultados.",
              image: "/daniel.jpeg",
            },
            {
              name: "Teixeira",
              text: "Sendo de idade avançada, sinto que meus treinos com o Alexandre me deixam cada dia me sentindo melhor.",
              image: "/pr.jpeg",
            },
            {
              name: "Priscila e Frota",
              text: "Treinamos há anos com o Alexandre, e não há nenhum outro personal como ele.",
              image: "/priscilafrota.jpeg",
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="bg-white text-slate-900 border border-muted/20 rounded-xl p-6 shadow-sm flex flex-col items-center text-center h-full"
            >
              <div className="w-28 h-28 mb-4 relative">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="rounded-full object-cover shadow-md"
                />
              </div>
              <p className="text-sm font-medium leading-relaxed mb-2">&quot;{t.text}&quot;</p>
              <p className="text-xs text-muted-foreground">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
