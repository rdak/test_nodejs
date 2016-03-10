var express = require('express');
var router = express.Router();

var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

router.get('/', function(req, res){
	  var responseText = 'Hello World!';
        responseText += '<br>Requested at: ' + req.requestTime + '';
    res.send(responseText);
});

router.get('/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});

router.get('/c', [cb0, cb1, cb2]);

module.exports = router;