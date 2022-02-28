/*
const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo_controller');
const photoValidationRules = require('../validation/photo');

router.get('/', photoController.index);

router.get('/:userId', photoController.show);


router.post('/', photoValidationRules.createRules, photoController.store);

router.put('/:userId', photoValidationRules.updateRules, photoController.update);

router.delete('/:userId', photoController.destroy);

module.exports = router;
*/