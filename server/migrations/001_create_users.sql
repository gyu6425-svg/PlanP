CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  login_id TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  birth_year TEXT NOT NULL,
  birth_month TEXT NOT NULL,
  birth_day TEXT NOT NULL,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_login_id ON users(login_id);
