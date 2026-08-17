import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';

import todoRouter from './routes/todoRoute.js';
import { pinoHttpMiddleware } from './utils/loggerHelper.js';
import { UniqueConstraintError } from 'sequelize';

const limiter = rateLimit({
  windowMs: 1000, // 1 second
  limit: 10,
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);

app.use((_req, res, next) => {
  const originJson = res.json;

  res.json = function (body) {
    res.body = body;
    originJson.call(this, body);
    return this;
  };
  next();
});

app.use(pinoHttpMiddleware);

app.use('/v1', todoRouter);

app.use((err, req, res, _next) => {
  req.log.error({ err }, 'unhandled error');
  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({ message: 'ID already exists.' });
  }
  res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
