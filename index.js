import dbConfig from './mongoConect.js'
import 'dotenv/config';
import express from 'express'
import roomsRoute from './routes/roomsRoute.js';

const app = express();
app.use('/api/rooms', roomsRoute)

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
