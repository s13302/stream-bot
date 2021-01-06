import mongoose from 'mongoose';

import logger from '../logger';

mongoose.connect(process.env.MONGO_URL, {
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  dbName: process.env.MONGO_DB,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).catch((error) => {
  logger.error(error);
});
const { connection: db } = mongoose;

db.on('connected', () => {
  logger.info('Database connected');
});

db.on('disconnected', () => {
  logger.info('Database disconnected');
});

db.on('error', (err) => {
  logger.error(err);
});

export default db;
