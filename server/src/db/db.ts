import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL, {
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  dbName: process.env.MONGO_DB,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).catch((error) => {
  console.error(error);
});
const { connection: db } = mongoose;

db.on('connected', () => {
  console.info('Database connected');
});

db.on('disconnected', () => {
  console.info('Database disconnected');
});

db.on('error', (err) => {
  console.error(err);
});

export default db;
