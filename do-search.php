<?php
include('categories-config.php');

// get the q parameter from URL
$searchTxt = $_REQUEST["search"];

$searchArray = array();

function searchResponse($array, $search){
	$response = doSearch($array, $search);
	echo $response;
}

//Execute search and returns id's of elements in case they match
function doSearch($array, $search){
	global $searchArray;
	$search = strtolower($search);
	$search = trim($search);
	$len = strlen($search);
	
	foreach ($array as $key => $value) { 

		if(is_array($value)){
			doSearch($value, $search);
		}else{
			$compare = strtolower($value);
			//find the first occurrence of the value on search
			if(stristr($compare,$search)){
				array_push($searchArray, $key);				
			}
		}
	}	
	
	//convert to json obj and pass it to js as response
	$resultado = (empty($searchArray)) ? json_encode('No search result.') : json_encode($searchArray) ;

	return $resultado;
}

searchResponse($categories, $searchTxt);

?>