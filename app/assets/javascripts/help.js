
function set_sidebar(){
   var contents = $('#help').find('#contents');
    $('#readme').find('[id]').each(function(){
        contents.append("<li><a href='#"+this.id+"'>"+this.innerHTML+"</a></li>")
      }
  ) ;

}

