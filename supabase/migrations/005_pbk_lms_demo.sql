-- PBK LMS: live demo URL and cover image (run if 004 was applied before this update)

UPDATE projects
SET
  demo_url = 'https://pbk-lms-cursor-git-main-sarrol2384s-projects.vercel.app',
  cover_url = '/projects/pbk-lms-cover.png',
  featured = true,
  published = true,
  sort_order = 4,
  updated_at = now()
WHERE slug = 'pbk-lms';

DELETE FROM project_images
WHERE project_id IN (SELECT id FROM projects WHERE slug = 'pbk-lms');

INSERT INTO project_images (project_id, url, alt, sort_order)
SELECT p.id, '/projects/pbk-lms-cover.png', 'PBK Learning Management System website', 0
FROM projects p WHERE p.slug = 'pbk-lms';
