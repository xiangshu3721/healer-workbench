/** Prefix public asset paths with Vite base (needed for GitHub Pages). */
export function asset(path: string): string {
  const clean = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${clean}`
}
