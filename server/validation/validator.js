const {check, validationResult} = require('express-validator');

exports.validateBook = [
  check('book_isbn_number')
  .trim().escape().not().isEmpty().withMessage('Book ISBN can not be empty!').bail()
 .isAlphanumeric().withMessage('Book ISBN must be alphabatic!').bail().isLength({min: 10, max: 12})
 .bail().withMessage('Book ISBN length must be in 10-12 characters'),
 check('author')
 .trim().escape().not().isEmpty().withMessage('Author Name can not be empty!')
 .bail().matches(/^[a-z\s]+$/i).withMessage('Author must be alphanumeric'),
 check('title')
 .trim().escape().not().isEmpty().withMessage('Book Title can not be empty!')
 .bail().matches(/^[a-z\d\s]+$/i).withMessage('Author must be alphanumeric'),
 check('book_subject')
 .trim().escape().not().isEmpty().withMessage('Book Subject can not be empty!')
 .bail().matches(/^[a-z\s]+$/i).withMessage('Author must be alphanumeric'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];