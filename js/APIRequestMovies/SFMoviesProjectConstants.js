/**
 * Created by jayeshkawli on 9/15/14.
 */

var RESTRequestMethods={GET:0,POST:1,PUT:2,DELETET:3};

var HomeServerBaseURL='http://www.jayeshkawli.com';
var HomeServerAPIVersion='SFMovies';
var GoolgeMapsBaseURL="https://maps.googleapis.com/maps/api/geocode/json";
var CurrentCityAndStateCombination="san+fransisco+CA";
var GoogleMapsAuthorizationKey="AIzaSyCES1gYjy3W5pPIDFviPgjVGLvGm1K6bSI";
var remoteMovieNamesRetrievalURL = 'SFMoviesStoreInDataBase.php?movieNameInput=';
//Search event will be fired only when user provided input string has length of at least this value
var autoCompleteFireThreshold=2;

//If there are multiple pins, how much delay should occur between successive pin droppings
var pinDropInterval=1000;
