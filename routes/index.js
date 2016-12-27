
var express = require('express');
var router = express.Router();


var Event = require('../models/event');

// Get Homepage
router.get('/',  function(req, res){
	res.render('index');
});

router.get('/event-board',ensureAuthenticated,function(req,res){
 console.log("Request by: ",req.user._id);
 var currentUser1 = req.user._id;
	Event.find({}, function(err, events) {
		console.log(currentUser1)
		 res.render('board',{events:events,currentUser:currentUser1});
	 });

});

router.post('/events',ensureAuthenticated,function(req,res){
	console.log("Created by: ",req.user._id);
	var newEvent= new Event({
		name:req.body.name,
		organizer_id:req.user._id,
		organizer_name:req.user.name,
		date:req.body.date,
    begin:req.body.begin,
		end:req.body.end,
		disc:req.body.disc
	});

  newEvent.save(function(err,savedEvent){
		Event.find({}, function(err, events) {
				res.render('board',{events:events,currentUser:req.user});
		 });
	});

});


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
