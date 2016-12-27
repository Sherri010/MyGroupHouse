var Handlebars = require('express-handlebars');
var register = function(event,user) {

    var helpers = {
        // put all of your helpers inside this object
        showLinks: function(event,user){
          console.log( user)
          console.log(event.organizer_id)
           if(event.organizer_id.toString() == user.toString())
               {  return "<a href='/events/"+event._id+"/edit'>Edit</a>"; }
        }
    };

    return helpers;
};

// client
if (typeof window !== "undefined") {
    register(Handlebars);
}
// server
else {
    module.exports.register = register;
    module.exports.helpers = register(null);
}
