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
