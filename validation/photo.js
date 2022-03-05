/**
 * Photo Validation Rules
 */
 const { body } = require('express-validator');
 const models = require('../models');


 const createRules = [
     body('title').exists().isLength({ min: 3 }),
     body('url').exists().isLength({ min: 1 }).isURL().trim(),
     body('comment').optional().isLength({min: 3 }),
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