import express from 'express';
import Room from '../models/rooms.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get('/:roomid', async (req, res) => {
  const roomid = req.params.roomid
  
  try {
    const room = await Room.findOne({_id: roomid});
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

export default router;
