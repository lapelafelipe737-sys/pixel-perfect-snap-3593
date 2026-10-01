import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Heart, Leaf, PackageCheck } from "lucide-react";
import { useState } from "react";

import foodImage from "@/assets/projeto-alimento.jpg";
import educationImage from "@/assets/projeto-educacao.jpg";
import greenImage from "@/assets/projeto-verde.jpg";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/projetos")({
  head: () => ({
    meta: [
      { title: "Projetos sociais — ONG Esperança" },
      {
        name: "description",
        content:
          "Conheça as iniciativas de educação, segurança alimentar e meio ambiente da ONG Esperança.",
      },
      { property: "og:title", content: "Projetos sociais — ONG Esperança" },
      {
        property: "og:description",
        content: "Iniciativas construídas com as comunidades para gerar impacto duradouro.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  {
    id: "educacao",
    title: "Educação que Transforma",
    badge: "Educação",
    icon: BookOpen,
    image: educationImage,
    alt: "Educadora acompanhando adolescentes em atividade de estudos",
    text: "Aulas de reforço, leitura e oficinas criativas no contraturno escolar para crianças e adolescentes.",
    impact: "180 estudantes por semana",
  },
  {
    id: "alimento",
    title: "Mesa Compartilhada",
    badge: "Alimentação",
    icon: PackageCheck,
    image: foodImage,
    alt: "Voluntária entregando cesta de alimentos frescos para uma família",
    text: "Cestas de alimentos frescos, hortas comunitárias e encontros sobre nutrição e aproveitamento integral.",
    impact: "650 famílias atendidas",
  },
  {
    id: "verde",
    title: "Bairro Mais Verde",
    badge: "Meio ambiente",
    icon: Leaf,
    image: greenImage,
    alt: "Jovens voluntários plantando uma árvore em um parque urbano",
    text: "Mutirões de plantio, recuperação de praças e educação ambiental feita com moradores do território.",
    impact: "2.400 mudas plantadas",
  },
];

function ProjectsPage() {
  const [selected, setSelected] = useState<{ title: string; text: string } | null>(null);
  return (
    <main id="conteudo">
      <section className="bg-primary py-20 text-primary-foreground sm:py-28">
        <div className="site-container">
          <p className="eyebrow text-sun">Projetos sociais</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-bold sm:text-6xl">
            A transformação acontece quando fazemos juntos.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/75">
            Cada iniciativa nasce da escuta e cresce com a participação de quem vive a comunidade.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="site-container space-y-16">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <article
                id={project.id}
                key={project.id}
                className="scroll-mt-28 grid overflow-hidden border border-border bg-background shadow-sm lg:grid-cols-12"
              >
                <img
                  src={project.image}
                  width={1200}
                  height={800}
                  loading="lazy"
                  alt={project.alt}
                  className={`h-full min-h-72 w-full object-cover lg:col-span-7 ${index % 2 ? "lg:order-2" : ""}`}
                />
                <div
                  className={`flex flex-col justify-center p-7 sm:p-10 lg:col-span-5 ${index % 2 ? "lg:order-1" : ""}`}
                >
                  <span className="badge">
                    <Icon className="size-3.5" />
                    {project.badge}
                  </span>
                  <h2 className="mt-6 font-display text-3xl font-bold">{project.title}</h2>
                  <p className="mt-4 leading-7 text-muted-foreground">{project.text}</p>
                  <p className="mt-7 border-l-3 border-sun pl-4 text-sm font-bold text-primary">
                    {project.impact}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8 self-start"
                    onClick={() => setSelected(project)}
                  >
                    Saiba como funciona <ArrowRight className="size-4" />
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="doacao" className="scroll-mt-24 bg-secondary py-20">
        <div className="site-container grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Heart className="size-9 text-secondary-foreground" />
            <h2 className="mt-5 font-display text-4xl font-bold text-secondary-foreground sm:text-5xl">
              Sua doação vira oportunidade.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-secondary-foreground/75">
              Com R$ 50, ajudamos a manter materiais educativos e alimentação para uma criança
              durante uma semana.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-4 lg:col-start-9">
            <Button
              size="lg"
              onClick={() =>
                setSelected({
                  ...projects[0],
                  title: "Como doar",
                  text: "Entre em contato pelo e-mail contato@ongesperanca.org.br. Nossa equipe enviará as opções seguras de contribuição e o recibo da doação.",
                })
              }
            >
              Quero fazer uma doação
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/cadastro">Prefiro doar meu tempo</Link>
            </Button>
          </div>
        </div>
      </section>

      <Dialog
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        {selected && (
          <DialogContent className="max-w-lg rounded-none p-7 sm:p-10">
            <span className="badge">Informações</span>
            <DialogTitle className="pr-10 font-display text-3xl font-bold">
              {selected.title}
            </DialogTitle>
            <DialogDescription className="text-base leading-7">{selected.text}</DialogDescription>
            <p className="text-sm font-semibold">
              Quer participar? Nosso cadastro leva menos de três minutos.
            </p>
            <Button asChild className="mt-3 w-fit">
              <Link to="/cadastro">
                Quero participar <ArrowRight className="size-4" />
              </Link>
            </Button>
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}
