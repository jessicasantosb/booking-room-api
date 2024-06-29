import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import BookroomModel from '../models/bookroom.js';

const router = express.Router();

router.post('/bookroom', async (req, res) => {
  const { room, roomid, userid, fromDate, toDate, totalAmount, totalDays } =
    req.body;

  try {
    const newbooking = new BookroomModel({
      room: room.name,
      roomid: roomid,
      userid: userid,
      fromdate: fromDate,
      todate: toDate,
      totalamount: totalAmount,
      totaldays: totalDays,
      transactionid: uuidv4(),
    });

    await newbooking.save();
    res.send('Room booked successfully');
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default router;
