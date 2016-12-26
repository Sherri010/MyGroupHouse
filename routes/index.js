
var express = require('express');
var router = express.Router();


var Event = require('../models/event');

// Get Homepage
router.get('/',  function(req, res){
	res.render('index');
});

router.get('/event-board',ensureAuthenticated,function(req,res){

	Event.find({}, function(err, events) {
	    console.log("event list",events);
				res.render('board',{events:events});
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
