/**
 * Created by jayeshkawli on 9/17/14.
 */

var remoteURL='http://www.jayeshkawli.com/SFMovies/SFMoviesStoreInDataBase.php?movieNameInput=';

var autocompleteRemote = new Backbone.AutocompleteList({

    url: function() { return remoteURL+inputMovieName+'&'+ $.param({ all_suggestions: inputMovieName }); },
    filter: null,
    el: $('#input-movie-name'),
    template: _.template('<p><%= name.replace(new RegExp("(" + inputMovieName + ")", "i") ,"<b>$1</b>") %></p>'),
    delay: 500,
    minLength: 1,
    value: function(model) { return model.get('name') }
}).resultsView.collection.parse = function(resp) {

    return resp.all_suggestions;
};