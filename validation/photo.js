/**
 * Photo Validation Rules
 */

 const { body } = require('express-validator');
 const models = require('../models');
 
 /**
  * Create Book validation rules
  *
  * Required: title, author_id
  * Optional: isbn, pages
  */
 const createRules = [
     body('title').exists().isLength({ min: 3 }),
     body('url').exists().isLength({ min: 1 }).isURL(),
     body('comment').optional().isLength({min: 3 })
 ];

 const updateRules = [
    body('title').exists().isLength({ min: 3 }),
    body('url').exists().isLength({ min: 1 }),
    body('comment').optional().isLength({min: 3 })
 ];
 
 module.exports = {
     createRules,
     updateRules,
 }