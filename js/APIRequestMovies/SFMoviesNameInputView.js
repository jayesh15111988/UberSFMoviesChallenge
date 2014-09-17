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
var inputMovieName='';
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

        inputMovieName = $('#input-movie-name').val();





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

var remoteURL='http://www.jayeshkawli.com/SFMovies/SFMoviesStoreInDataBase.php?movieNameInput=';//A&';//'http://ws.audioscrobbler.com/2.0/?method=artist.search&api_key=cef6d600c717ecadfbe965380c9bac8b&format=json&';

var autocompleteRemote = new Backbone.AutocompleteList({

    url: function() { return remoteURL+inputMovieName+'&'+ $.param({ all_suggestions: inputMovieName }); },
    filter: null,
    el: $('#input-movie-name'),
    template: _.template('<p><%= name.replace(new RegExp("(" + inputMovieName + ")", "i") ,"<b>$1</b>") %></p>'),
    delay: 500,
    minLength: 2,
    value: function(model) { return model.get('name') }
}).resultsView.collection.parse = function(resp) {


    console.log("Value is "+inputMovieName);
    //console.log(JSON.stringify(resp.results));
    return resp.all_suggestions;
};