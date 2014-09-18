(function($) {
    var inputMovieName='';
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
            sendRequestToGetListAndPlotAllMapPointOnMapWithMovieName($('#input-movie-name').val());
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

    nameChanged: function(e){
var keyCode= e.keyCode;
        inputMovieName = $('#input-movie-name').val();

        if(keyCode===13){
            //User pressed enter - Send request to server to get list of all locations for given movie name
            //TO DO send request to server - After completion move this code to separate JS file

           sendRequestToGetListAndPlotAllMapPointOnMapWithMovieName(inputMovieName);


        }
        //We don't want this event to fire when key code is up, down or an enter key
        else
        {
        if(keyCode!=40 && keyCode!=38){






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
    }

}
});

var getListOfMoviesFromServer = new moviesListRequest();