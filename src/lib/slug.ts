function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Leesbare, SEO-vriendelijke URL per auto - de laatste 36 tekens zijn altijd
// de echte database-id, zodat oude kale-UUID links blijven werken.
export function carSlug(car: { merk: string; model: string; jaar: number; id: string }): string {
  return `${slugify(car.merk)}-${slugify(car.model)}-${car.jaar}-${car.id}`
}

export function carIdFromSlug(slug: string): string {
  return slug.slice(-36)
}
