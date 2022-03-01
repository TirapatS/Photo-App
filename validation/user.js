/**
 * User Validation Rules
 */

const { body } = require('express-validator');
const models = require('../models');

/**
 * Create User validation rules
 *
 * 
 */

const createRules = [ 
	// Check if email is valid
	body('email').exists().isEmail().custom(async value => {
		const user = await new models.User({ email: value }).fetch({ require: false });
		if (user) {
			return Promise.reject("Email already exists");
		}
		return Promise.resolve();
	}).isLength({ min: 6 }).withMessage('Email must be at least 6 characters and valid email'),

	body('password').exists().isLength({min:6}).withMessage('Password must be at least 6 characters'),

	body('first_name').exists().isLength({min:2}),
	
	body('last_name').exists().isLength({min:2}),
];

/**
 * Update Example validation rules
 *
 * Required: -
 * Optional: title
 */
const updateRules = [
	// Check if email is valid
	body('email').exists().isEmail().custom(async value => {
		const user = await new models.User({ email: value }).fetch({ require: false });
		if (user) {
			return Promise.reject("Email already exists");
		}
		return Promise.resolve();
	}).isLength({ min: 6 }).withMessage('Email must be at least 6 characters and valid email'),

	body('password').exists().isLength({min:6}).withMessage('Password must be at least 6 characters'),

	body('first_name').exists().isLength({min:2}),
	
	body('last_name').exists().isLength({min:2}),
];

module.exports = {
	createRules,
	updateRules,
}
