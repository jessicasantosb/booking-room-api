import express from 'express';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import BookroomModel from '../models/bookroom.js';
import Rooms from '../models/rooms.js';

const stripe = new Stripe(process.env.STRIPE_KEY);
const router = express.Router();

router.post('/', async (req, res) => {
  const {
    room,
    roomid,
    userid,
    fromDate,
    toDate,
    totalAmount,
    totalDays,
    token,
  } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalAmount * 100,
        customer: customer.id,
        currency: 'brl',
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
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

      roomtemp.currentbookings.push({
        bookingid: booking._id,
        fromDate: fromDate,
        toDate: toDate,
        userid: userid,
        status: booking.status,
      });

      await roomtemp.save();
    }

    res.send('Payment has been made. Room booked successfully.');
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get('/:userid', async (req, res) => {
  const userid = req.params.userid;

  try {
    const userBookings = await BookroomModel.find({ userid: userid });
    res.send(userBookings);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.put('/:roomid/:bookingid', async (req, res) => {
  const { roomid, bookingid } = req.params;

  try {
    const bookingItem = await BookroomModel.findOne({
      _id: bookingid,
    });
    bookingItem.status = 'cancelado';
    await bookingItem.save();

    const room = await Rooms.findOne({ _id: roomid });
    const bookings = room.currentbookings;

    const tempbookings = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );

    room.currentbookings = tempbookings;
    await room.save();

    res.send('Book successfully canceled.');
  } catch (error) {
    return res.send(400).json({ error });
  }
});

export default router;
