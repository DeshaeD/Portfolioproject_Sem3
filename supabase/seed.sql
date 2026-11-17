-- Starting content. To add a project, insert a row like these (Supabase Table Editor works too).
-- sort_order decides position; leave gaps (10, 20, 30…) so you can slot projects in between later.

insert into public.projects
  (slug, sort_order, kicker, title_top, title_top_style, title_bottom, title_bottom_style, body, tools, image_url, image_alt, caption)
values
  ('npuls-planner', 10, 'client work', 'Npuls', 'pale', 'Planner', 'solid',
   'A mobile planner for students mapping out their own learning goals. I built the overview, the filter system and the progress states, and worked out the component library the rest of the team built on.',
   array['React native','Expo','Typescript','Figma'],
   '/img/npuls-planner.png', 'The Plannen overview screen of the Npuls planner app, listing three plans with progress bars', 'Plannen overzicht'),
  ('gear-dashboard', 20, 'school', 'Gear', 'outline', 'Dashboard', 'solid',
   'A dashboard that pulls scattered study data into one readable surface. Most of the work went into the data table: sorting, sticky headers and a layout that survives a thousand rows without a scrollbar inside a scrollbar.',
   array['React','Tanstack table','CSS grid'], null, null, 'Overview screen'),
  ('type-study', 30, 'self-initiated', 'Type', 'pale', 'Study', 'outline',
   'A set of generated posters exploring how far a grid can be pushed before a layout stops being readable. Each one is drawn in canvas from a seed, so the series is never the same twice.',
   array['Canvas','Vanilla js','Variable fonts'], null, null, 'Poster series');
