function send_highscore(score,level){
    var user_id = $('#highscore_user_id').val();
    var user_name = $('#user_name').val();
    if(user_id == null || user_id == ''){
        var flashhtml = "<div class='alert alert-warning'>You have to be logged in to submit a high score.</div>";
        $("#highscore_form").append(flashhtml);
        setTimeout(function(){$('#highscore_form').find('.alert').remove()}, 2000);
    }else if(confirm(user_name+"! do you want to submit your high score?\n Score: "+score+ " Level: "+level)){
        //submit
        $('#highscore_score').val(score);
        $('#highscore_level').val(level);
        $('#new_highscore').submit();
    }
}

function refresh_highscores(){
    var game_id = $("#highscore_game_id").val();
    $.getJSON( "/game_highscores",{ "game_id": game_id}, function( data ) {
        var items = [];
        $.each(data, function(index,value){
            items.push("<tr><td>"+ String(value.score)+"</td><td>"+String(value.level)+"</td><td>"+String(value.user.name) +"</td></tr>");
        });

        var element = items.join('');
        //alert(element);
        $('#highscores_section').find(".highscores_list").empty();
        $('#highscores_section').find(".highscores_list").append(element);

    });
}

function toggle_highscores(){
    if ($('#toggle_highscores').hasClass('show_highscores')){
        $('#toggle_highscores').removeClass('glyphicon-chevron-left');
        $('#toggle_highscores').addClass('glyphicon-chevron-right');
        //$('#toggle_highscores').switchClass('show_highscores','hide_highscores',200);
        $('#toggle_highscores').removeClass('show_highscores');
        $('#toggle_highscores').addClass('hide_highscores');
        $('.rotate-highscores-text').addClass('hidden');
        $('.highscores_table').removeClass('hidden');
    }else{
        $('#toggle_highscores').removeClass('glyphicon-chevron-right');
        $('#toggle_highscores').addClass('glyphicon-chevron-left');
        $('#toggle_highscores').removeClass('hide_highscores');
        $('#toggle_highscores').addClass('show_highscores');
        $('.rotate-highscores-text').removeClass('hidden');
        $('.highscores_table').addClass('hidden');
    }
}