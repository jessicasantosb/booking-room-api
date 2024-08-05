import dbConfig from './mongoConect.js';
import 'dotenv/config';
import express from 'express';
import { admin, bookroom, rooms, users } from './routes/index.js';

const app = express();

app.use(express.json());
app.use('/api/rooms', rooms.router);
app.use('/api/users', users.router);
app.use('/api/books', bookroom.router);
app.use('/api/admin', admin.router);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
