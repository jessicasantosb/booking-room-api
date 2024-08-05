import bcrypt from 'bcrypt';
import 'dotenv/config';
import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/user.js';

const router = Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const users = [];

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) {
    array[i] = item;
  } else {
    array.push(item);
  }
}

router.post('/register', async (req, res) => {
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    ...req.body,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res.status(201).json('User registered successfully');
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    const passwordOk = user && bcrypt.compare(password, user.password);

    if (passwordOk) return res.status(200).json(user);
    return res.status(400).json({ error });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post('/google-login', async (req, res) => {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { name, email } = ticket.getPayload();
  upsert(users, { name, email });
  const user = await User.findOne({ email: email });

  if (user) return res.status(201).json(user);

  const newuser = new User({
    name,
    email,
  });

  await newuser.save();
  return res.status(201).json(newuser);
});

export { router };
