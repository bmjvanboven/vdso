export type DescriptionBlock = { type: 'p'; text: string } | { type: 'ul' | 'ol'; items: string[] }

function stripMarker(line: string): { text: string; ordered: boolean; marked: boolean } {
  const bulletMatch = line.match(/^[-•*]\s+(.*)/)
  if (bulletMatch) return { text: bulletMatch[1], ordered: false, marked: true }
  const orderedMatch = line.match(/^\d+[.)]\s+(.*)/)
  if (orderedMatch) return { text: orderedMatch[1], ordered: true, marked: true }
  return { text: line, ordered: false, marked: false }
}

// Zet platte, geplakte tekst (bijv. vanuit ChatGPT) om naar alinea's + lijsten.
// Herkent expliciete markers ("- " / "• " / "1. ") én impliciete lijsten: bij het
// kopiëren van een gerenderde lijst uit een chat-UI blijven de markers vaak weg,
// maar staan de items nog wel los onder elkaar — 2+ opeenvolgende regels zonder
// witregel ertussen worden daarom ook als lijst behandeld.
export function parseDescription(text: string): DescriptionBlock[] {
  const groups = text
    .split(/\r?\n\s*\r?\n/)
    .map(group => group.split(/\r?\n/).map(l => l.trim()).filter(Boolean))
    .filter(group => group.length > 0)

  return groups.map((group): DescriptionBlock => {
    const stripped = group.map(stripMarker)
    if (group.length === 1 && !stripped[0].marked) {
      return { type: 'p', text: stripped[0].text }
    }
    const ordered = stripped.some(s => s.ordered)
    return { type: ordered ? 'ol' : 'ul', items: stripped.map(s => s.text) }
  })
}
