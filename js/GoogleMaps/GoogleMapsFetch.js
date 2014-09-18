var mapOptions;
var map;

function initialize() {
    mapOptions = {
        center: new google.maps.LatLng(37.7833, -122.4167),
        zoom: 6
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);


    var marker = new google.maps.Marker({

        position: new google.maps.LatLng(37.7833, -122.4167),
        map: map,
        title: 'City Of San Fransisco'
    });
}
google.maps.event.addDomListener(window, 'load', initialize);