const express = require('express');
const bodyParser = require('body-parser');


// create express app
const app = express();

// Setup server port
const port = 5345;
// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Require employee routes
const bookRoutes = require('./routes/book.routes')

// using as middleware
app.use('/api/v1/book', bookRoutes)

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });