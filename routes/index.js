
const express = require('express');
const router = express.Router();

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'oh, hi' }});
});
/*
router.use('/albums', require('./album'));
router.use('/photos', require('./photo'));
*/
router.use('/user', require('./users'));
module.exports = router;
