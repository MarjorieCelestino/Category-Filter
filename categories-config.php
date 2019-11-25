<?php 
	
	// Default array of categories, subcategories and values
	$categories = array (
	  'Movies' => array (
	    '1.1' => 'Moon',
	    '1.2' => 'The Revenant',
	    '1.3' => 'Bacurau',
	    '1.4' => 'Babadook',
	    '1.5' => 'Test'
	  ), 
	  'Series' => array (
	    '2.1' => 'Its Always Sunny in Philadelphia',
	    '2.2' => 'Dark',
	    '2.3' => 'Fleabag',
	    'Seasons' => array (
	    	'2.4.1' => 'Test',
	    	'2.4.2' => 'Two Seasons',
	    	'Three' => array (
	    		'one',
	    		'test',
	    		'yes' => array (
	    			'test'
	    		)
	    	)
	    )
	  ), 
	  'Directors' => array (
	    '3.1' => 'Wes Anderson',
	    '3.2' => 'Test',
	    '3.3' => 'Taika Waititi',
	    '3.4' => 'Alejandro González',
	  )
	);

//print multidimentional array in nested treeview
$aux = false; //avoid printing first ul because of bootstrap classes
$id = 0; //id of li has to match the for in label
function recursivePrint($array){
	global $aux;
	global $id;

	if($aux){
		echo '<ul class="nested list-group">';
	}

    foreach($array as $key => $value){
    	$id++;

    	
    	//in case its a nested array
    	if(is_array($value)){
    		$aux = true;
    		echo '<li id="'.$key.'" class="parent list-group-item border-0">
    			<input type="checkbox" class="custom-control-input" id="'.$id.'" onclick="verifyCheck(this);">
    			<label class="custom-control-label" for="'.$id.'">
    		';
    		echo $key;
    		echo '</label>';
    		echo '<span class="toggle"><i class="fa fa-angle-down" style="margin-left: 5px;"></i></span>';
    		recursivePrint($value);
    	}else{
    		echo '<li id="'.$key.'" class="list-group-item border-0">
    			<input type="checkbox" class="custom-control-input" id="'.$id.'" onclick="verifyCheck(this);">
    			<label class="custom-control-label" for="'.$id.'">
    		';
    		echo $value;
    		echo '</label>';
    	}
    	echo '</li>';
    }

    if ($aux) {
    	echo '</ul>';
    }
}

?>