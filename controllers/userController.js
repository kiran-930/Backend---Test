const jwt = require('jsonwebtoken');
const User = require('../models/user');
const SECRET_KEY = 'supersecretkey12345';

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const newUser = new User({ email, password, name });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).send('Invalid email or password');
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  register,
  login,
  listUsers,
  getUserDetails,
};
