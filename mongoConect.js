import 'dotenv/config';
import mongoose from 'mongoose';

const mongoUrl = process.env.DB_URI;

mongoose.connect(mongoUrl, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.on('error', () => {
  console.log('MongoDB connection failed');
});

connection.on('connected', () => {
  console.log('MongoDB connection successful');
});

export default mongoose;
