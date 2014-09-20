/**
 * Created by jayeshkawli on 9/17/14.
 */

//We will use this array to store metadata for specific movie. This information includes but is not limited to
//Movie name, locations at which it was shot, director, writer, production house etc.

var collectionOfAllMoviesMetaData=[];

//Given each location, we will make request to Google geocoding API to get coordinates.
//We will use this array to hold all those co-ordinate value

var mapCoordinatesAndInfoHolderArray=[];

//This function will be used to send request to server with partial movie name
//Server will then query pre-populated database to retrieve all movies matching given name <inputMovieNameValue>

function sendRequestToGetListAndPlotAllMapPointOnMapWithMovieName(inputMovieNameValue){



    mapCoordinatesAndInfoHolderArray=[];
    //We may have markers from previous request. Before sending request, we will call this function to
    // get rid of all markers on the current map

    deleteMarkers();

    //This is remote URL which will provide autosuggestion data back given the partial or full movie name
    var destinationURLToGetAllMovieLocations=HomeServerBaseURL+"/"+HomeServerAPIVersion+"/SFMoviesSendMovieLocations.php";

    getPromiseWithURLAndParameters(destinationURLToGetAllMovieLocations,{inputMovieName:inputMovieNameValue}).then(function(returnedLocations) {

        //Server will return a object with <all_movie_locations_list> as key and list of all the movie location
        // names in the form of a JSON object

        collectionOfAllMoviesMetaData=returnedLocations['all_movie_locations_list'];



        var individualMovieLocationFromDatabase='';

        if(collectionOfAllMoviesMetaData.length>0){

            console.log("Number of total locations retrieved for the given movie name -> "+collectionOfAllMoviesMetaData.length);

            var promisesCollectionArray=[];

            //For each location we will have to make separate request to Google geo-coding API
            //We will take each URL and create an array of promises for each of this URL

            for(var locationsIndex in collectionOfAllMoviesMetaData){

                //Encoding URL to avoid possible conflict with special character present in the address component such as &

                individualMovieLocationFromDatabase =encodeURIComponent(collectionOfAllMoviesMetaData[locationsIndex]['MovieLocations']);
                promisesCollectionArray.push(getPromiseWithURLAndParameters(GoolgeMapsBaseURL+"?address="+individualMovieLocationFromDatabase+CurrentCityAndStateCombination+"&key="+GoogleMapsAuthorizationKey,[]));
            }



            return Promise.all(promisesCollectionArray);
        }
        else{
            //Show error saying that no location found in the database for given movie name
            console.log("no Locations info found for given input movie name");
            return 0;
        }
    }, function(error) {
        console.log('Promise rejected.');

    }).then(function(returnedLocationCoordinates){

            //Execute this block only if promise has succeeded
            if(returnedLocationCoordinates)
            {
                $("#no-result-error").animate({top:'-44px'});
                for(var locationCoordinatesIndex in returnedLocationCoordinates){



                    if(returnedLocationCoordinates[locationCoordinatesIndex]['status']==='OK'){
                        var individualCoordinateDetail=returnedLocationCoordinates[locationCoordinatesIndex];
                        var locationName = individualCoordinateDetail['results'][0]['formatted_address'];
                        var locationDetails =  individualCoordinateDetail['results'][0]['geometry']['location'];

                        //We are storing it going by sequence - 'Description dictionary', latitude, longitude and z-index of specific pin
                        //Mapped on the given view
                        mapCoordinatesAndInfoHolderArray.push([collectionOfAllMoviesMetaData[locationCoordinatesIndex],locationDetails['lat'],locationDetails['lng'],parseInt(locationCoordinatesIndex+5,10),locationName]);

                    }
                    else{
                        //Somewhere down the line we enountered an error while retrieving Geolocation using Google's
                        //Geocoding APIs. Log this error. In our case, if one prmise fails, it will cause collapse for
                        //All subsequent one and control will eventually reach here

                        console.log("Error In retrieving location with details  "+JSON.stringify(collectionOfAllMoviesMetaData[locationCoordinatesIndex]));
                    }
                }
                //Now we have all information tooltip metadata and coordinates - Send all this data to create a beautiful graphics on the map
                if(mapCoordinatesAndInfoHolderArray.length>0){
                    plotPinsOnMapWithMovieLocationsInformation();
                }

            }
            else{
                $("#no-result-error").animate({top:'0'});
            }
        },function(error){
            console.log("Error occurred in retrieving geo locaiton using Google's Geocoding APIs. Error description is : "+error);
        });
}