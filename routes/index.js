
var express = require('express');
var router = express.Router();


var Event = require('../models/event');

// Get Homepage
router.get('/',  function(req, res){
	res.render('index');
});

router.get('/event-board',ensureAuthenticated,function(req,res){
 console.log("Request by: ",req.user.name);
	Event.find({}, function(err, events) {
				res.render('board',{events:events});
	 });

});

router.post('/events',ensureAuthenticated,function(req,res){
	console.log("Created by: ",req.user.name);
	var newEvent= new Event({
		name:req.body.name,
		organizer:req.user.id,
		date:req.body.date,
    begin:req.body.begin,
		end:req.body.end,
		disc:req.body.disc
	});
	console.log(newEvent)
  newEvent.save(function(err,savedEvent){
		Event.find({}, function(err, events) {
			console.log(events)
				res.render('board',{events:events});
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
