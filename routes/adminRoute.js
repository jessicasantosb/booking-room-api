import express from 'express';
import Rooms from '../models/rooms.js';

const router = express.Router();

router.get('/getallbookings', async (req, res) => {
  try {
    const bookings = await Rooms.find({});
    res.send(bookings);
  } catch (error) {
    res.send(400).json({ error });
  }
});

export default router;
