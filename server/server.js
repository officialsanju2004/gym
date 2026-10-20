
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
  cors({
    origin: env.clientUrl.split(',').map((s) => s.trim()),
    methods: ['POST', 'GET'],
  })
);

app.use(express.json({ limit: '20kb' }));

app.use('/api', apiLimiter);

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

export default app;
