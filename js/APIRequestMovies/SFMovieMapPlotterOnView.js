/**
 * Created by jayeshkawli on 9/17/14.
 */
var collectionOfAllMoviesMetaData=[];
var mapCoordinatesAndInfoHolderArray=[];

function sendRequestToGetListAndPlotAllMapPointOnMapWithMovieName(inputMovieNameValue){
    //TO DO Add code to get all locations and plot all points
    //First after sending request, get rid of all markers on the map
    mapCoordinatesAndInfoHolderArray=[];
    deleteMarkers();

    var destinationURLToGetAllMovieLocations=HomeServerBaseURL+"/"+HomeServerAPIVersion+"/SFMoviesSendMovieLocations.php";

    getPromiseWithURLAndParameters(destinationURLToGetAllMovieLocations,{inputMovieName:inputMovieNameValue}).then(function(returnedLocations) {
        //console.log('Got data! Promise fulfilled.'+JSON.stringify(returnedLocations)+ " final data returne by server ");
        collectionOfAllMoviesMetaData=returnedLocations['all_movie_locations_list'];


        var individualMovieLocationFromDatabase='';

        if(collectionOfAllMoviesMetaData.length>0){
        var promisesCollectionArray=[];

        for(var locationsIndex in collectionOfAllMoviesMetaData){

        //Encoding URL to avoid possible conflict with special character present in the address component

        individualMovieLocationFromDatabase =encodeURIComponent(collectionOfAllMoviesMetaData[locationsIndex]['MovieLocations']);
        promisesCollectionArray.push(getPromiseWithURLAndParameters(GoolgeMapsBaseURL+"?address="+individualMovieLocationFromDatabase+CurrentCityAndStateCombination+"&key="+GoogleMapsAuthorizationKey,[]));
        }



return Promise.all(promisesCollectionArray);
        }
        else{
            //Show error saying that no movie found in the database
            console.log("no moview found for given input name");
            return 0;
        }
    }, function(error) {
        console.log('Promise rejected.');
        //console.log(error.message);
    }).then(function(returnedLocationCoordinates){
         console.log("Length pof result "+returnedLocationCoordinates.length);
         //console.log(JSON.stringify(returnedLocationCoordinates));
            //TO DO plot all coordinates on map
            //We already have all lats and longs so this shouldnt be a problem as such
            //TO DO TO DO
            if(returnedLocationCoordinates)
            {
            for(var locationCoordinatesIndex in returnedLocationCoordinates){



                if(returnedLocationCoordinates[locationCoordinatesIndex]['status']==='OK'){
                var individualCoordinateDetail=returnedLocationCoordinates[locationCoordinatesIndex];
                var locationName = individualCoordinateDetail['results'][0]['formatted_address'];
                var locationDetails =  individualCoordinateDetail['results'][0]['geometry']['location'];
                //We are storing it going by sequence - 'Description dictionary', latitude, longitude and z-index of specific pin
                //Mapped on the given view
                    mapCoordinatesAndInfoHolderArray.push([collectionOfAllMoviesMetaData[locationCoordinatesIndex],locationDetails['lat'],locationDetails['lng'],parseInt(locationCoordinatesIndex+5,10),locationName]);

console.log(JSON.stringify(mapCoordinatesAndInfoHolderArray));
                }
                else{
                    console.log("Error In retrieving location  "+JSON.stringify(collectionOfAllMoviesMetaData[locationCoordinatesIndex]));
                }
            }
            //Now we have all toolyip metadata and coordinates - Send all this data to plot a beautiful graphics on the map
           if(mapCoordinatesAndInfoHolderArray.length>0){
               plotPinsOnMapWithMovieLocationsInformation();
           }
            else{
               //Show some Error message that coordinate is not available
               //Show Error message
               $(".main-error-message").html("No Location Info Found");
               $(".main-error-resolution").html(" Server Could not find locations information for given movie title");
               $(".extra-error-message").html("(Please try again search with different movie name)");


               $('#internet-connection-status-dialogue').lightbox_me({
                   centered: true,
                   overlaySpeed:"fast",
                   closeClick:true
               });

           }
        }
        },function(error){
            console.log("Error occurred "+error);
        });
}