import dbConfig from './mongoConect.js'
import 'dotenv/config';
import express from 'express'
import roomsRoute from './routes/roomsRoute.js';
import usersRoute from './routes/usersRoute.js';
import bookroomRoute from './routes/bookroomRoute.js';

const app = express();

app.use(express.json())
app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)
app.use('/api/books', bookroomRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
