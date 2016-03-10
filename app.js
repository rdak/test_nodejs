var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

var mongoURI = "mongodb://localhost:27017/test";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err) { console.log(err.message + '~!!!'); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});


app.set('views', './views');
app.set('view engine', 'jade');
// load the cookie-parsing middleware
app.use(cookieParser());


function logErrors(err, req, res, next) {
  console.log(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

var router = require('./routes/router.js');
app.use(express.static('public'));
app.use('/', router);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

