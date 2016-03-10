var express = require('express');
var router = express.Router();
var testrouter = require('./test.js');
var userrouter = require('./user.js');

var requestTime = function(req, res, next) {
  	console.log('MainRouter is on! Time: ', Date.now());
  	req.requestTime = Date.now();
	var responseText = 'MainRouter is on!';
    	responseText += '<br>Requested at: ' + req.requestTime + '';
	req.responseText = responseText;
  	next();
}

router.use(requestTime);

router.use('/example', testrouter);
router.use('/user', userrouter);

module.exports = router;