import { Router } from 'express';
import Bookings from '../models/bookroom.js';
import Rooms from '../models/rooms.js';
import Users from '../models/user.js';

const router = Router();

router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Bookings.find({});
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Rooms.find({});
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await Users.find({});
    res.send(users);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post('/room', async (req, res) => {
  const {
    name,
    rentPerDay,
    maxCount,
    phoneNumber,
    type,
    imageurl1,
    imageurl2,
    imageurl3,
    description,
  } = req.body;

  try {
    const newroom = new Rooms({
      name: name,
      rentproperty: rentPerDay,
      maxcount: maxCount,
      phonenumber: phoneNumber,
      type: type,
      imageurls: [imageurl1, imageurl2, imageurl3],
      currentbookings: [],
      description: description,
    });

    await newroom.save();
    res.send('Room registered successfully');
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put('/:userid', async (req, res) => {
  const { userid } = req.params;

  try {
    const userItem = await Users.findOne({ _id: userid });
    userItem.isAdmin = true;
    await userItem.save();
    res.send(userItem);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export { router };
