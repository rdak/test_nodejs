var express = require('express');
var router = express.Router();

var userid = function(req, res, next){
    console.log('User : ' + req.params.id);
    next();
}
/*
app.get('/', function (req, res) {
});*/

router.use('/:id', userid);

router.get('/', function(req, res){
    var responseText = 'User list!<br>';
        responseText += req.responseText;
    //res.send(responseText);
    res.render('index', { title: 'Hey', message: 'Hello there!', text : responseText});
});

router.get('/add', function(req, res){
  res.send('Create user');
});

router.get('/:id', function(req, res, next){
  if (req.params.id == 0){
    next('route');
  }
  else if (!isNaN(req.params.id)){
    next();
  }
  else {
    next(req);
  }
}, function(req, res, next){
    res.send('UserID : ' + req.params.id + '<br>' + req.responseText + '<br>');
});

router.get('/:id', function(req, res, next){
  res.send('Super user');
});

module.exports = router;
