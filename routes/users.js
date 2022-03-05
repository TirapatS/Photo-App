const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const userValidationRules = require('../validation/user');
const photoValidationRules = require('../validation/photo');
const auth = require('../middlewares/auth')



/* Get user info */
router.get('/', auth.basic, userController.getUser);


/* Register new users */
router.post('/register', userValidationRules.createRules, userController.register);


module.exports = router;