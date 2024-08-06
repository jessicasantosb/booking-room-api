import dbConfig from './mongoConect.js';
import 'dotenv/config';
import cors from 'cors'
import express from 'express';
import { admin, bookroom, rooms, users } from './routes/index.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/rooms', rooms.router);
app.use('/users', users.router);
app.use('/books', bookroom.router);
app.use('/admin', admin.router);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
