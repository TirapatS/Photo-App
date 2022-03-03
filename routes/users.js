const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const userValidationRules = require('../validation/user');
const photoValidationRules = require('../validation/photo');
const auth = require('../middlewares/auth')



/* Get user info */
router.get('/', auth.basic, userController.getUser);

/* Get authenticated photos */
//router.get('/photos', auth.basic, userController.getPhotos);

/* Register new users */
router.post('/register', userValidationRules.createRules, userController.register);

/* Update a specific resource */
//router.put('/:userId', userValidationRules.updateRules, userController.update);

/* Destroy a specific resource */
//router.delete('/:userId', userController.destroy);

//router.post('/photos', auth.basic , photoValidationRules.createRules, userController.addPhoto);

module.exports = router;