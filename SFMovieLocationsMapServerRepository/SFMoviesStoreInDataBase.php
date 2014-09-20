<?php

header('Access-Control-Allow-Origin: *');
error_reporting(E_ALL);

require('db_info.php');
require('SFMoviesConstant.php');
global $dbh;
date_default_timezone_set("America/Indiana/Indianapolis");

$curl = curl_init();

//Name of movie passed by the client for which we will send all suggsted movie names using our pre-populated SQL database entries
$movie_name_searched_for = $_GET['movieNameInput'];


//Function to fetch data from server using CURL. This is primarily used to get list of all movies along
//With its metadata from 'https://data.sfgov.org' resource

function getDataWithCurlRequestWithUrl($urlToFetchDataFrom){

    global $curl;
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_URL, $urlToFetchDataFrom);
    return curl_exec($curl);    
}

//Each time data is loaded in the database, we will also store the date and timestamp
//When database was filled with new values last time

function setCurrentTimeStampToFile($has_file_operation_started){
    
    //We are using <hasWriteOperationStarted> to avoid race conditions where sending multiple requests at the same time causes
    //database entries being written more than once. This parameter could be considered as a locking mechanism for file write operation

    $last_updated_database_timestamp = array(
        'database_last_updated' => time(),
        'hasWriteOperationStarted' => $has_file_operation_started
    );
    file_put_contents(SFMoviesDatabaseUpdateStorageFile, json_encode($last_updated_database_timestamp, TRUE));
}

function getLastUpdatedTimestampFromFile(){

    $full_database_update_timestamp_object = json_decode(file_get_contents(SFMoviesDatabaseUpdateStorageFile), true);
    return $full_database_update_timestamp_object['database_last_updated'];
}

function getCurrentWriteUpdateFlagFromFile(){

	//This function will indicate if <SFMoviesDatabaseUpdateStorageFile> is currently being written by other request or not
    $full_database_update_timestamp_object = json_decode(file_get_contents(SFMoviesDatabaseUpdateStorageFile), true);
    if (array_key_exists('hasWriteOperationStarted', $full_database_update_timestamp_object)) {
        return $full_database_update_timestamp_object['hasWriteOperationStarted'];
    }
    return false;
}

//We will remove all past entries from Movie database table before populating it with fresh entries
function truncate_movie_database_table(){
    global $dbh;
    $truncate_table_statement = "TRUNCATE TABLE SFMoviesDatabase";
    $truncate_table_query     = $dbh->prepare($truncate_table_statement);
    $truncate_table_query->execute();
}

function check_if_non_zero_number_of_rows_in_database(){
    
    global $dbh;
    
    $check_number_of_movies_in_database = $dbh->prepare("select count(MovieIndexNumber) from SFMoviesDatabase");
    $check_number_of_movies_in_database->execute();
    
    $result_for_number_movies_in_database = $check_number_of_movies_in_database->fetchColumn();
    return ($result_for_number_movies_in_database > 0);
}

function get_list_of_all_movies_matching_input_movie_name($user_input_movie_name){
    
    global $dbh;
    
    //We will detect a match even if any part of input movie name is matched with database entries
    $parameterzied_search_movie_title = "%" . $user_input_movie_name . "%";
    $get_list_of_all_matching_movie_titles_statement = "select distinct MovieTitle from SFMoviesDatabase where MovieTitle LIKE ? LIMIT 12";
    
    $get_all_matching_movie_title_query = $dbh->prepare($get_list_of_all_matching_movie_titles_statement);
    
    $get_all_matching_movie_title_query->execute(array(
        $parameterzied_search_movie_title
    ));
    
    $all_suggested_movie_titles = $get_all_matching_movie_title_query->fetchAll();
    
    $full_list_of_suggested_movie_titles = array();
    
    foreach ($all_suggested_movie_titles as $individual_selected_movie_title) {
        $full_list_of_suggested_movie_titles[] = array(
            'name' => $individual_selected_movie_title['MovieTitle']
        );
    }
    
    return $full_list_of_suggested_movie_titles;
}

function get_and_store_list_of_all_available_movies_in_database(){
    
    global $dbh;
    
    //We will use this flag to check if file is being written by previous request or not
    $isCurrentWriteInProgress = getCurrentWriteUpdateFlagFromFile();
    
    //True value of <$isCurrentWriteInProgress> variable indicates that file write operation is currently
    //In progress

    if ($isCurrentWriteInProgress === true) {
        return;
    }
    
    //Indicate that database load operation with movie metadata is in progress
    setCurrentTimeStampToFile(true);
    
    
    if (check_if_non_zero_number_of_rows_in_database()) {
        //Truncate table to avoid duplicate entries in the database
        truncate_movie_database_table();
    }
    
    $get_movies_information_url = SFMoviesBaseURL . '/' . SFMoviesAPIVersion . '/yitu-d5am.json?$$app_token=' . SFMoviesRequestAPIToken;
    
    $rest = getDataWithCurlRequestWithUrl($get_movies_information_url);
    
    if ($rest === false) {
        
        throw new Exception('Curl error: ' . curl_error($crl));
        print_r('Curl error: ' . curl_error($curl));
        return;
    }
    
    $list_of_all_movies = json_decode($rest, true);
    
    
    
    $insert_individual_movie_information_query = "INSERT INTO SFMoviesDatabase (MovieTitle,MovieFirstActor,MovieLocations,MovieFunFacts,MovieReleaseYear,
		MovieProductionCompany,MovieDistributor,MovieSecondActor,MovieThirdActor,MovieDirector,MovieWriter) 
	value (?,?,?,?,?,?,?,?,?,?,?)";
    
    $query = $dbh->prepare($insert_individual_movie_information_query);
    
    foreach ($list_of_all_movies as $individuaMovieValue) {
        
        
        $movie_title              = array_key_exists('title', $individuaMovieValue) ? $individuaMovieValue['title'] : "N/A";
        $movie_first_actor        = array_key_exists('actor_1', $individuaMovieValue) ? $individuaMovieValue['actor_1'] : "N/A";
        $movie_locations          = array_key_exists('locations', $individuaMovieValue) ? $individuaMovieValue['locations'] : "N/A";
        $movie_fun_facts          = array_key_exists('fun_facts', $individuaMovieValue) ? $individuaMovieValue['fun_facts'] : "N/A";
        $movie_release_year       = array_key_exists('release_year', $individuaMovieValue) ? $individuaMovieValue['release_year'] : "N/A";
        $movie_production_company = array_key_exists('production_company', $individuaMovieValue) ? $individuaMovieValue['production_company'] : "N/A";
        $movie_distributor        = array_key_exists('distributor', $individuaMovieValue) ? $individuaMovieValue['distributor'] : "N/A";
        $movie_second_actor       = array_key_exists('actor_2', $individuaMovieValue) ? $individuaMovieValue['actor_2'] : "N/A";
        $movie_third_actor        = array_key_exists('actor_3', $individuaMovieValue) ? $individuaMovieValue['actor_3'] : "N/A";
        $movie_director           = array_key_exists('director', $individuaMovieValue) ? $individuaMovieValue['director'] : "N/A";
        $movie_writer             = array_key_exists('writer', $individuaMovieValue) ? $individuaMovieValue['writer'] : "N/A";
        
        
        //Store each movie details in the database
        
        $query->execute(array(
            $movie_title,
            $movie_first_actor,
            $movie_locations,
            $movie_fun_facts,
            $movie_release_year,
            $movie_production_company,
            $movie_distributor,
            $movie_second_actor,
            $movie_third_actor,
            $movie_director,
            $movie_writer
        ));
    }
    
    //Once database is written by current request, set database write operation flag to false
    setCurrentTimeStampToFile(false);
}

//Store only if data is invalidated or number of rows in table is zero
if (!check_if_non_zero_number_of_rows_in_database()) {
    
    get_and_store_list_of_all_available_movies_in_database();
} else {

    //Database entries are stale, populate them again. We will store those only for a week and then
    //Remove all old entries and populate database with new set 
    
    if ((time() - getLastUpdatedTimestampFromFile()) > $number_of_approximate_seconds_in_week) {
        get_and_store_list_of_all_available_movies_in_database();
    }
}

//Now accumulate all parametrrs and spit it back to JS for autocompletion
$list_of_all_matching_movie_titles_output = get_list_of_all_movies_matching_input_movie_name($movie_name_searched_for);


echo json_encode(array(
    'all_suggestions' => $list_of_all_matching_movie_titles_output
));

?>