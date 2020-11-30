'user strict';
var dbConn = require('../config/db.config');
var cookieParser = require('cookie-parser');
// var crypto = require("crypto");
// const id = crypto.randomBytes(20).toString('hex');

var Book = function(book){
    this.book_isbn_number = book.book_isbn_number;
    this.author = book.author;
    this.title = book.title;
    this.book_subject = book.book_subject;
    this.id = book.id;
};

Book.create = function (newBook, result) {    
    dbConn.query("INSERT INTO tblbook set ?", newBook, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(400, err);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};

Book.findById = function (token, result) {
    dbConn.query("Select * from tblbook where id = ? ", token, function (err, res) {           
        if(err) {
            console.log("error: ", err);
            result(400, err);
        }
        else {
            result(null, res);
        }
    });   
};

module.exports= Book;