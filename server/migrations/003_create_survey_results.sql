CREATE TABLE IF NOT EXISTS survey_results (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  city_code TEXT NOT NULL,
  answers TEXT NOT NULL,
  result_type TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(user_id, city_code),
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_survey_results_user_id ON survey_results(user_id);
CREATE INDEX IF NOT EXISTS idx_survey_results_city_code ON survey_results(city_code);
