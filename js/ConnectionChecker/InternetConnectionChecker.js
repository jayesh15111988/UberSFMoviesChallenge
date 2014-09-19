/**
 * Created by jayeshkawli on 9/18/14.
 */
var isWebsiteOnline = window.navigator.onLine;
console.log("Is website online on first load? "+isWebsiteOnline);

if(!isWebsiteOnline){
    showPopForOfflineConnection();
}

window.addEventListener("offline", function(e) {
    isWebsiteOnline=0;

    showPopForOfflineConnection();
    console.log("offline");
})

window.addEventListener("online", function(e) {
    isWebsiteOnline=1;
hidePopAfterOnlineInternetConnection();
    console.log("online");

})

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