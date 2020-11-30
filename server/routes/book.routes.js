const express = require('express')

const bodyParser = require('body-parser');

const router = express.Router()
const bookController = require('../controllers/book.controller');
const {validateBook} = require('../validation/validator.js')

// Create a new Book
router.post('/', validateBook, bookController.create);
router.get('/:token', bookController.findById);


module.exports = router