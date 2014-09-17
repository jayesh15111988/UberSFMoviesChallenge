(function($) {
    var ListView = Backbone.View.extend({
        el: $('#search-bar-div'),
        events: {
            'click button#search-button': 'sendMovieLocationsRequest'
        },
        initialize: function() {
            _.bindAll(this, 'render', 'sendMovieLocationsRequest');


            this.render();
        },
        //Send Request for locations
        sendMovieLocationsRequest: function() {

            console.log("Value of movie name inputted by user is "+$("#input-movie-name").val());

        }
    });
    var listView = new ListView();
})(jQuery);

//This is to keep track of whatever entered in the input movie name field

var moviesListRequest = Backbone.View.extend({

    el: $('#search-bar-div'),

    initialize: function() {
        _.bindAll(this,'render','nameChanged');
        this.render();

    },

    events: {
        "keyup .user-input" : "nameChanged"
    },

    nameChanged: function(){

        var inputMovieName = $('#input-movie-name').val();





        //sendRequestToServerWithRequestAndMethodParameters(SFMoviesBaseURL,SFMoviesAPIVersion,'yitu-d5am.json?$$app_token='+SFMoviesRequestAPIToken,RESTRequestMethods.GET,[],function(serverResponse){

        //var JSONConvertedServerResponse=serverResponse.toJSON();
            //Send another request to PHP page to store all these movie names persistently along with other metadata
            sendRequestToServerWithRequestAndMethodParameters(HomeServerBaseURL,HomeServerAPIVersion,'SFMoviesStoreInDataBase.php?movieNameInput='+inputMovieName,RESTRequestMethods.GET,'',function(successResponse){
               console.log("Success response"+successResponse);
            },function(errorResponse){
                console.log("Dumb Response"+errorResponse);
            });


        //$('.nameText').html(newName);
    }

});

var getListOfMoviesFromServer = new moviesListRequest();
