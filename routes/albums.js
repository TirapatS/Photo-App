
const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller.js');
const albumValidationRules = require('../validation/album');
const photoController = require('../controllers/photo_controller.js');
const photoValidationRules = require('../validation/photo');



// GET /albums
router.get('/',  albumController.index);

// GET /albums/:albumId
router.get('/:albumId',  albumController.show);

// POST /albums
router.post('/', albumValidationRules.createRules, albumController.store);

// PUT /albums/albumId
router.put('/:albumId', albumValidationRules.updateRules, albumController.update);

// POST /albums/:albumId/photos
router.post('/', albumValidationRules.createRules, photoValidationRules.createRules, albumController.store, photoController.store);


module.exports = router;
