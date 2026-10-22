CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(254) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stories (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  comments_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contributors (
  id BIGSERIAL PRIMARY KEY,
  story_id BIGINT NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (story_id, user_id)
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id UUID PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS comments (
  id BIGSERIAL PRIMARY KEY,
  story_id BIGINT NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  comment_text TEXT NOT NULL,
  "timestamp" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS story_versions (
  id BIGSERIAL PRIMARY KEY,
  story_id BIGINT NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  user_id BIGINT NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS comment_reactions (
  id BIGSERIAL PRIMARY KEY,
  comment_id BIGINT NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reaction VARCHAR(24) NOT NULL CHECK (reaction IN ('heart', 'laugh', 'sparkle')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (comment_id, user_id, reaction)
);

CREATE TABLE IF NOT EXISTS share_links (
  id BIGSERIAL PRIMARY KEY,
  story_id BIGINT NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  created_by BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS stories_author_id_idx ON stories(author_id);
CREATE INDEX IF NOT EXISTS contributors_user_id_idx ON contributors(user_id);
CREATE INDEX IF NOT EXISTS comments_story_id_idx ON comments(story_id);
CREATE INDEX IF NOT EXISTS refresh_tokens_user_id_idx ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS story_versions_story_id_idx ON story_versions(story_id, created_at DESC);
CREATE INDEX IF NOT EXISTS comment_reactions_comment_id_idx ON comment_reactions(comment_id);
