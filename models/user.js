var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	rsvps:[{type:mongoose.Schema.Types.ObjectId, ref: 'Event'}]
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}



User.remove({}, function(err) {
   console.log('User table clear!')
});

//temp users
var sherri = new User({username:"sherri010",name:"sherri",email:"sherri@gmail.com",password:"asdfgh"})
		User.createUser(sherri, function(err, user){
			if(err) throw err;
			console.log(user);
		});

var farsh = new User({username:"farshmous",name:"farsh mous",email:"farsh@gmail.com",password:"asdfgh"})
		User.createUser(farsh, function(err, user){
			if(err) throw err;
			console.log(user);
		});
