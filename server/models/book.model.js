'user strict';
var dbConn = require('../config/db.config');

var Book = function(book){
    this.book_isbn_number = book.book_isbn_number;
    this.author = book.author;
    this.title = book.title;
    this.book_subject = book.book_subject;
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

Book.findAll = function (result) {
    dbConn.query("Select * from tblbook", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(400, err);
        }
        else{
            console.log('book : ', res);  
            result(null, res);
        }
    });   
};

module.exports= Book;