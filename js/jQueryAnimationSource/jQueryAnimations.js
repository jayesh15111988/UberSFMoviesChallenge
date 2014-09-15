/**
 * Created by jayeshkawli on 9/14/14.
 */
$("#input-movie-name").focus(function(){

    $(this).animate({ "width" : "400px"});
    $("#search-bar-div").css("width","650");
});

$("#input-movie-name").blur(function(){

    $("#search-bar-div").css("width","510");
    $(this).animate({ "width" : "250px"});


});

