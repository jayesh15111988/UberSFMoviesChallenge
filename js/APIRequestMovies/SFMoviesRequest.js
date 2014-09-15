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