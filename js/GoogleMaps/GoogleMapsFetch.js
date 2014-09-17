var mapOptions;
var map;

function initialize() {
    mapOptions = {
        center: new google.maps.LatLng(-25.363882,31.044922),
        zoom: 6
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);


    var marker = new google.maps.Marker({

        position: new google.maps.LatLng(-25.363882,31.044922),
        map: map,
        title: 'Hello World!'
    });
}
google.maps.event.addDomListener(window, 'load', initialize);