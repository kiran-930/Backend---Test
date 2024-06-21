const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/jwtMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', authenticateToken, userController.listUsers);
router.get('/:id', authenticateToken, userController.getUserDetails);

module.exports = router;
