import express from 'express';
import Bookings from '../models/bookroom.js';
import Rooms from '../models/rooms.js';

const router = express.Router();

router.get('/getallbookings', async (req, res) => {
  try {
    const bookings = await Bookings.find({});
    res.send(bookings);
  } catch (error) {
    res.send(400).json({ message: error });
  }
});

router.get('/getallrooms', async (req, res) => {
  try {
    const rooms = await Rooms.find({})
    res.send(rooms)
  } catch (error) {
    res.send(400).json({message: error})
  }
});

export default router;
