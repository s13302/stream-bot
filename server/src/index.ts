import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import apiRouter from './api/router';

const app = express();
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.info(`App is listening on port: ${port}`);
});
