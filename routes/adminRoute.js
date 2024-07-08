import express from 'express';
import Bookings from '../models/bookroom.js';

const router = express.Router();

router.get('/getallbookings', async (req, res) => {
  try {
    const bookings = await Bookings.find({});
    res.send(bookings);
  } catch (error) {
    res.send(400).json({ error });
  }
});

export default router;
