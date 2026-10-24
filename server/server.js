
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env, isEmailConfigured } from './config/env.js';
import contactRoutes from './routes/contactRoutes.js';
import { apiLimiter } from './middleware/rateLimit.js';

const app = express();

app.set('trust proxy', 1);

app.use(helmet());

app.use(
  cors()
);

app.use(express.json({ limit: '20kb' }));

// Root route: open the server URL in a browser to confirm it is deployed and running.
app.get('/', (_req, res) => {
  res.json({
    ok: true,
    service: 'Punjabi Tadka Nutrition API',
    emailConfigured: isEmailConfigured(),
    time: new Date().toISOString(),
  });
});



app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    emailConfigured: isEmailConfigured(),
  });
});

app.use('/api/contact', contactRoutes);

app.use('/api', (_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Not found.',
  });
});

// Error handler
app.use((err, _req, res, _next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON.',
    });
  }

  console.error(err);

  res.status(500).json({
    success: false,
    message: 'Something went wrong.',
  });
});

// Local / VPS: start listening. On Vercel the app is exported and Vercel runs it, so we must not listen there.
if (!process.env.VERCEL) {
  app.listen(env.port, () => console.log(`API running on http://localhost:${env.port}`));
}

export default app;
