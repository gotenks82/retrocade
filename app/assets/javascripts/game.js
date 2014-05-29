function send_highscore(score,level){
    var user = $('#highscore_user_id').val()
    if(confirm(user+"! do you want to submit your high score? Score:"+score+ "Level:"+level)){
        //submit
        $('#highscore_score').val(score);
        $('#highscore_level').val(level);
        $('#new_highscore').submit();
    }
}

function getImgPath(img){
    return $('#game_content_path').val() +"/"+img;
}

function replay(){

}

function send_vote(){
    if($(".new_vote").length!=0){
        $(".new_vote").submit();
    } else if($(".edit_vote").length!=0){
        $(".edit_vote").submit();
    } else{
        var flashhtml = "<div class='alert alert-warning'>This is not the error you're looking for...</div>";
        $('#rating_form').append(flashhtml);
        setTimeout(function(){$('#rating_form').find('.alert').remove()}, 2000);
    }
}