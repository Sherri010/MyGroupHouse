var mongoose = require('mongoose');

// User Schema
var EventSchema = mongoose.Schema({
	 organizer: {
		type: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	},
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


// var alex = new Event({
//     name: "Alex's dinner"
// });
// alex.save();
