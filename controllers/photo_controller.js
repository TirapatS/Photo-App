/**
 * Photo Controller
 */

 const debug = require('debug');
 const { matchedData, validationResult } = require('express-validator');
 const models = require('../models');
 
 /**
  * Get all resources
  *
  * GET /
  */
 const index = async (req, res) => {
	 try {
		const all_user_photos = await new models.Photo({id: req.user.id}).fetch();
		//await req.user.load('users');
		res.status(200).send({
			status: 'status',
			data: all_user_photos
		});

	 } catch (error) {
		res.status(204).send({ 
			status: 'fail',
			message: 'You have no photos on your account'
		});
	 }
	 
 }
 
 const show = async (req, res) => {
	try {
		const req_photo = await new models.Photo({id: req.user.id}).fetch({id: photoId});

		res.status(200).send({
			status: 'status',
			data: {
				Photo: req_photo
			}
		});
	 } catch (error) {
		res.status(422).send({ 
			status: 'fail',
			message: 'Could not find requested photo.'
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
 
	 console.log("The validated data:", validData);

	 // lazy-load book relationship
	 await req.user.load('photos');

	 const photos = req.user.related('photos');
	 try {
		const result = await req.user.photo().attach(validData.user_id)
		debug("Uploaded photo to user: %O", result);

		res.send({
			status: 'success',
			data: {
				result: result,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Failed adding photo to user',
		});
		throw error;
	}
 
 /**
  * Update a specific resource
  *
  * POST /:bookId
 */
}
 const update = async (req, res) => {
	 const photoId = req.params.photoId;
 
	 const photo = await new models.Photo({ id: photoId }).fetch({ require: false });
	 if (!photo) {
		 debug("Photo to update was not found. %o", { id: photoId });
		 res.status(404).send({
			 status: 'fail',
			 data: 'Photo Not Found',
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
		 const updatedPhoto = await photo.save(validData);
		 debug("Updated photo successfully: %O", updatedPhoto);
 
		 res.send({
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
			throw error;
		}
}

 
 module.exports = {
	 index,
	 show,
	 store,
	 update,
 }