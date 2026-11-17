import type { ProjectRow } from '#shared/types/project'
import type { Plate } from '~/data/site'

/*
 * The database only stores content. Layout comes from these presets, cycled by position,
 * so project 4 gets preset 1 again, project 5 preset 2, and so on: any number of projects
 * keeps the page's left/right rhythm without anyone choosing grid columns by hand.
 *
 * Everything is in grid cells: the ratio's width matches the media's column span, so the
 * image is exactly that many cells wide and the ratio's height many cells tall.
 */
const layouts = [
  {
    numeralSide: 'right',
    cross: { x: 5, y: 1 },
    columns: { media: '1 / span 4', text: '6 / span 6' },
    ratio: '4 / 5',
    textOffset: 1,
  },
  {
    numeralSide: 'left',
    cross: { x: 5, y: 1 },
    columns: { media: '7 / span 6', text: '1 / span 5' },
    ratio: '6 / 4',
    textOffset: 2,
  },
  {
    numeralSide: 'right',
    cross: { x: 6, y: 1 },
    columns: { media: '1 / span 5', text: '7 / span 5' },
    ratio: '5 / 4',
    textOffset: 1,
  },
] as const

export function projectToPlate(row: ProjectRow, index: number): Plate {
  const layout = layouts[index % layouts.length]!
  const numeral = String(index + 1).padStart(2, '0')

  return {
    numeral,
    numeralSide: layout.numeralSide,
    cross: { label: `${numeral} / ${row.title_top}`, ...layout.cross },
    kicker: row.kicker ? `Project ${numeral} — ${row.kicker}` : `Project ${numeral}`,
    title: [
      { text: row.title_top, style: row.title_top_style },
      { text: row.title_bottom, style: row.title_bottom_style },
    ],
    body: row.body,
    chips: row.tools.map(label => ({ label })),
    media: row.image_url
      ? { kind: 'image', src: row.image_url, alt: row.image_alt ?? '' }
      : { kind: 'placeholder' },
    ratio: layout.ratio,
    caption: `Fig. ${numeral} — ${row.caption ?? row.title_top}`,
    columns: { ...layout.columns },
    textOffset: layout.textOffset,
  }
}
