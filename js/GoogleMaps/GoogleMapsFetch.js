var mapOptions;
var map;
var currentMarkerIndex;
var markers = [];
var bounds;
var defaultCoordinatesDetails=new google.maps.LatLng(37.7833, -122.4167);
var defaultZoomLevel=6;

var maximumInfoWindowWidth=500;
var maximumInfoWindowHeight=300;
//We will first specify the shape of map markers

var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
};

function initialize() {

    //We will use bounds to keep map inside given viewport
    //No matter where markers are, map view will always adjust itself
    //To fit to given view port

    bounds = new google.maps.LatLngBounds();

    mapOptions = {
        //Coordinates of San Francisco for convenience
        center: defaultCoordinatesDetails,
        zoom: defaultZoomLevel
    };

    //Initialize new maps with initial options set
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    //This is initial marker highlighting the 'City of San Francisco'

    var marker = new google.maps.Marker({
        position: defaultCoordinatesDetails,
        map: map,
        title: 'City Of San Francisco'
    });

    bounds.extend(defaultCoordinatesDetails);

    //Just show one marker at the beginning when map is first loaded on the screen
    markers.push(marker);
}

function addMarkerOnMap() {

    //<mapCoordinatesAndInfoHolderArray> holds the specific location and specially all movie details
    //We will separate it out and display on the view port

    var currentLocationToMarkOnMap = mapCoordinatesAndInfoHolderArray[currentMarkerIndex];
    var currentMovieCompleteMetadata = currentLocationToMarkOnMap[0];

    //Convert retrieved Latitude and longitudes to Google Maps layLong Object

    var myLatLng = new google.maps.LatLng(currentLocationToMarkOnMap[1], currentLocationToMarkOnMap[2]);

    //Center the map at current coordinates. Map will readjust itself for each pin being plotted on the map

    map.setCenter(myLatLng);


    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        animation: google.maps.Animation.DROP,
        shape: shape,
        title: currentMovieCompleteMetadata['MovieLocations'],
        zIndex: currentLocationToMarkOnMap[3]
    });

    markers.push(marker);

    //Images source from http://findicons.com/

    //Beautiful customization of info window for movie location display

    var contentString = '<div class="movie-content-data"><div class="movie-location"><img src="img/location.png"/>Location : ' + currentMovieCompleteMetadata['MovieLocations'] + '</div><br/>' +
        '<div class="movie-content"><div class="movie-title"><img src="img/movie.png"/>Movie Name : ' + currentMovieCompleteMetadata['MovieTitle'] + '</div><hr class="first"/>' +
        '<div class="movie-lead-actor"><img src="img/star.png"/>Lead Starring : ' + currentMovieCompleteMetadata['MovieFirstActor'] + '</div>' +
        '<div class="movie-fun-facts"><img src="img/trivia.png"/>Trivia : ' + currentMovieCompleteMetadata['MovieFunFacts'] + '</div>' +
        '<div class="movie-release-year"><img src="img/release_year.png"/>Released In : ' + currentMovieCompleteMetadata['MovieReleaseYear'] + '</div><hr class="second"/>' +
        '<div class="movie-production-company"><img src="img/prod_house.png"/>Production House : ' + currentMovieCompleteMetadata['MovieProductionCompany'] + '</div>' +
        '<div class="movie-director"><img src="img/director.png"/>Director : ' + currentMovieCompleteMetadata['MovieDirector'] + '</div>' +
        '<div class="movie-writer"><img src="img/writer.png"/>Writer : ' + currentMovieCompleteMetadata['MovieWriter'] + '</div><hr class="third"/>' +
        '<div class="movie-other-actor"><img src="img/other_actors.png"/>Other Actor : ' + currentMovieCompleteMetadata['MovieSecondActor'] + '</div><hr class="fourth"/></div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: maximumInfoWindowWidth,
        maxHeight:maximumInfoWindowHeight
    });

    //Create bounce animation for marker once user clicks on it
    google.maps.event.addListener(marker, 'click', function () {
        toggleBounce(this);
        infowindow.open(map, this);
    });

    currentMarkerIndex++;
    bounds.extend(myLatLng);
    map.fitBounds(bounds);
}

//To bounce the map pin once user clicks on it

function toggleBounce(marker) {

    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    }
    else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function plotPinsOnMapWithMovieLocationsInformation() {
    currentMarkerIndex = 0;

    for (var i = 0; i < mapCoordinatesAndInfoHolderArray.length; i++) {

        setTimeout(function () {
            addMarkerOnMap();
        }, i * pinDropInterval);

    }
    map.fitBounds(bounds);

}

//Beofre plotting new coordinates make sure we remove all markers from previous mappings
function deleteMarkers() {
    clearMarkers();
    markers = [];
}

function clearMarkers() {
    setAllMap(null);
}

function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

google.maps.event.addDomListener(window, 'load', initialize);