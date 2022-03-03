
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ status: 404, message: 'Not Found' });
});

//router.use('/albums', require('./album'));

router.use('/photos', auth.basic, require('./photos'));

router.use('/user', require('./users'));

module.exports = router;
