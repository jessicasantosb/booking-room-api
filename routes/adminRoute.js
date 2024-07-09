import express from 'express';
import Bookings from '../models/bookroom.js';
import Rooms from '../models/rooms.js';
import Users from '../models/user.js';

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
    const rooms = await Rooms.find({});
    res.send(rooms);
  } catch (error) {
    res.send(400).json({ message: error });
  }
});

router.get('/getallusers', async (req, res) => {
  try {
    const users = await Users.find({});
    res.send(users);
  } catch (error) {
    res.send(400).json({ message: error });
  }
});

export default router;
