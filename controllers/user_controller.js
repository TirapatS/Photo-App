/**
 * Example Controller
 */
const bcrypt = require('bcrypt');
const debug = require('debug')
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

const getUser = async (req, res) => {
	console.log("the user", req.user)
	res.send({
		status: 'success',
		data: {
			user: req.user,
		}
	});
}

/**
 * Store a new resource
 *
 * POST /
 */
const register = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);
	try{
        validData.password = await bcrypt.hash(validData.password, 10);

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
			data: {
				user,
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
/*
const getPhotos = async (req, res) => {	// Fix so authenticated user can get his/hers photos
	console.log(req.user)

	await req.user.load('photos')

	res.status(200).send({
		status: 'status',
		data: {
			photos: req.user.related('photos')
		}
	});
}

const addPhoto = async (req, res) => {
	 // check for any validation errors
	 const errors = validationResult(req);
	 if (!errors.isEmpty()) {
		 return res.status(422).send({ status: 'fail', data: errors.array() });
	 }
 
	 // get only the validated data from the request
	 const validData = matchedData(req);
 
	 console.log("The validated data:", validData);
	
	 // Create and add photo to the authenticated user
	 try {
		const photo = await new models.Photo(validData).save();
		debug("Created and added new photo successfully: %O", photo);

		res.send({
			status: 'success',
			data: {
				photo,
			},
		});
 
	 } catch (error) {
		 res.status(500).send({
			 status: 'error',
			 message: 'Failed adding photo to user',
		 });
		 throw error;
	 }
}
	const getAlbums = async (req, res) => {
		//const user = await new models.User({id : req.user.id}). fetch({withRelated: ['books']});
	
		// "lazy load" the books-relation
		await req.user.load('albums')
	
		res.status(200).send({
			status: 'status',
			data: {
				books: req.user.related('albums'),
			}
		});
	}
*/
module.exports = {
	getUser,
	register,
	update,
	//getPhotos,
	//addPhoto,
	//getAlbums
}
