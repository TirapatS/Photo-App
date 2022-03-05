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
 
 module.exports = {
     createRules,
     updateRules,
 }
 