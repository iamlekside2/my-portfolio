/**
 * Screenshots of the live sites, keyed by project slug.
 *
 * Vite inlines this glob at build time, so adding `src/assets/projects/<slug>.webp`
 * is all it takes for a project to pick up its tile image.
 */
const shots = import.meta.glob('../assets/projects/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export const projectImage = (slug: string): string | undefined =>
  shots[`../assets/projects/${slug}.webp`];
