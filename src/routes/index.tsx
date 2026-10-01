import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Eye, Heart, Leaf, Sparkles, Target, Users } from "lucide-react";

import heroImage from "@/assets/ong-hero.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ONG Esperança — Cuidar transforma" },
      {
        name: "description",
        content:
          "Conheça a ONG Esperança e ajude a transformar comunidades por meio da educação, alimentação e cuidado ambiental.",
      },
      { property: "og:title", content: "ONG Esperança — Cuidar transforma" },
      {
        property: "og:description",
        content: "Pessoas unidas criando oportunidades e futuros possíveis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main id="conteudo">
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-primary text-primary-foreground">
        <img
          src={heroImage}
          width={1600}
          height={1008}
          alt="Crianças e voluntários cultivando uma horta comunitária"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-hero-veil" />
        <div className="site-container flex min-h-[calc(100svh-4.5rem)] items-end pb-16 pt-24 sm:items-center sm:pb-24">
          <div className="max-w-3xl">
            <p className="eyebrow text-sun">Há 14 anos construindo futuros</p>
            <h1 className="mt-5 max-w-2xl font-display text-5xl leading-[1.02] font-bold sm:text-6xl lg:text-7xl">
              Cuidar transforma.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-primary-foreground/85 sm:text-xl">
              Conectamos pessoas, oportunidades e afeto para que cada comunidade possa florescer com
              autonomia.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="secondary" size="lg">
                <Link to="/cadastro">
                  Quero ser voluntário <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="light" size="lg">
                <Link to="/projetos">Conheça os projetos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-bright py-16 sm:py-20" aria-label="Impacto da ONG Esperança">
        <div className="site-container grid gap-8 sm:grid-cols-3">
          {[
            ["4.800+", "pessoas impactadas"],
            ["320", "voluntários ativos"],
            ["18", "comunidades parceiras"],
          ].map(([number, label]) => (
            <div key={label} className="border-l-4 border-sun pl-5">
              <strong className="block font-display text-4xl text-primary">{number}</strong>
              <span className="text-sm font-semibold text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="site-container grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow text-accent">Quem somos</p>
            <h2 className="section-title mt-4">Esperança é verbo. É algo que a gente faz.</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-muted-foreground lg:col-span-6 lg:col-start-7">
            <p>
              Nascemos do encontro entre moradores e educadores que acreditavam no poder de uma
              comunidade mobilizada. Hoje, atuamos onde educação, segurança alimentar e meio
              ambiente se encontram.
            </p>
            <p>
              Não levamos respostas prontas. Escutamos, construímos junto e fortalecemos soluções
              que já vivem em cada território.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 sm:py-24">
        <div className="site-container">
          <p className="eyebrow text-accent">O que nos guia</p>
          <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Missão",
                text: "Fortalecer comunidades por meio de educação, cuidado e participação cidadã.",
              },
              {
                icon: Eye,
                title: "Visão",
                text: "Um Brasil em que toda pessoa tenha oportunidade de construir seu próprio futuro.",
              },
              {
                icon: Heart,
                title: "Valores",
                text: "Escuta, respeito, transparência, diversidade e transformação coletiva.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="bg-background p-8 sm:p-10">
                <Icon className="size-8 text-accent" aria-hidden="true" />
                <h3 className="mt-8 font-display text-2xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="site-container">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <p className="eyebrow text-accent">Frentes de atuação</p>
              <h2 className="section-title mt-4">Mudança que começa perto</h2>
            </div>
            <Link
              to="/projetos"
              className="inline-flex items-center gap-2 font-bold text-primary hover:text-accent"
            >
              Ver todos os projetos <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Educação",
                text: "Reforço escolar, leitura e acesso à cultura.",
              },
              {
                icon: Sparkles,
                title: "Alimentação",
                text: "Comida de qualidade e redes de apoio local.",
              },
              {
                icon: Leaf,
                title: "Meio ambiente",
                text: "Territórios verdes, cuidados por quem vive neles.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="project-summary">
                <Icon className="size-7 text-accent" aria-hidden="true" />
                <h3 className="mt-8 font-display text-2xl font-bold">{title}</h3>
                <p className="mt-3 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 sm:py-20">
        <div className="site-container grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <Users className="size-8 text-secondary-foreground" />
            <h2 className="mt-5 font-display text-3xl font-bold text-secondary-foreground sm:text-4xl">
              Toda transformação começa com alguém.
            </h2>
            <p className="mt-3 text-secondary-foreground/75">
              Doe seu tempo, seu talento ou recursos. Há um lugar para você aqui.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/cadastro">
              Encontrar meu lugar <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
