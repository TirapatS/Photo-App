
const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo_controller');
const photoValidationRules = require('../validation/photo');



// GET /photos
router.get('/', photoController.index);

// GET /photos/photoId 
router.get('/:photoId', photoController.show);

// POST /photos
router.post('/', photoValidationRules.createRules, photoController.store);

// PUT /photos
router.put('/:photoId', photoValidationRules.updateRules, photoController.update);

module.exports = router;
