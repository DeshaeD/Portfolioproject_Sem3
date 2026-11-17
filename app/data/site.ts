// Static page content. Projects come from the database (see app/utils/plates.ts).
import type { TitleStyle } from '#shared/types/project'

export type { TitleStyle }

export interface TitleLine {
  text: string
  style: TitleStyle
}

export type PlateMedia =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'placeholder'; ratio: 'square' | 'wide' | 'photo' }

export interface Plate {
  id?: string
  numeral: string
  numeralSide: 'left' | 'right'
  /** Small blueprint annotation; position is any CSS left/right/top/bottom combo. */
  cross: { label: string; position: Record<string, string> }
  kicker?: string
  title: [TitleLine, TitleLine]
  body: string
  chips: { label: string; highlight?: boolean }[]
  media: PlateMedia
  caption: string
  /** Grid column spans for the media and text blocks on desktop. */
  columns: { media: string; text: string }
  /** Push the text block down so it overlaps the image area unevenly. */
  textOffset: string
}

export const about: Plate = {
  id: 'about',
  numeral: '00',
  numeralSide: 'left',
  cross: { label: 'X 480 / Y 092', position: { left: '53%', top: '7%' } },
  title: [
    { text: 'Who', style: 'outline' },
    { text: 'Builds this', style: 'solid' },
  ],
  body: 'I build interfaces that behave the way people expect them to and look like nothing else on the page. ICT student at Fontys, working mostly in React and React Native, usually somewhere between the design file and the build.',
  chips: [
    { label: 'Available for internship', highlight: true },
    { label: 'Eindhoven, NL' },
  ],
  media: { kind: 'placeholder', ratio: 'square' },
  caption: 'Fig. 00 — Workspace',
  columns: { media: '1 / span 6', text: '8 / span 5' },
  textOffset: 'clamp(20px, 6vw, 90px)',
}

export const strips = {
  roles: ['Frontend developer', 'Interface builder', 'React native'],
  motto: ['Manifest', 'Connect', 'Discover'],
}

export interface JumpLink {
  href: string
  word: string
  dest: string
  bg: string
  fg: string
}

export const jumpLinks: JumpLink[] = [
  { href: '#work', word: 'Manifest', dest: 'Selected work', bg: 'var(--coral)', fg: 'var(--ink-deep)' },
  { href: '#contact', word: 'Connect', dest: 'Mail and elsewhere', bg: 'var(--paper)', fg: 'var(--ink-deep)' },
  { href: '#about', word: 'Discover', dest: '00 / Who builds this', bg: 'var(--ink-deep)', fg: 'var(--coral)' },
]

// TODO: replace with your real address and profile URLs.
export const contact = {
  email: 'hello@deshaedekker.nl',
  links: [
    { label: 'Github', href: 'https://github.com' },
    { label: 'Linkedin', href: 'https://linkedin.com' },
  ],
}
