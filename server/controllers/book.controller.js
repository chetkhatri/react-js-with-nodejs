'use strict';

const Book = require('../models/book.model');
const id = Book.id;

exports.create = function(req, res) {

    const new_Book = new Book(req.body);

    Book.create(new_Book, function(err, book){
        if(err == 400) {
            res.status(400).json({error: err.toString()})
        } else {
            res.json({error: false, message: "Ticket created successfully", data: book});
        }
    });
};

  exports.findById = function(req, res) {
  Book.findById(req.params.token, function(err, book) {

    if(err == 400) {
      res.status(400).json({ error: err.toString() })
    } else {
      res.json(book);
    }
  })
  };