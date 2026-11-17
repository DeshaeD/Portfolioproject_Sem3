// All page content lives here, so adding a project means editing data, not markup.

export type TitleStyle = 'solid' | 'outline' | 'pale'

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

export const projects: Plate[] = [
  {
    numeral: '01',
    numeralSide: 'right',
    cross: { label: '01 / Npuls', position: { left: '8%', bottom: '16%' } },
    kicker: 'Project 01 — client work',
    title: [
      { text: 'Npuls', style: 'pale' },
      { text: 'Planner', style: 'solid' },
    ],
    body: 'A mobile planner for students mapping out their own learning goals. I built the overview, the filter system and the progress states, and worked out the component library the rest of the team built on.',
    chips: [{ label: 'React native' }, { label: 'Expo' }, { label: 'Typescript' }, { label: 'Figma' }],
    media: { kind: 'image', src: '/img/npuls-planner.png', alt: 'The Plannen overview screen of the Npuls planner app, listing three plans with progress bars' },
    caption: 'Fig. 01 — Plannen overzicht',
    columns: { media: '1 / span 4', text: '6 / span 6' },
    textOffset: 'clamp(16px, 5vw, 70px)',
  },
  {
    numeral: '02',
    numeralSide: 'left',
    cross: { label: 'X 1180 / Y 068', position: { right: '14%', top: '8%' } },
    kicker: 'Project 02 — school',
    title: [
      { text: 'Gear', style: 'outline' },
      { text: 'Dashboard', style: 'solid' },
    ],
    body: 'A dashboard that pulls scattered study data into one readable surface. Most of the work went into the data table: sorting, sticky headers and a layout that survives a thousand rows without a scrollbar inside a scrollbar.',
    chips: [{ label: 'React' }, { label: 'Tanstack table' }, { label: 'CSS grid' }],
    media: { kind: 'placeholder', ratio: 'wide' },
    caption: 'Fig. 02 — Overview screen',
    columns: { media: '7 / span 6', text: '1 / span 5' },
    textOffset: 'clamp(20px, 6vw, 96px)',
  },
  {
    numeral: '03',
    numeralSide: 'right',
    cross: { label: '03 / Type study', position: { left: '44%', top: '5%' } },
    kicker: 'Project 03 — self-initiated',
    title: [
      { text: 'Type', style: 'pale' },
      { text: 'Study', style: 'outline' },
    ],
    body: 'A set of generated posters exploring how far a grid can be pushed before a layout stops being readable. Each one is drawn in canvas from a seed, so the series is never the same twice.',
    chips: [{ label: 'Canvas' }, { label: 'Vanilla js' }, { label: 'Variable fonts' }],
    media: { kind: 'placeholder', ratio: 'photo' },
    caption: 'Fig. 03 — Poster series',
    columns: { media: '1 / span 5', text: '7 / span 5' },
    textOffset: 'clamp(16px, 5vw, 74px)',
  },
]

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
  /** Image shown (inverted) in the preview panel while this row is active. */
  preview?: string
}

export const jumpLinks: JumpLink[] = [
  { href: '#work', word: 'Manifest', dest: '01 — 03 / Selected work', bg: 'var(--coral)', fg: 'var(--ink-deep)', preview: '/img/npuls-planner.png' },
  { href: '#contact', word: 'Connect', dest: 'Mail and elsewhere', bg: 'var(--paper)', fg: 'var(--ink-deep)' },
  { href: '#about', word: 'Discover', dest: '00 / Who builds this', bg: 'var(--ink-deep)', fg: 'var(--coral)', preview: '/img/hero.jpg' },
]

// TODO: replace with your real address and profile URLs.
export const contact = {
  email: 'hello@deshaedekker.nl',
  links: [
    { label: 'Github', href: 'https://github.com' },
    { label: 'Linkedin', href: 'https://linkedin.com' },
  ],
}
