const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY || 'supersecretkey12345';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('Token not provided');
    return res.sendStatus(401); 
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.sendStatus(403); 
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
