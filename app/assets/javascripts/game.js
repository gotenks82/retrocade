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
