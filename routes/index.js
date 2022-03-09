
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ status: 200, message: 'Oh hello there, the connection was successful!' });
});

//router.use('/albums', require('./album'));

router.use('/photos', auth.basic, require('./photos'));
router.use('/albums', auth.basic, require('./albums'));
router.use('/user', require('./users'));

module.exports = router;
