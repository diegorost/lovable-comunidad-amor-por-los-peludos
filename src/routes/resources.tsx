import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, MapPin, Phone } from "lucide-react";

const categories = [
  { icon: "🛍️", title: "Tiendas Recomendadas", color: "bg-secondary", items: [{ name: "La Despensa Canina", description: "Alimentación natural, juguetes resistentes y asesoría cercana.", address: "Calle del Parque, 18", phone: "+34 910 123 456" }] },
  { icon: "🚑", title: "Clínicas de Emergencia", color: "bg-sky", items: [{ name: "Clínica Vet 24h", description: "Urgencias veterinarias todos los días, con atención telefónica previa.", address: "Avenida Central, 42", phone: "+34 900 222 333" }] },
  { icon: "🩺", title: "Veterinarios y Especialidades", color: "bg-accent/30", items: [{ name: "Centro Veterinario Huellas", description: "Medicina general, dermatología, fisioterapia y cuidado preventivo.", address: "Plaza del Sol, 7", phone: "+34 910 987 654" }] },
];

export const Route = createFileRoute("/resources")({
  head: () => ({ meta: [{ title: "Recursos para perros — Patitas Club" }, { name: "description", content: "Encuentra tiendas, clínicas de emergencia y veterinarios recomendados para tu perro." }, { property: "og:title", content: "Recursos de confianza — Patitas Club" }, { property: "og:description", content: "Ayuda local para cuidar a tu mejor amigo." }] }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8"><div className="max-w-2xl"><p className="font-bold text-accent">CUIDADO CERCA DE TI</p><h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Encuentra ayuda cuando la necesites</h1><p className="mt-4 text-lg text-muted-foreground">Lugares recomendados para acompañarte en los días normales y en los que requieren un poco más de cuidado.</p></div><div className="mt-12 space-y-12">{categories.map((category) => <section key={category.title}><div className="mb-5 flex items-center gap-3"><span className={`grid size-12 place-items-center rounded-2xl text-2xl ${category.color}`}>{category.icon}</span><h2 className="text-2xl font-bold">{category.title}</h2></div><div className="grid gap-5 md:grid-cols-2">{category.items.map((item) => <article key={item.name} className="rounded-3xl border border-border bg-card p-6 shadow-sm"><h3 className="text-xl font-bold">{item.name}</h3><p className="mt-2 leading-7 text-muted-foreground">{item.description}</p><div className="mt-5 space-y-2 text-sm font-semibold"><p className="flex items-center gap-2"><MapPin className="size-4 text-primary"/>{item.address}</p><a href={`tel:${item.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-primary"><Phone className="size-4 text-primary"/>{item.phone}</a><span className="flex items-center gap-2 text-muted-foreground"><ExternalLink className="size-4"/> Web próximamente</span></div></article>)}</div></section>)}</div></div>;
}