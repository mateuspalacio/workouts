// app/testemunhos/page.tsx
import { Metadata } from "next"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Testemunhos | Treinos",
  description: "Histórias reais de superação com treinos do Alexandre.",
}

const testimonials = [
  {
    name: "Professor Eduardo",
    image: "/eduardo.jpeg",
    text: `
      Eu quero expressar minha gratidão ao Professor Alexandre Melo, por ter tido a oportunidade de trabalhar ao seu lado no Centro de Treinamento Alexandre Melo (CTAM). Esses anos foram incrivelmente enriquecedores, não apenas profissionalmente, mas também pessoalmente.

Sob a orientação do Professor Alexandre, eu tive a chance de aprender e crescer de forma exponencial. O conhecimento e a experiência que adquiri foram fundamentais para o meu desenvolvimento como profissional, mas também como pessoa. A paixão e o comprometimento do Professor Alexandre com o exercício físico e a saúde são inspiradores, e eu tive a sorte de poder compartilhar dessa visão.

Durante meu tempo na CTAM, tivemos a oportunidade de impactar positivamente a vida de muitas pessoas. Vimos alunos alcançarem metas, superarem desafios e melhorarem sua saúde e bem-estar. Foi incrível ver o impacto que o exercício físico pode ter na vida das pessoas, e eu me sinto afortunado por ter feito parte disso.

A bagagem de conhecimento que adquiri durante esse período é algo que jamais pensei que poderia carregar comigo. O Professor Alexandre me ensinou não apenas sobre treinamento físico, mas também sobre a importância da disciplina, do trabalho duro e da dedicação. Essas lições vão comigo para sempre, e eu estou grato por ter tido a oportunidade de aprender com alguém tão excepcional.

Eu quero agradecer ao Professor Alexandre por ter acreditado em mim, por ter me dado a oportunidade de crescer e por ter me ensinado tanto. Eu sou uma pessoa melhor graças a ele, e eu sei que vou levar esses ensinamentos comigo para o resto da minha vida.
    `
  },
  {
    name: "Miguel Dante",
    image: "/miguel_dante.jpeg",
    text: `
      Quero deixar aqui minha admiração pelo Alexandre Melo, um profissional que representa o que há de melhor na nossa área. Ele não só vive a prática dos exercícios no dia a dia, com um vigor físico que inspira qualquer um, mas também é um estudioso incansável e apaixonado pelo que faz. Ver o lançamento da sua plataforma online é motivo de orgulho — sei que tudo ali foi feito com dedicação, conhecimento e muito compromisso com a saúde e o resultado das pessoas. Sucesso, professor Alexandre!
    `
  },
  {
    name: "Milena",
    image: "/milena.jpeg",
    text: `
      Tive o privilégio de ser aluna do Alexandre Melo e, hoje, como professora de educação física também, posso afirmar o quanto ele foi essencial na minha trajetória. Sua postura sempre foi extremamente profissional, atenciosa e inspiradora. Desde o início, ficou claro o quanto ele domina o que faz — tanto na prática quanto na teoria.

Com anos de experiência no nicho, Alexandre se destaca não só pela competência técnica, mas também pela forma generosa com que compartilha conhecimento. Tive a oportunidade de fazer alguns cursos com ele, que foram fundamentais para minha formação. Sua didática, clareza nas explicações e compromisso com o desenvolvimento de cada aluno fazem toda a diferença.

Os resultados que alcancei, tanto fisicamente quanto na minha carreira, têm muito da influência e do suporte dele. Sou imensamente grata por ter aprendido com um profissional tão completo e apaixonado pelo que faz. Recomendo o trabalho do Alexandre com total confiança a quem busca evolução real, com qualidade e responsabilidade.
    `
  },
  {
    name: "Bruna",
    image: "/bruna.jpeg",
    text: `
      Treinar com você vai muito além do exercício físico — é um privilégio e uma honra. Pai, você é um exemplo de profissionalismo, dedicação e cuidado. Mesmo sendo meu pai, nunca deixou de agir com a seriedade e o comprometimento de um verdadeiro personal.

A cada treino, vejo o quanto você se preocupa em me ensinar, em me motivar e em me fazer evoluir. Seu olhar atento, sua paciência e seu conhecimento me inspiram tanto como aluna quanto como filha.

Obrigada por acreditar em mim, por me puxar quando preciso e por sempre estar ao meu lado, dentro e fora da academia. Você é, sem dúvidas, um dos melhores profissionais que conheço — e o melhor pai do mundo.
    `
  },
  {
    name: "Victor",
    image: "/victor.jpeg",
    text: `
      Minha trajetória de treinos foi bem desafiadora, pois trabalhava muito e nem sempre tinha motivação para os treinos. 
Alexandre montava os treinos sempre pensando em performance e tempo disposto para a prática. 
Graças a ele, não precisava me matar de treinar, mas nos horários de treino era puxado e o mesmo sempre me motivando a dar meu melhor. Com isso, quero agradecer por todo ensinamento, motivação e acompanhamento que me trouxe muitas vitórias em minha modalidade.
    `
  }
  // Add more...
];

export default function TestimonialsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Histórias de transformação</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Veja como treinos do Alexandre impactaram a vida de alunos reais.
        </p>
      </div>

      {testimonials.map((t, i) => (
        <Card key={i} className="overflow-hidden shadow-md">
          <div className="w-full flex justify-center items-center">
  <div className="relative w-40 h-64 rounded overflow-hidden">
    <Image
      src={t.image}
      alt={t.name}
      fill
      className="object-contain"
    />
  </div>
</div>

          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">{t.name}</h3>
            {t.text
              .trim()
              .split("\n")
              .map((p, idx) => (
                <p key={idx} className="text-muted-foreground leading-relaxed">
                  {p.trim()}
                </p>
              ))}
          </div>
        </Card>
      ))}
    </main>
  )
}
