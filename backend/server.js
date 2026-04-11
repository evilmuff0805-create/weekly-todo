require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDb } = require('./database');
const todosRouter = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS: allow Railway frontend URL + localhost for dev
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:4173',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
}));

app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/todos', todosRouter);

// Start server after DB is ready
initDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
