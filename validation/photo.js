/**
 * Photo Validation Rules
 */
 const auth = require('../middlewares/auth');

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
     body('url').exists().isLength({ min: 1 }).isURL().trim(),
     body('comment').optional().isLength({min: 3 }),
     body('user_id')
 ];

 const updateRules = [
    body('title').optional().isLength({ min: 3 }),
    body('url').optional().isLength({ min: 1 }).isURL().trim(),
    body('comment').optional().isLength({min: 3 })
 ];
 
 module.exports = {
     createRules,
     updateRules,
 }