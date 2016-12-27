var mongoose = require('mongoose');

// User Schema
var EventSchema = mongoose.Schema({
	 organizer: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	date: {
		type: Date
	},
	begin:{
		type:Number
	},
	end:{
		type:Number
	},
	name: {
		type: String
	},
  disc:{
    type:String
  }
});

var Event = module.exports = mongoose.model('Event', EventSchema);


Event.remove({}, function(err) {
   console.log('Event table clear!')
});;
var n1 = new Event({organizer:"585abf8475316457ddf9fb5c",date: "Jan 20",begin:"18",end:"21",name:"Eve baunch event",disc:"so much fun!"})
n1.save();
