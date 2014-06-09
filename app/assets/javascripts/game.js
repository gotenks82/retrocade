

function getImgPath(img){
    return $('#game_content_path').val() +"/"+img;
}

function replay(){
    $('#restart_button').click();
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

