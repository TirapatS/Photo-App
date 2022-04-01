const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const auth = require('../middlewares/auth')

/* Get user info */
router.get('/', auth.basic, userController.getUser);

module.exports = router;