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
 const index = async (req, res) => {	
	 try {
		await req.user.load('albums')
		console.log("the User", req.user)
		res.status(200).send({
			status: 'status',
			data:
				req.user.related('albums')
		});

	 } catch (error) {
		res.status(204).send({ 
			status: 'fail',
			message: 'You have no albums on your account'
		});
	 }
	 
 }
 
 const show = async (req, res) => {

	try {
		const wantedAlbum = await new models.Album({id: req.params.albumId}).fetch()	//	Fetch desired Album and store it in "wantedAlbum" as an object

		if(!req.params.albumId) {	
			res.status(400).send({
				status: 'fail',
				message: 'Fill in the desired album ID'
			})
		} else {
			if(req.user.id === wantedAlbum.attributes.user_id) { 
				res.status(200).send({
					status: 'success',
					data: wantedAlbum
				})
			} else {
				res.status(404).send({
					status: 'fail',
					message: 'No such Album exists in your account'
				})
			}
		}
		
	}	
	catch (error) {
		res.status(404).send({ 
			status: 'fail',
			message: 'Could not find requested album'
		});
	}

 }
 
 /**
  * Store a new resource
  *
  * POST /album
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
		const result = await new models.Album(validData).save(({user_id: userId}))
		debug("New album added: %O", result);

		res.send({
			status: 'success',
			data: result	
		});

	} catch (error) {
		res.status(400).send({
			status: 'error',
			message: 'Failed adding album to user',
		});
	}
 
 /**
  * Update a specific resource
  *
 */
}
 const update = async (req, res) => {
	
	 const album = await new models.Album({ id: req.params.albumId }).fetch({ require: false });
	
	 if (!album) {
		 debug("Album to update was not found. %o", { id: req.params.albumId });
		 res.status(401).send({
			 status: 'fail',
			 data: 'Album Not Found',
		 });
		 return;

	} else {
		
		if(req.user.id === album.attributes.user_id) { // Check if it exists in the req.user's account

			 // check for any validation errors
	 	const errors = validationResult(req);

	 	if (!errors.isEmpty()) {

		 return res.status(422).send({ status: 'fail', data: errors.array() });
	 	}
 
	 // get only the validated data from the request
	 	const validData = matchedData(req);
 
	 try {
		 const updatedAlbum = await album.save(validData);
		 debug("Updated photo successfully: %O", updatedAlbum);
 
		 res.send({
			 status: 'success',
			 data: album
             });
 
		} catch (error) {
			res.status(400).send({
				status: 'error',
				message: 'Exception thrown in database when updating a Album.',
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