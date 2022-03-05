/**
 * ALbum Validation Rules
 */

 const { body } = require('express-validator');
 const models = require('../models');


 const createRules = [
     body('title').exists().isLength({ min: 3 }).withMessage('Album title required')
 ];

 const updateRules = [
    body('title').optional().isLength({ min: 3 }),

 ];

 const addPhoto = [
    body('photo_id').exists().isInt().withMessage('Type in the photos id to add to the album'),
 ];
 
 module.exports = {
     createRules,
     updateRules,
     addPhoto,
 }
 