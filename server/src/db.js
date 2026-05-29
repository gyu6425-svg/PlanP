import Database from 'better-sqlite3';

const dbPath = process.env.DB_PATH ?? './planp.db';

export const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export function migrate() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      login_id TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      birth_year TEXT NOT NULL,
      birth_month TEXT NOT NULL,
      birth_day TEXT NOT NULL,
      email TEXT,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_users_login_id ON users(login_id);

    CREATE TABLE IF NOT EXISTS favorites (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      item_id TEXT NOT NULL,
      item_type TEXT NOT NULL,
      category_label TEXT NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT,
      price TEXT,
      policy TEXT,
      image TEXT,
      brand TEXT,
      href TEXT,
      payload TEXT,
      created_at TEXT NOT NULL,
      UNIQUE(user_id, item_id, item_type),
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
  `);
}
