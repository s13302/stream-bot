import mongoose from 'mongoose';

async function connect() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  };
  const db = await mongoose.connect(process.env.MONGO_URL, options);
  return db;
}

export default connect();
