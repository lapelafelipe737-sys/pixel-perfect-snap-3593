import { Link } from "@tanstack/react-router";
import { HeartHandshake, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="site-container grid h-18 grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <Link to="/" aria-label="ONG Esperança — página inicial" className="flex min-w-0 items-center gap-3" onClick={close}>
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <HeartHandshake className="size-5" aria-hidden="true" />
          </span>
          <span className="truncate font-display text-xl font-bold text-primary">ONG Esperança</span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-1 md:flex">
          <Link to="/" activeOptions={{ exact: true }} className="nav-link">Início</Link>
          <Link to="/projetos" className="nav-link">Projetos</Link>
          <Link to="/cadastro" className="nav-link">Voluntariado</Link>
          <Button asChild size="sm" className="ml-2"><Link to="/projetos" hash="doacao">Quero ajudar</Link></Button>
        </nav>

        <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>

      {open && (
        <nav aria-label="Navegação móvel" className="border-t border-border bg-background px-5 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            <Link to="/" activeOptions={{ exact: true }} className="mobile-nav-link" onClick={close}>Início</Link>
            <Link to="/projetos" className="mobile-nav-link" onClick={close}>Projetos</Link>
            <Link to="/cadastro" className="mobile-nav-link" onClick={close}>Seja voluntário</Link>
            <Button asChild className="mt-2"><Link to="/projetos" hash="doacao" onClick={close}>Quero ajudar</Link></Button>
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="site-container grid gap-10 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 font-display text-xl font-bold"><HeartHandshake className="size-7" /> ONG Esperança</div>
          <p className="mt-4 max-w-md text-sm leading-6 text-primary-foreground/75">Desde 2012, somamos pessoas e oportunidades para fortalecer comunidades e criar futuros possíveis.</p>
        </div>
        <div className="md:col-span-3">
          <h2 className="text-sm font-bold uppercase tracking-widest">Navegue</h2>
          <div className="mt-4 flex flex-col gap-2 text-sm text-primary-foreground/75">
            <Link to="/">Início</Link><Link to="/projetos">Projetos</Link><Link to="/cadastro">Voluntariado</Link>
          </div>
        </div>
        <address className="not-italic md:col-span-4">
          <h2 className="text-sm font-bold uppercase tracking-widest">Fale com a gente</h2>
          <div className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            <p className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0" /> Rua da Esperança, 120 — São Paulo, SP</p>
            <p className="flex gap-2"><Phone className="size-4 shrink-0" /> (11) 3020-2026</p>
            <p className="flex gap-2"><Mail className="size-4 shrink-0" /> contato@ongesperanca.org.br</p>
          </div>
        </address>
      </div>
      <div className="border-t border-primary-foreground/15 py-5 text-center text-xs text-primary-foreground/60">© 2026 ONG Esperança. Cuidar transforma.</div>
    </footer>
  );
}