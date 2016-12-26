var mongoose = require('mongoose');

// User Schema
var EventSchema = mongoose.Schema({
	 organizer: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	date: {
		type: Date
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
  disc:{
    type:String
  }
});

var Event = module.exports = mongoose.model('Event', EventSchema);

var n1 = new Event({organizer:"585abf8475316457ddf9fb5c",email:"farsh@gmail.com",name:"Eve baunch event",disc:"so much fun!"})
n1.save();
