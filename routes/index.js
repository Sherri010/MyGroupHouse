
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
  newEvent.save(function(err,savedEvent){
		Event.find({}, function(err, events) {
				res.render('board',{events:events,currentUser:req.user});
		 });
	});

});

router.get('/events/:id/edit',ensureAuthenticated,function(req,res){
	var eventToEdit = req.params.id;

Event.findOne({ _id: eventToEdit }, function(err, foundEvent) {
	console.log(foundEvent.date)
	 var date = foundEvent.date;
   var formatedDate = formatDate(date);
   res.render('edit',{event:foundEvent,formatDate:formatedDate});
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
	// save updated todo in db
	foundEvent.save(function(err, savedEvent) {
	     res.redirect('/event-board')
    	});
	});
});

router.delete('/events/:id',ensureAuthenticated,function(req,res){
	var eventToDelete = req.params.id;

	 // find todo in db by id and remove
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
