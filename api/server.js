import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXPECTION! shutting down💥💥');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config();

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB).then(() => console.log('Database successfully connected'));

const port = process.env.port || 5000;
const server = app.listen(port, () => {
  console.log(`Server successfully running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! shutting down💥💥');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
