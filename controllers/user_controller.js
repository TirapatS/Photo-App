/**
 * Example Controller
 */
const bcrypt = require('bcrypt');
const debug = require('debug')
const { matchedData, validationResult } = require('express-validator');
//const { User } = require('../models');
const models = require('../models');

/**
 * Get all resources
 *
 * GET /
 */
const index = async (req, res) => {
	const User = await models.User.fetchAll();

	res.send({
		status: 'success',
		data: User,
	});
}

/**
 * Get a specific resource
 *
 * GET /:exampleId
 */
const show = async (req, res) => {
	const User = await new models.User({ id: req.params.User.id })
		.fetch();

	res.send({
		status: 'success',
		data: User,
	});
}

/**
 * Store a new resource
 *
 * POST /
 */
const store = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);
	try{
        validData.password = await bcrypt.hash(validData.password, 10);
		console.log("here is the password",validData.password)

     } catch(error){
        return res.status(500).send({
            status: 'error',
            message: 'Exception thrown when hashing the password',
        })
     }

	try {
		
		const user = await new models.User(validData).save();
		debug("New user created: %O", user);

		res.send({
			status: 'success',
			"data": {
				//Fix so that only "email", "first_name" and "last_name" are shown in the data object.
					user
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new User.',
		});
		throw error;
	}
}

/**
 * Update a specific resource
 *
 * PUT /:exampleId
 */
const update = async (req, res) => {
	const userId = req.params.userId;

	// make sure example exists
	const user = await new models.User({ id: userId }).fetch({ require: false });
	if (!user) {
		debug("Example to update was not found. %o", { id: userId });
		res.status(404).send({
			status: 'fail',
			data: 'User Not Found',
		});
		return;
	}

	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);
	

	try {
		const updatedUser = await user.save(validData);
		debug("Updated example successfully: %O", updatedUser);

		res.send({
			status: 'success',
			data: user,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating a new example.',
		});
		throw error;
	}
}

/**
 * Destroy a specific resource
 *
 * DELETE /:exampleId
 */
const destroy = (req, res) => {
	res.status(400).send({
		status: 'fail',
		message: 'You need to write the code for deleting this resource yourself.',
	});
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}
