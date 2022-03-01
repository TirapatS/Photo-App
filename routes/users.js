const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const userValidationRules = require('../validation/user');

/* Get all resources */
//router.get('/', userController.index);

/* Get a specific resource */
//router.get('/:userId', userController.show);

/* Register new users */
router.post('/register', userValidationRules.createRules, userController.register);

/* Update a specific resource */
//router.put('/:userId', userValidationRules.updateRules, userController.update);

/* Destroy a specific resource */
//router.delete('/:userId', userController.destroy);

module.exports = router;