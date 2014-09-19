/**
 * Created by jayeshkawli on 9/18/14.
 */
var isWebsiteOnline = window.navigator.onLine;
console.log("Is website online on first load? "+isWebsiteOnline);

if(!isWebsiteOnline){
    showPopForOfflineConnection();
}

window.addEventListener("offline", function(e) {

    showPopForOfflineConnection();
    console.log("offline");
})

window.addEventListener("online", function(e) {
hidePopAfterOnlineInternetConnection();
    console.log("online");

})

function hidePopAfterOnlineInternetConnection(){
    $('#internet-connection-status-dialogue').trigger('close');
}

function showPopForOfflineConnection(){
    $('#internet-connection-status-dialogue').lightbox_me({
        centered: true,
        overlaySpeed:"slow",
        closeClick:false,
        onLoad: function() {

        }
    });

}