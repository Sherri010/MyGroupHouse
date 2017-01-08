$(document).ready(function(){
   $('.modal').modal();

   //delete's event
   $('#delete_event_id').on('click',function(event){
      event.preventDefault();
      var address= $(this).attr('href')
      $.ajax({
        type:"DELETE",
        url:address,
        success:function(data){
          if(data === '200'){
            window.location.replace("/event-board");
          }
        }
      })
   });

  // rsvp
  $('.rsvp-btn').on('click',function(event){
    event.preventDefault();
    var eventToRsvp = $(event.target);
    var address = eventToRsvp.attr('href');
    $.ajax({
      type:"POST",
      url:address,
      success:function(data){
        eventToRsvp.siblings().html("People going: "+data)
      }
    });
  })

});
