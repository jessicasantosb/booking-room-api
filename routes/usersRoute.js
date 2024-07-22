import bcrypt from 'bcrypt';
import express from 'express';
import User from '../models/user.js';

const router = express.Router();

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

export default router;
