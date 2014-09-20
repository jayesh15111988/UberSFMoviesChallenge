var mapOptions;
var map;
var currentMarkerIndex;
var markers=[];
var bounds;
var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18 , 1],
    type: 'poly'
};


function initialize() {
    bounds = new google.maps.LatLngBounds ();
    mapOptions = {
        //Coordinates of San Francisco for convenience
        center: new google.maps.LatLng(37.7833, -122.4167),
        zoom: 6
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);


    var marker = new google.maps.Marker({

        position: new google.maps.LatLng(37.7833, -122.4167),
        map: map,
        title: 'City Of San Francisco'
    });
    bounds.extend (new google.maps.LatLng(37.7833, -122.4167));
    markers.push(marker);
}

function addMarkerOnMap(){

    var currentLocationToMarkOnMap = mapCoordinatesAndInfoHolderArray[currentMarkerIndex];
    var currentMovieCompleteMetadata=currentLocationToMarkOnMap[0];

    //console.log(JSON.stringify(currentLocationToMarkOnMap));
    var myLatLng = new google.maps.LatLng(currentLocationToMarkOnMap[1], currentLocationToMarkOnMap[2]);

    //Center the map at one of the given coordinates
    map.setCenter(myLatLng);

    //Make sure map fits well in given range of bounds

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        //Optional to customize icon image on screen
        //icon: image,
        animation: google.maps.Animation.DROP,
        shape: shape,
        title: currentMovieCompleteMetadata['MovieLocations'],
        zIndex: currentLocationToMarkOnMap[3]
    });


markers.push(marker);

    var contentString ='<div class="movie-content-data"><div class="movie-location"><img src="img/location.png"/>Location : '+currentMovieCompleteMetadata['MovieLocations']+'</div><br/>'+
        '<div class="movie-content"><div class="movie-title"><img src="img/movie.png"/>Movie Name : '+currentMovieCompleteMetadata['MovieTitle']+'</div><hr class="first"/>'+
        '<div class="movie-lead-actor"><img src="img/star.png"/>Lead Starring : '+currentMovieCompleteMetadata['MovieFirstActor']+'</div>'+
        '<div class="movie-fun-facts"><img src="img/trivia.png"/>Trivia : '+currentMovieCompleteMetadata['MovieFunFacts']+'</div>'+
        '<div class="movie-release-year"><img src="img/release_year.png"/>Released In : '+currentMovieCompleteMetadata['MovieReleaseYear']+'</div><hr class="second"/>'+
        '<div class="movie-production-company"><img src="img/prod_house.png"/>Production House : '+currentMovieCompleteMetadata['MovieProductionCompany']+'</div>'+
        '<div class="movie-director"><img src="img/director.png"/>Director : '+currentMovieCompleteMetadata['MovieDirector']+'</div>'+
        '<div class="movie-writer"><img src="img/writer.png"/>Writer : '+currentMovieCompleteMetadata['MovieWriter']+'</div><hr class="third"/>'+
        '<div class="movie-other-actor"><img src="img/other_actors.png"/>Other Actor : '+currentMovieCompleteMetadata['MovieSecondActor']+'</div><hr class="fourth"/></div>';


    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 500,
        maxHeight: 300
    });


    google.maps.event.addListener(marker, 'click', function(){
        toggleBounce(this);
        infowindow.open(map,this);
    });
    currentMarkerIndex++;
    bounds.extend (myLatLng);
    map.fitBounds(bounds);
}

//To bounce the map pin once clicked upon

function toggleBounce(marker) {

    if (marker.getAnimation() != null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}


function plotPinsOnMapWithMovieLocationsInformation(){
console.log("Plotting now on map");
    currentMarkerIndex=0;

    for (var i = 0; i < mapCoordinatesAndInfoHolderArray.length; i++) {


        setTimeout(function(){addMarkerOnMap()},i*1000);


    }
    map.fitBounds(bounds);

}

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