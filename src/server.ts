import app from './app';
import { config } from './config';
import mongoose from 'mongoose';

const PORT: string = config.port;

const start = async () => {
  try {
    console.log('Connecting to DB...');
    await mongoose.connect(config.db_uri);
    console.log('DB connected');

    app.listen(Number(PORT), () => {
      console.log(`Server started on ${PORT}`);
    });
  } catch (e) {
    console.error('Startup error:', e);
  }
};

start();
