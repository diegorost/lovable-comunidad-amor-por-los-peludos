import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import luna from "@/assets/golden-luna.jpg";
import nube from "@/assets/dog-nube.jpg";
import bruno from "@/assets/dog-bruno.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Patitas Club — Perros y recursos de confianza" },
      { name: "description", content: "Presenta a tu perro, descubre nuevos amigos y encuentra recursos locales recomendados por la comunidad." },
      { property: "og:title", content: "Patitas Club — Nuestra comunidad perruna" },
      { property: "og:description", content: "Perros felices, personas conectadas y ayuda de confianza cerca de ti." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="overflow-hidden px-5 py-12 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div className="gentle-rise max-w-2xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground"><Sparkles className="size-4" /> Tu comunidad perruna local</span>
            <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">Más paseos.<br/><span className="text-primary">Más amigos.</span><br/>Más patitas.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">Un lugar alegre para conocer a los perros del barrio, compartir a tu mejor amigo y encontrar ayuda de confianza cuando la necesites.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="warm" size="lg"><Link to="/dogs">Explora nuestra comunidad <ArrowRight /></Link></Button><Button asChild variant="outline" size="lg" className="rounded-full"><Link to="/add-dog">Presenta a tu mejor amigo</Link></Button></div>
            <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold text-muted-foreground"><span className="flex items-center gap-2"><Heart className="size-4 text-primary" /> Todas las razas</span><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-accent" /> Perfiles moderados</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-8 top-14 size-40 rounded-full bg-sky/65 blur-2xl" />
            <div className="absolute -right-6 bottom-6 size-48 rounded-full bg-primary/25 blur-2xl" />
            <img src={luna} alt="Golden Retriever feliz en un parque al atardecer" width={896} height={1024} className="relative aspect-[7/8] w-full rotate-2 rounded-[2.5rem] object-cover shadow-warm" />
            <div className="absolute -bottom-5 left-3 rounded-2xl bg-card p-4 shadow-warm sm:left-[-2rem]"><p className="font-display text-lg font-bold">Luna, 4 años</p><p className="text-sm text-muted-foreground">Experta en encontrar palos ✨</p></div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/45 px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl"><div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 font-bold text-primary">NUEVOS AMIGOS</p><h2 className="text-3xl font-extrabold sm:text-4xl">Conoce a la pandilla</h2></div><Link to="/dogs" className="flex items-center gap-2 font-bold text-foreground hover:text-primary">Ver todos los perros <ArrowRight className="size-4" /></Link></div>
          <div className="grid gap-6 md:grid-cols-3">{[
            { image: luna, name: "Luna", breed: "Golden Retriever", line: "Dulce, sociable y fan del agua" },
            { image: nube, name: "Nube", breed: "Mestizo", line: "Curioso, pequeño y muy valiente" },
            { image: bruno, name: "Bruno", breed: "Labrador", line: "Energía infinita y corazón enorme" },
          ].map((dog) => <article key={dog.name} className="group overflow-hidden rounded-3xl bg-card shadow-sm transition-transform hover:-translate-y-1"><img src={dog.image} alt={`${dog.name}, ${dog.breed}`} loading="lazy" width={896} height={1024} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"/><div className="p-5"><div className="flex items-center justify-between"><h3 className="text-2xl font-bold">{dog.name}</h3><span className="rounded-full bg-sky px-3 py-1 text-xs font-bold text-sky-foreground">{dog.breed}</span></div><p className="mt-2 text-muted-foreground">{dog.line}</p></div></article>)}</div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="mb-2 font-bold text-accent">CERCA DE TI</p><h2 className="text-4xl font-extrabold">Encuentra ayuda cuando la necesites</h2><p className="mt-4 text-lg text-muted-foreground">Recomendaciones claras para cuidarles bien, desde su snack favorito hasta una urgencia de madrugada.</p><Button asChild variant="sage" size="lg" className="mt-7"><Link to="/resources">Ver recursos locales <MapPin /></Link></Button></div><div className="grid gap-4 sm:grid-cols-3">{[{icon:"🛍️",title:"Tiendas Recomendadas",text:"Productos elegidos con cariño"},{icon:"🚑",title:"Clínicas de Emergencia",text:"Ayuda disponible cuando importa"},{icon:"🩺",title:"Veterinarios y Especialidades",text:"Profesionales de confianza"}].map((item)=><article key={item.title} className="rounded-3xl border border-border bg-card p-6 shadow-sm"><span className="text-4xl" aria-hidden="true">{item.icon}</span><h3 className="mt-5 text-xl font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p></article>)}</div></div></section>
    </>
  );
}
