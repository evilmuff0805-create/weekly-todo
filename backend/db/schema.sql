CREATE TABLE IF NOT EXISTS todos (
  id         SERIAL PRIMARY KEY,
  title      TEXT NOT NULL,
  time       TEXT,
  todo_date  DATE NOT NULL,
  completed  BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_todo_date ON todos(todo_date);
