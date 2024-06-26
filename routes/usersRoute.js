import bcrypt from 'bcrypt';
import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const notHashedPassword = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(notHashedPassword, salt);

  const newuser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    await newuser.save();
    res.send('User registered successfully');
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    const passwordOk = user && bcrypt.compareSync(password, user.password);

    if (passwordOk) {
      res.send(user);
    } else {
      return res.status(400).json({ message: 'Login failed' });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default router;
