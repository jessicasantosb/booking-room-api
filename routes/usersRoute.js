import bcrypt from 'bcrypt';
import 'dotenv/config';
import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/user.js';

const router = express.Router();

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
  const notHashedPassword = req.body.passwordValue;
  const salt = bcrypt.genSaltSync(10);
  req.body.passwordValue = bcrypt.hashSync(notHashedPassword, salt);

  const newuser = new User({
    name: req.body.nameValue,
    email: req.body.emailValue,
    password: req.body.passwordValue,
  });

  try {
    await newuser.save();
    res.send('User registered successfully');
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post('/login', async (req, res) => {
  const { emailValue, passwordValue } = req.body;

  try {
    const user = await User.findOne({ email: emailValue });
    const passwordOk = user && bcrypt.compareSync(passwordValue, user.password);

    if (passwordOk) {
      res.send(user);
    } else {
      return res.status(400).json({ message: 'Login failed' });
    }
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

  if (user) {
    res.status(201).send(user);
  } else {
    const newuser = new User({
      name: name,
      email: email,
    });
    await newuser.save();
    res.status(201).send(newuser);
  }
});

export default router;
