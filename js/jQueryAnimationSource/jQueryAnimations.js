/**
 * Created by jayeshkawli on 9/14/14.
 */
$("#input-movie-name").focus(function(){

    $(this).animate({ "width" : "275px"});
    $("#search-bar-div").css("width","385");
});

$("#input-movie-name").blur(function(){


    $(this).animate({ "width" : "200px"});
    $("#search-bar-div").css("width","400");


});

