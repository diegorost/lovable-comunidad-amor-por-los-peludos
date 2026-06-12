import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://id-preview--54ad113e-3265-4e39-8715-a2b7ee1d47bb.lovable.app";
export const Route = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => { const paths = ["/", "/dogs", "/add-dog", "/resources", "/auth"]; const urls = paths.map((path) => `  <url>\n    <loc>${BASE_URL}${path}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`); return new Response([`<?xml version="1.0" encoding="UTF-8"?>`, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`, ...urls, `</urlset>`].join("\n"), { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } }); } } } });