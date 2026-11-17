import type { ProjectRow } from '#shared/types/project'

// GET /api/projects: published projects in display order.
export default defineEventHandler(async (): Promise<ProjectRow[]> => {
  const { data, error } = await useSupabase()
    .from('projects')
    .select('slug, kicker, title_top, title_top_style, title_bottom, title_bottom_style, body, tools, image_url, image_alt, caption')
    .eq('published', true)
    .order('sort_order')
    .order('id')

  if (error) {
    console.error('[api/projects]', error.message)
    throw createError({ statusCode: 502, statusMessage: 'Could not load projects' })
  }

  return data
})
