/**
 * Photo Controller
 */

 const debug = require('debug')('photos:photo_controller.js');
 const { matchedData, validationResult } = require('express-validator');
const { User } = require('../models');
 const models = require('../models');
 
 /**
  * Get all resources
  *
  * GET /
  */
 const index = async (req, res) => {	// DONE 
	 try {
		await req.user.load('photos')
		console.log("the User", req.user)
		res.status(200).send({
			status: 'success',
			data: {
				photos: req.user.related('photos')
			}
		});

	 } catch (error) {
		res.status(422).send({ 
			status: 'fail',
			message: 'You have no photos on your account'
		});
	 }
	 
 }
 
 const show = async (req, res) => { // DONE

	try {
		const wantedPhoto = await new models.Photo({id: req.params.photoId}).fetch()	//	Fetch desired Photo and store it in "wantedPhoto" as an object

		if(!req.params.photoId) {	// Check if /:photoId even exists
			res.status(422).send({
				status: 'fail',
				message: 'Fill in the desired photo ID'
			})
		} else {
			if(req.user.id === wantedPhoto.attributes.user_id) { // Check if wantedPhoto exists in the req.user's photo storage
				res.status(200).send({
					status: 'success',
					data: wantedPhoto
				})
			} else {
				res.status(403).send({
					status: 'fail',
					message: 'No such photo exists in your account'
				})
			}
		}
		
	}	
	catch (error) {
		res.status(401).send({ 
			status: 'fail',
			message: 'Could not find requested photo'
		});
	}

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
	 const userId = req.user.id;

	 try {
		const result = await new models.Photo(validData).save(({user_id: userId}))
		debug("New photo added: %O", result);

		res.status(200).send({
			status: 'success',
			data: result	
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Failed adding photo to user',
		});
	}
 
 /**
  * Update a specific resource
  *
 */
}
 const update = async (req, res) => {
	
	 const photo = await new models.Photo({ id: req.params.photoId }).fetch({ require: false });
	
	 if (!photo) {
		 debug("Photo to update was not found. %o", { id: req.params.photoId });
		 res.status(404).send({
			 status: 'fail',
			 data: 'Photo Not Found',
		 });
		 return;

	} else {
		
		if(req.user.id === photo.attributes.user_id) { // Check if wantedPhoto exists in the req.user's photo storage
			 // check for any validation errors
	 	const errors = validationResult(req);

	 	if (!errors.isEmpty()) {

		 return res.status(422).send({ status: 'fail', data: errors.array() });
	 	}
 
	 // get only the validated data from the request
	 	const validData = matchedData(req);
 
	 try {
		 const updatedPhoto = await photo.save(validData);
		 debug("Updated photo successfully: %O", updatedPhoto);
 
		 res.status(200).send({
			 status: 'success',
			 data: {
				 photo,
			 },
		 });
 
		} catch (error) {
			res.status(500).send({
				status: 'error',
				message: 'Exception thrown in database when updating a photo.',
			});
		}

	} else {
			res.status(404).send({ status: 'fail', message: 'Photo not found' });
		}
	}
		
}
	

 
 module.exports = {
	 index,
	 show,
	 store,
	 update,
}