CREATE TABLE IF NOT EXISTS booking_clicks (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  city_code TEXT NOT NULL,
  item_type TEXT NOT NULL,
  item_id TEXT,
  item_title TEXT NOT NULL,
  platform TEXT NOT NULL,
  href TEXT NOT NULL,
  section_label TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_booking_clicks_user_id ON booking_clicks(user_id);
CREATE INDEX IF NOT EXISTS idx_booking_clicks_city_type ON booking_clicks(city_code, item_type);
CREATE INDEX IF NOT EXISTS idx_booking_clicks_created_at ON booking_clicks(created_at);
