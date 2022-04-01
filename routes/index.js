
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userValidationRules = require('../validation/user');
const userController = require('../controllers/user_controller');


/* GET / */
router.get('/', (req, res, next) => {
	res.send({ status: 200, message: 'Oh hello there, the connection was successful!' });
});

router.use('/photos', auth.basic, require('./photos'));
router.use('/albums', auth.basic, require('./albums'));
router.use('/user', require('./users'));

/* Register new users */
router.post('/register', userValidationRules.createRules, userController.register);

module.exports = router;
