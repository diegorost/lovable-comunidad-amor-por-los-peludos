import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import luna from "@/assets/golden-luna.jpg";
import nube from "@/assets/dog-nube.jpg";
import bruno from "@/assets/dog-bruno.jpg";

const dogs = [
  { name: "Luna", breed: "Golden Retriever", age: "4 años", personality: "Dulce, sociable y fan del agua", image: luna, owner: "Ana" },
  { name: "Nube", breed: "Mestizo", age: "2 años", personality: "Curioso, pequeño y muy valiente", image: nube, owner: "Leo" },
  { name: "Bruno", breed: "Labrador", age: "3 años", personality: "Energía infinita y corazón enorme", image: bruno, owner: "Marta" },
];

export const Route = createFileRoute("/dogs")({
  head: () => ({ meta: [{ title: "Directorio de perros — Patitas Club" }, { name: "description", content: "Explora los perros de nuestra comunidad y conoce nuevos compañeros de paseo." }, { property: "og:title", content: "Explora nuestra comunidad — Patitas Club" }, { property: "og:description", content: "Conoce perros de todas las razas y personalidades." }] }),
  component: DogsPage,
});

function DogsPage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => dogs.filter((dog) => `${dog.name} ${dog.breed} ${dog.personality}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <div className="mx-auto min-h-[70vh] max-w-7xl px-5 py-14 lg:px-8"><div className="max-w-2xl"><p className="font-bold text-primary">NUESTRA PANDILLA</p><h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Explora nuestra comunidad</h1><p className="mt-4 text-lg text-muted-foreground">Cada perro tiene una historia. Busca por nombre, raza o personalidad y encuentra un nuevo amigo de paseo.</p></div>
    <div className="mt-10 flex flex-col gap-3 sm:flex-row"><label className="relative flex-1"><span className="sr-only">Buscar perros</span><Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"/><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca por nombre, raza o personalidad…" className="h-14 rounded-full bg-card pl-12 shadow-sm"/></label><Button variant="outline" size="lg" className="h-14 rounded-full"><SlidersHorizontal/> Todos los perros</Button></div>
    {results.length ? <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{results.map((dog) => <article key={dog.name} className="overflow-hidden rounded-3xl bg-card shadow-sm"><img src={dog.image} alt={`${dog.name}, ${dog.breed}`} loading="lazy" width={896} height={1024} className="aspect-[4/3] w-full object-cover"/><div className="p-6"><div className="flex items-start justify-between gap-3"><div><h2 className="text-2xl font-bold">{dog.name}</h2><p className="font-semibold text-primary">{dog.breed} · {dog.age}</p></div><span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold">{dog.owner}</span></div><p className="mt-4 text-muted-foreground">{dog.personality}</p></div></article>)}</div> : <div className="mt-12 rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center"><p className="text-5xl" aria-hidden="true">🐾</p><h2 className="mt-4 text-2xl font-bold">Todavía no encontramos esa patita</h2><p className="mt-2 text-muted-foreground">Prueba otra búsqueda o presenta a tu mejor amigo.</p><Button asChild variant="warm" className="mt-6"><Link to="/add-dog">Añadir perro</Link></Button></div>}
  </div>;
}