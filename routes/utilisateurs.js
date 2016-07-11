var express = require('express');
var router = express.Router();
var mongoose =  require('mongoose');


mongoose.connect('mongodb://localhost/users');

var user = new mongoose.Schema({
  _id: String,
  email : String,
  prenom : String,
  acif:  Boolean,
  date : { type : Date, default : Date.now }
});

var  group =  new mongoose.Schema({
	_id : String
});

var utilisateurs =  mongoose.model('users', user);

var  groups  = mongoose.model('groups',  group);


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user');
});


router.get('/users', function(req, res, next) {
  
	utilisateurs.find(null, function (err, users) {
	  if (err) { throw err; }
	  
	  console.log(users);
	});
});

router.get('users/:id', function(req, res, next) {
  utilisateurs.findById(req.params.id, function (err, users) {
	  if (err) { throw err; }
	  
	  console.log(users);
	});
});

router.get('/groups', function(req, res, next) {
  groups.find(null, function (err, users) {
	  if (err) { throw err; }
	  
	  console.log(users);
	});

  res.render('group');
});


router.get('/groups/:id', function(req, res, next) {
  groups.findById(req.params.id , function (err, users) {
	  if (err) { throw err; }
	  
	  console.log(users);
	});
});

router.post('/users', function(req, res){
	new utilisateurs({
		_id    : req.body.name ,
		email: req.body.email,
		prenom : req.body.prenom				
	}).save(function(err, doc){
		if(err) res.json(err);
		else    res.send('Successfully inserted user!');
	});
});


router.post('/users/:id', function(req, res){
	utilisateurs.findOneAndUpdate(req.params.id ,function(err, doc){
	    if (err) return res.send(500, { error: err });
	    return res.send("succesfully saved");
	});
});


router.post('/groups', function(req, res){
	new groups({
		_id : req.body.username				
	}).save(function(err, doc){
		if(err) res.json(err);
		else    res.send('Successfully inserted groups !');
	});
});



router.post('/groups/:id', function(req, res){
	groups.findOneAndUpdate(req.params.id , function(err, doc){
	    if (err) return res.send(500, { error: err });
	    return res.send("succesfully saved");
	});
});

module.exports = router;
