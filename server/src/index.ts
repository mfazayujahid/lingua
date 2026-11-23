import express from 'express';
import cors from 'cors';
import { initDatabase } from './db/database';
import { dashboardRouter } from './routes/dashboard';
import { curriculumRouter } from './routes/curriculum';
import { srsRouter } from './routes/srs';
import { sessionsRouter } from './routes/sessions';
import { studioRouter } from './routes/studio';
import { kanjiRouter } from './routes/kanji';
import { analyticsRouter } from './routes/analytics';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Initialize DB schema
initDatabase();

// Health probe
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'lingua-mastery-api',
    timestamp: new Date().toISOString(),
    database: 'connected'
  });
});

// Mount modular domain routes
app.use('/api/dashboard', dashboardRouter);
app.use('/api/curriculum', curriculumRouter);
app.use('/api/srs', srsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/studio', studioRouter);
app.use('/api/kanji', kanjiRouter);
app.use('/api/analytics', analyticsRouter);

app.listen(PORT, () => {
  console.log(`[LinguaMastery API] Server listening on http://localhost:${PORT}`);
});
