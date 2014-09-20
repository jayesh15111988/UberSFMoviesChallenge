<?php header('Access-Control-Allow-Origin: *');
error_reporting(E_ALL);

require('db_info.php');
require('SFMoviesConstant.php');
global $dbh;

date_default_timezone_set("America/Indiana/Indianapolis"); 

//This is the name of the input movie passed by the client for which we will retrieve all locations from MySQL database
$movie_name=$_GET['inputMovieName'];


//We do not want to select details of those movies for whom location info does not exist i.e. 'N/A'
$select_movie_locations_statement="select * from SFMoviesDatabase where MovieTitle LIKE ? AND MovieLocations <> 'N/A'";
$select_movie_from_database_query=$dbh->prepare($select_movie_locations_statement);

$select_movie_from_database_query->execute(array($movie_name));

$movie_locations_list_returned_from_database=$select_movie_from_database_query->fetchAll();

//List of all locations returned by server. In case no location is found, 
//<$movie_locations_list_returned_from_database> will be an empty object

echo json_encode(array('all_movie_locations_list' => $movie_locations_list_returned_from_database));

?>