import type { ProjectRow } from '#shared/types/project'
import type { Plate } from '~/data/site'

/*
 * The database only stores content. Layout comes from these presets, cycled by position,
 * so project 4 gets preset 1 again, project 5 preset 2, and so on: any number of projects
 * keeps the page's left/right rhythm without anyone choosing grid columns by hand.
 */
const layouts = [
  {
    numeralSide: 'right',
    cross: { left: '36%', bottom: '14%' },
    columns: { media: '1 / span 4', text: '6 / span 6' },
    textOffset: 'clamp(16px, 5vw, 70px)',
    ratio: 'photo',
  },
  {
    numeralSide: 'left',
    cross: { right: '14%', top: '8%' },
    columns: { media: '7 / span 6', text: '1 / span 5' },
    textOffset: 'clamp(20px, 6vw, 96px)',
    ratio: 'wide',
  },
  {
    numeralSide: 'right',
    cross: { left: '44%', top: '5%' },
    columns: { media: '1 / span 5', text: '7 / span 5' },
    textOffset: 'clamp(16px, 5vw, 74px)',
    ratio: 'photo',
  },
] as const

export function projectToPlate(row: ProjectRow, index: number): Plate {
  const layout = layouts[index % layouts.length]!
  const numeral = String(index + 1).padStart(2, '0')

  return {
    numeral,
    numeralSide: layout.numeralSide,
    cross: { label: `${numeral} / ${row.title_top}`, position: { ...layout.cross } },
    kicker: row.kicker ? `Project ${numeral} — ${row.kicker}` : `Project ${numeral}`,
    title: [
      { text: row.title_top, style: row.title_top_style },
      { text: row.title_bottom, style: row.title_bottom_style },
    ],
    body: row.body,
    chips: row.tools.map(label => ({ label })),
    media: row.image_url
      ? { kind: 'image', src: row.image_url, alt: row.image_alt ?? '' }
      : { kind: 'placeholder', ratio: layout.ratio },
    caption: `Fig. ${numeral} — ${row.caption ?? row.title_top}`,
    columns: { ...layout.columns },
    textOffset: layout.textOffset,
  }
}
