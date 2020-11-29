'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  // please replace this with your hostname / IP Address
  host     : 'localhost',
  // Please replace this with your username
  user     : 'root',
  // Please replace this with your password
  password : 'My@#1234',
  database : 'ctf_library'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;