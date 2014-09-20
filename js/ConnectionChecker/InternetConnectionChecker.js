/**
 * Created by jayeshkawli on 9/18/14.
 */
//We will use this file to keep track of internet connection
//It uses modern APIs which keep listening to Network and will trigger specific events
//After recognizing network state change from online to offline and vice versa

var isWebsiteOnline = window.navigator.onLine;

console.log("Internet connection alive on first website load - "+isWebsiteOnline);

window.addEventListener("offline", function(e) {
    isWebsiteOnline=0;
    showPopForOfflineConnection();
    console.log("This app is in OFFLINE mode");
});

window.addEventListener("online", function(e) {
    isWebsiteOnline=1;
    hidePopAfterOnlineInternetConnection();
    console.log("This app is in ONLINE mode");

});

function hidePopAfterOnlineInternetConnection(){

    $("#input-movie-name").prop('disabled', false);
    $("#search-button").prop('disabled', false);
    $('#internet-connection-status-dialogue').trigger('close');
}

function showPopForOfflineConnection(){

    $("#input-movie-name").prop('disabled', true);
    $("#search-button").prop('disabled', true);
    $(".main-error-message").html("Connection Error");
    $(".main-error-resolution").html(" It seems that your Internet Connection if offline.Please verify and try again later.");
    $(".extra-error-message").html("(This popup will automatically disappear once connection comes back to life)");

    $('#internet-connection-status-dialogue').lightbox_me({
        centered: true,
        overlaySpeed:"slow",
        closeClick:false,
        onLoad: function() {
        }
    });

}