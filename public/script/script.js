$(document).ready(function(){
   $('.modal').modal();

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
 });
