import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import expressPino from 'express-pino-logger';

import logger from './logger';
import apiRouter from './api/router';

const expressLogger = expressPino(logger);

const app = express();
app.use(expressLogger);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  logger.info(`App is listening on port: ${port}`);
});
