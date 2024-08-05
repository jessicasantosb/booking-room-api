import dbConfig from './mongoConect.js';
import 'dotenv/config';
import cors from 'cors'
import express from 'express';
import { admin, bookroom, rooms, users } from './routes/index.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://booking-room-jessicasantosb.vercel.app/'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});
app.use('/api/rooms', rooms.router);
app.use('/api/users', users.router);
app.use('/api/books', bookroom.router);
app.use('/api/admin', admin.router);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
