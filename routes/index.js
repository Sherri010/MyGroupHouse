
var express = require('express');
var router = express.Router();


var Event = require('../models/event');
var User  = require('../models/user');
// Get Homepage
router.get('/',  function(req, res){
	res.render('index');
});

router.get('/event-board',ensureAuthenticated,function(req,res){
 console.log("Request by: ",req.user._id);
 var currentUser1 = req.user._id;
 var currentUser_name = req.user.name;
	Event.find({}, function(err, events) {
		console.log(currentUser1)
		 res.render('board',{events:events,currentUser:currentUser1, name:currentUser_name});
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
	newEvent.rsvp.push(req.user._id);
  newEvent.save(function(err,savedEvent){
		Event.find({}, function(err, events) {
				res.render('board',{events:events,currentUser:req.user});
		 });
	});

});

router.get('/event/:id',ensureAuthenticated,function(req,res){
  var eventToFind = req.params.id;
	Event.findOne({_id:eventToFind},function(err,foundEvent){
		var date = foundEvent.date;
		var formatedDate = formatDate(date);
		res.render('event',{event:foundEvent,formatDate:formatedDate});
	});
});
router.get('/events/:id/edit',ensureAuthenticated,function(req,res){
	var eventToEdit = req.params.id;
	Event.findOne({ _id: eventToEdit }, function(err, foundEvent) {
		 var date = foundEvent.date;
	   var formatedDate = formatDate(date);
	   res.render('edit',{event:foundEvent,formatDate:formatedDate,currentUser:req.user._id});
	});
});

router.post('/events/:id',ensureAuthenticated, function(req, res){
	var eventToUpdate = req.params.id
	Event.findOne({ _id: eventToUpdate }, function(err, foundEvent) {
		foundEvent.disc = req.body.disc;
   	foundEvent.name = req.body.name;
		foundEvent.start = req.body.start;
		foundEvent.end = req.body.end;
		foundEvent.date = req.body.date;

		foundEvent.save(function(err, savedEvent) {
		     res.redirect('/event-board')
	    	});
		});
});

router.post('/events/:id/rsvp',ensureAuthenticated,function(req,res){
	 var eventToUpdate = req.params.id;
   var eventToGo;
	 Event.findOne({ _id: eventToUpdate }, function(err, foundEvent) {
		 eventToGo = foundEvent;
		 if(foundEvent.rsvp.indexOf(req.user._id) == -1){
		    foundEvent.rsvp.push(req.user._id);
			  User.findOne({_id:req.user._id},function(err,foundUser){
				  foundUser.rsvps.push(eventToGo);
					foundUser.save();
			 });
			 foundEvent.save(function(err, savedEvent) {
						res.json(savedEvent.rsvp.length)
				});
			}
			else {
				res.json("You have already put your name down for this :)")
			}
	  });
});

router.delete('/events/:id',ensureAuthenticated,function(req,res){
	var eventToDelete = req.params.id;
	 Event.findOneAndRemove({ _id: eventToDelete }, function(err, event) {
		  res.json('200');
	 });
});

function formatDate(date){
	var date =  new Date(date);
	var formatedDate =  date.getUTCFullYear()+"-";
	formatedDate += ((date.getUTCMonth() + 1) < 10 )?  "0"+(date.getUTCMonth() + 1):(date.getUTCMonth() + 1);
	formatedDate += "-";
	formatedDate += ((date.getUTCDate()) < 10)?  "0"+(date.getUTCDate()):date.getUTCDate();

	return formatedDate;
}

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
