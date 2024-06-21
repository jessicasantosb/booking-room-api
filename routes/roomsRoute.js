import express from 'express';
import Room from '../models/rooms.js';

const router = express.Router();

router.get('/getallrooms', async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms)
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

export default router
