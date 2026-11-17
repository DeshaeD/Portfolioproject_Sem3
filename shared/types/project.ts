// Shape of a row in the Supabase `projects` table. Shared by the server route and the app.

export type TitleStyle = 'solid' | 'outline' | 'pale'

export interface ProjectRow {
  slug: string
  kicker: string | null
  title_top: string
  title_top_style: TitleStyle
  title_bottom: string
  title_bottom_style: TitleStyle
  body: string
  tools: string[]
  image_url: string | null
  image_alt: string | null
  caption: string | null
}
