import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pino from 'pino';
import expressPino from 'express-pino-logger';

import { db } from './db';

const logger = pino({
  level: process.env.LOG_LEVEL || 'debug',
});
const expressLogger = expressPino(logger);

const app = express();
app.use(expressLogger);
app.use(helmet());
app.use(cors());
const port = process.env.APP_PORT || 3000;

app.get('/', (req, res) => {
  logger.debug('Got an request');
  res.send('Some data');
});

app.listen(port, () => {
  console.log(db);
  logger.info(`App is listening on port: ${port}`);
});
