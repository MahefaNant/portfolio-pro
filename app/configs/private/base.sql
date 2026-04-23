-- ============================================================
--  PORTFOLIO PRO — Schéma PostgreSQL complet
--  Compatible Supabase · généré pour Mahefa
-- ============================================================

-- Active l'extension UUID si pas encore activée
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 0. MYINFO (profil personnel)
-- ============================================================
CREATE TABLE my_info (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Infos de base
  full_name       TEXT NOT NULL,
  birth_date      DATE,
  phone           TEXT,
  email           TEXT,

  -- Présentation
  bio_fr          TEXT,
  bio_en          TEXT,
  short_intro_fr     TEXT,         -- ex: "Fullstack Developer spécialisé Laravel
  short_intro_en     TEXT,
  role_fr         TEXT,         -- ex: "Développeur Fullstack spécialisé Laravel"
  role_en         TEXT,

  -- Skills (tableau dynamique)
  skills          JSONB DEFAULT '[]'::jsonb,

  -- Médias
  profile_image   TEXT,         -- URL image (Cloudinary)
  cover_image     TEXT,         -- bannière portfolio

  -- Localisation
  city            TEXT,
  country         TEXT,

  -- Pro
  job_title_fr       TEXT,         -- ex: "Backend Developer"
  job_title_en       TEXT,         -- ex: "Backend Developer"
  years_experience INT,
  project_count   INT,
  happy_clients   INT,
  commitment      INT,
  cv_url          TEXT,         -- lien vers CV PDF
  cv_version      TEXT,         -- version du CV

  -- Disponibilité
  is_available    BOOLEAN DEFAULT TRUE,

  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

-- create table language
CREATE TABLE my_language (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  language_fr     TEXT NOT NULL,
  language_en     TEXT NOT NULL
  level_fr        TEXT NOT NULL,
  level_en        TEXT NOT NULL,
  flag            TEXT NOT NULL,
  description_fr  TEXT NOT NULL,
  description_en  TEXT NOT NULL,
  certifications  JSONB DEFAULT '[]'::jsonb,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
)

CREATE TABLE mindset (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_fr        TEXT NOT NULL,
  title_en        TEXT NOT NULL,
  description_fr     TEXT NOT NULL,
  description_en     TEXT NOT NULL,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
)

CREATE TABLE education (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_fr        TEXT NOT NULL,
  title_en        TEXT NOT NULL,
  description_fr     TEXT NOT NULL,
  description_en     TEXT NOT NULL,
  school       TEXT NOT NULL,
  location     TEXT NOT NULL,
  period_fr       TEXT NOT NULL,
  period_en       TEXT NOT NULL,
  type            TEXT NOT NULL,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
)

CREATE TABLE certification (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  year            TEXT NOT NULL,
  credentialUrl   TEXT NOT NULL,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
)


-- ============================================================
-- 1. PROJECTS
-- ============================================================
CREATE TABLE projects (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT        UNIQUE NOT NULL,

  -- Contenu i18n
  title_fr      TEXT        NOT NULL,
  title_en      TEXT        NOT NULL,
  description_fr TEXT,
  description_en TEXT,
  content_fr    TEXT,
  content_en    TEXT,

  technologies  JSONB DEFAULT '[]'::jsonb,

  -- Défis techniques (page détail)
  challenges_fr TEXT,
  challenges_en TEXT,

  -- Médias
  image_url     TEXT,                        -- image principale (Cloudinary)
  video_url     TEXT,                        -- démo YouTube / Vimeo

  -- Liens
  github_url    TEXT,
  live_url      TEXT,

  -- Métadonnées projet
  duration      TEXT,                        -- ex : "3 mois", "En cours"
  role_fr          TEXT,                        -- ex : "Fullstack dev", "Lead front"
  role_en          TEXT,                        -- ex : "Fullstack dev", "Lead front"
  category      TEXT,                        -- 'web' | 'mobile' | 'api' | 'fullstack'

  -- Gestion affichage
  availability_fr TEXT,                  -- ex : "Lun - Ven, 9h - 18h"
  availability_en TEXT,                  -- ex : "Mon - Fri, 9h - 18h"
  status        TEXT        NOT NULL DEFAULT 'draft'
                            CHECK (status IN ('draft', 'published', 'archived')),
  is_featured   BOOLEAN     NOT NULL DEFAULT FALSE,
  order_index   INT         NOT NULL DEFAULT 0,

  created_at    TIMESTAMP   NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMP   NOT NULL DEFAULT NOW()
);

-- Index utiles
CREATE INDEX idx_projects_status      ON projects (status);
CREATE INDEX idx_projects_is_featured ON projects (is_featured);
CREATE INDEX idx_projects_order       ON projects (order_index);


-- ============================================================
-- 2. TECHNOLOGIES
-- ============================================================
CREATE TABLE technologies (
  id          UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT      NOT NULL UNIQUE,
  icon        TEXT,                          -- emoji ou nom d'icône (ex : "react")
  type        TEXT,                          -- 'frontend' | 'backend' | 'devops' | 'database',
  isStrength  BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 3. PROJECT_TECHNOLOGIES  (pivot many-to-many)
-- ============================================================
CREATE TABLE project_technologies (
  id             UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id     UUID  NOT NULL REFERENCES projects(id)     ON DELETE CASCADE,
  technology_id  UUID  NOT NULL REFERENCES technologies(id) ON DELETE CASCADE,
  UNIQUE (project_id, technology_id)
);

CREATE INDEX idx_pt_project    ON project_technologies (project_id);
CREATE INDEX idx_pt_technology ON project_technologies (technology_id);


-- ============================================================
-- 4. PROJECT_IMAGES  (galerie par projet)
-- ============================================================
CREATE TABLE project_images (
  id          UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id  UUID      NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url   TEXT      NOT NULL,
  alt         TEXT,
  position    INT       NOT NULL DEFAULT 0,   -- ordre d'affichage
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_pimg_project ON project_images (project_id);


-- ============================================================
-- 5. EXPERIENCES  (timeline About)
-- ============================================================
CREATE TABLE experiences (
  id           UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  title_fr     TEXT      NOT NULL,
  title_en     TEXT      NOT NULL,
  company      TEXT      NOT NULL,
  location     TEXT,                          -- ex : "Antananarivo, Madagascar"
  description_fr TEXT,
  description_en TEXT,
  start_date   DATE      NOT NULL,
  end_date     DATE,                          -- NULL si poste actuel
  is_current   BOOLEAN   NOT NULL DEFAULT FALSE,
  type         TEXT      NOT NULL DEFAULT 'work'
               CHECK (type IN ('work', 'education', 'freelance', 'volunteer')),
  order_index  INT       NOT NULL DEFAULT 0,
  created_at   TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_exp_order ON experiences (order_index);


-- ============================================================
-- 6. TESTIMONIALS  (recommandations / avis)
-- ============================================================
CREATE TABLE testimonials (
  id          UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT      NOT NULL,
  role_fr      TEXT,                           -- ex : "CTO @ Acme Inc."
  role_en     TEXT,                           -- ex : "CTO @ Acme Inc."
  content_fr  TEXT      NOT NULL,
  content_en  TEXT,
  avatar_url  TEXT,
  is_visible  BOOLEAN   NOT NULL DEFAULT TRUE,
  order_index INT       NOT NULL DEFAULT 0,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_test_visible ON testimonials (is_visible);


-- ============================================================
-- 7. SOCIAL_LINKS  (réseaux sociaux, gérables depuis admin)
-- ============================================================
CREATE TABLE social_links (
  id          UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  platform    TEXT      NOT NULL UNIQUE,      -- 'github' | 'linkedin' | 'twitter' | 'youtube'
  url         TEXT      NOT NULL,
  label       TEXT,                           -- ex : "@mahefa_dev"
  is_visible  BOOLEAN   NOT NULL DEFAULT TRUE,
  order_index INT       NOT NULL DEFAULT 0,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 8. CONTACTS  (formulaire de contact)
-- ============================================================
CREATE TABLE contacts (
  id          UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT      NOT NULL,
  email       TEXT      NOT NULL,
  subject     TEXT,
  message     TEXT      NOT NULL,
  is_read     BOOLEAN   NOT NULL DEFAULT FALSE,
  replied_at  TIMESTAMP,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contacts_is_read ON contacts (is_read);



-- ============================================================
-- 9. ADMINS  (auth custom — optionnel si tu utilises Supabase Auth)
-- ============================================================
CREATE TABLE admins (
  id          UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT      UNIQUE NOT NULL,
  password    TEXT      NOT NULL,             -- bcrypt hash obligatoire
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);


-- ============================================================
-- TRIGGER : updated_at auto sur projects
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- ============================================================
-- DONNÉES DE DÉPART (seed minimal)
-- ============================================================

-- Quelques technologies communes
INSERT INTO technologies (name, icon, type) VALUES
  ('Next.js',      'nextjs',      'frontend'),
  ('React',        'react',       'frontend'),
  ('TypeScript',   'typescript',  'frontend'),
  ('Tailwind CSS', 'tailwind',    'frontend'),
  ('Node.js',      'nodejs',      'backend'),
  ('PostgreSQL',   'postgresql',  'database'),
  ('Supabase',     'supabase',    'database'),
  ('Cloudinary',   'cloudinary',  'devops'),
  ('Vercel',       'vercel',      'devops'),
  ('Laravel',      'laravel',     'backend');

-- Réseaux sociaux vides (à remplir depuis admin)
INSERT INTO social_links (platform, url, label, order_index) VALUES
  ('github',   'https://github.com/',   'GitHub',   1),
  ('linkedin', 'https://linkedin.com/', 'LinkedIn', 2);


-- ============================================================
-- VUES UTILES
-- ============================================================

-- Projets publiés avec leurs technologies (pour l'API frontend)
CREATE OR REPLACE VIEW v_projects_published AS
SELECT
  p.id,
  p.slug,
  p.title_fr,
  p.title_en,
  p.description_fr,
  p.description_en,
  p.image_url,
  p.github_url,
  p.live_url,
  p.duration,
  p.role,
  p.category,
  p.is_featured,
  p.order_index,
  p.created_at,
  COALESCE(
    json_agg(
      json_build_object('name', t.name, 'icon', t.icon, 'type', t.type)
    ) FILTER (WHERE t.id IS NOT NULL),
    '[]'
  ) AS technologies
FROM projects p
LEFT JOIN project_technologies pt ON pt.project_id = p.id
LEFT JOIN technologies t          ON t.id = pt.technology_id
WHERE p.status = 'published'
GROUP BY p.id
ORDER BY p.order_index ASC, p.created_at DESC;


-- Stats admin rapide
CREATE OR REPLACE VIEW v_admin_stats AS
SELECT
  (SELECT COUNT(*) FROM projects WHERE status = 'published') AS projects_published,
  (SELECT COUNT(*) FROM projects WHERE status = 'draft')     AS projects_draft,
  (SELECT COUNT(*) FROM contacts WHERE is_read = FALSE)      AS unread_messages,
  (SELECT COUNT(*) FROM contacts)                            AS total_messages;