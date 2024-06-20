import express from 'express'
import dbConfig from './mongoConect.js'
import 'dotenv/config';

const app = express();

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
