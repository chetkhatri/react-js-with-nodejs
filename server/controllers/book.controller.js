'use strict';

const Book = require('../models/book.model');

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

exports.findAll = function(req, res) {
    Book.findAll(function(err, student) {
        if (err)
        res.send(err);
        console.log('res', student);
        res.send(student);
    }); 
  };