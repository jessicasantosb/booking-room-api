import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import BookroomModel from '../models/bookroom.js';
import Rooms from '../models/rooms.js';

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

    const booking = await newbooking.save();
    const roomtemp = await Rooms.findOne({ _id: roomid });
    
    roomtemp.currentbookings.push({bookingid: booking._id, fromDate: fromDate, toDate: toDate, userid: userid, status: booking.status})
    
    await roomtemp.save()
    res.send('Room booked successfully');
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default router;
