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
            return -1;
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
            plotPinsOnMapWithMovieLocationsInformation();

        },function(error){
            console.log("Error occurred "+error);
        });
}