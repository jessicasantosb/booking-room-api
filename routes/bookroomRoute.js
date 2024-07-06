import express from 'express';
import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import BookroomModel from '../models/bookroom.js';
import Rooms from '../models/rooms.js';

const stripe = new Stripe(process.env.STRIPE_KEY);
const router = express.Router();

router.post('/bookroom', async (req, res) => {
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
    console.error(error);
  }
});

export default router;
