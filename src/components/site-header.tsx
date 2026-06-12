import { Link } from "@tanstack/react-router";
import { Menu, PawPrint } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const links = [
  { to: "/dogs" as const, label: "Perros" },
  { to: "/resources" as const, label: "Recursos" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground" aria-label="Patitas Club, inicio">
          <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground"><PawPrint className="size-5" /></span>
          Patitas Club
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {links.map((link) => <Link key={link.to} to={link.to} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>{link.label}</Link>)}
          <Button asChild variant="warm"><Link to="/add-dog">Añadir perro</Link></Button>
          <Button asChild variant="ghost"><Link to="/auth">Mi cuenta</Link></Button>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Abrir menú" aria-expanded={open}><Menu /></Button>
      </div>
      {open && <nav className="grid gap-2 border-t border-border bg-background p-5 md:hidden" aria-label="Navegación móvil">
        {links.map((link) => <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-semibold hover:bg-muted">{link.label}</Link>)}
        <Link to="/add-dog" onClick={() => setOpen(false)} className="rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground">Añadir perro</Link>
        <Link to="/auth" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-semibold hover:bg-muted">Mi cuenta</Link>
      </nav>}
    </header>
  );
}

export function SiteFooter() {
  return <footer className="border-t border-border bg-secondary/40"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8"><span className="flex items-center gap-2 font-bold text-foreground"><PawPrint className="size-4 text-primary" /> Patitas Club</span><p>Una comunidad hecha con cariño para perros y sus personas.</p></div></footer>;
}