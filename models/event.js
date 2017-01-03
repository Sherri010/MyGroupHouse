var mongoose = require('mongoose');

// User Schema
var EventSchema = mongoose.Schema({
	 organizer_id: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		organizer_name:{
			type:String
		},
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
});
var n1 = new Event({organizer_id:"585abf8475316457ddf9fb5c",organizer_name:"farshmous",date: "2017-01-02",begin:"18",end:"21",name:"Eve baunch event",disc:"so much fun!"})
n1.save();
