/*
* ================== Check functions ====================
*/

// called whenever a checkbox has it's state changed (checked or unchecked)
const verifyCheck = node => {	
	//show cancel and apply btn 
	document.getElementById('containerBtn').style.display = 'block';
	//node structure li > input,label > li,ul
	const getParentLi = node.parentNode;
	const getChildren = getParentLi.children;

	if (node.checked) {
		checkTheParent(getParentLi, true);
		checkForChild(getChildren, true);
	}else{
		checkTheParent(getParentLi, false);
		checkForChild(getChildren, false);
	}
}

// loop through all nodes to check child nodes in case parent is checked
const checkForChild = (elements, isChecked) => {

	for(let i=0; i<elements.length; i++){	
		// means it has child checkboxes
		if(elements[i].nodeName === 'UL'){
			const childElements = elements[i].children;
			checkForChild(childElements, isChecked);

		}else if(elements[i].nodeName === 'LI'){

			isChecked ? elements[i].firstElementChild.checked = true : elements[i].firstElementChild.checked = false;
			//ul child nodes
			if(elements[i].lastElementChild.nodeName === 'UL'){
				checkForChild(elements[i].lastElementChild.children, isChecked);
			}
		}
	}
}

// verifies if all children are checked or not so parent node changes accordingly
const checkTheParent = (element, isChecked) =>{
	const parentUl = element.parentNode;
	const allLiChildren = parentUl.children;
	const parentLiCheck = element.parentNode.parentNode.firstElementChild;
	let notChecked = 0;

	for(let i=0; i<allLiChildren.length; i++){
		if(allLiChildren[i].firstElementChild.checked === false){ notChecked++; }
	}
	//some are unchecked
	if(notChecked > 0) {
		notChecked<allLiChildren.length ? updateParentNode('partial', parentLiCheck) : updateParentNode('no', parentLiCheck);
	//all are checked
	}else{
		updateParentNode('yes', parentLiCheck);
	}
}

// updates node state
const updateParentNode = (status, node) => {
	switch(status){
		case 'yes':
			node.indeterminate = false;
			node.checked = true;
		break;
		case 'partial':
			node.indeterminate = true;
		break;
		case 'no':
			node.indeterminate = false;
			node.checked = false;
		break;
	}
}

/*
* ================== Search functions ====================
*/

// called when some data in entered in the search field (onkeyup)
const doSearch = searchText => {
	let searchArray;
	const highestNode = document.getElementById('treeview');
	//all highest li nodes
	const childNodes = highestNode.firstElementChild.children;

	//keeps it clean in case of no search or empty
	if (searchText.length == 0) {
        document.getElementById("search").value = '';
        clearSearch(childNodes);
		document.getElementById('backBtn').style.display = "none";
		document.getElementById('no-search').style.display = 'none';
        return;
    } else {
        const xmlhttp = new XMLHttpRequest();
        //function to be executed when the server response is ready
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            	//transform result to js obj
                searchArray = JSON.parse(this.responseText);
                //means it has search result
                if(Array.isArray(searchArray)){
                	//make result visible
                	document.getElementById('backBtn').style.display = "block";
                	showSearchResult(childNodes, searchArray);
                }else{
                	document.getElementById('no-search').innerHTML = searchArray;
                	document.getElementById('no-search').style.display = 'block';
                	clearSearch(childNodes);
                }
            }
        };
        //send the request
        xmlhttp.open("GET", "do-search.php?search=" + searchText, true);
        xmlhttp.send();
    }
}

// change display according to search result
const showSearchResult = (nodes, searchArray) => {

	for(let i=0; i<nodes.length; i++){
		nodes[i].style.display = "none";
		nodes[i].firstElementChild.disabled = true;

		if(nodes[i].classList.contains('parent')){
			const ulChildren = nodes[i].lastElementChild.children;
			showSearchResult(ulChildren, searchArray);
		}else{
			for(let j=0; j<searchArray.length; j++){
				if(nodes[i].id == searchArray[j]){
					nodes[i].style.display = "block";
					nodes[i].firstElementChild.disabled = false;
				}
			}
		}
		auxParentNode(nodes[i]);
	}
}

// checks parent of li element when the display is changed to block
const auxParentNode = element =>{
	const parentUl = element.parentNode;
	const allLiChildren = parentUl.children;
	let showing = 0;

	for(let i=0; i<allLiChildren.length; i++){
		if (allLiChildren[i].style.display == 'block'){ showing++; }
	}

	if(showing>0){
		element.parentNode.parentNode.style.display = 'block';
		element.parentNode.style.display = 'block';
		element.parentNode.classList.toggle('active');
	}else{
		element.parentNode.parentNode.style.display = 'none';
	}
}

// called on onclick of back button
const goBack = element => {
	const highestNode = document.getElementById('treeview');
	const childNodes = highestNode.firstElementChild.children;
	clearSearch(childNodes);
	//hide button afer search
	element.style.display = "none";
	document.getElementById("search").value = '';
	document.getElementById('no-search').innerHTML = '';
	document.getElementById('backBtn').style.display = "none";
}

// changes all nodes and child nodes to display block
const clearSearch = nodes =>{

	for(let i=0; i<nodes.length; i++){
		nodes[i].firstElementChild.disabled = false;
		if(nodes[i].classList.contains('parent')){
			nodes[i].style.display = "block";
			const children = nodes[i].lastElementChild.children;
			clearSearch(children);
		}else{
			nodes[i].style.display = "block";
		}
	}
}

/*
* ================== Apply and Cancel Button functions ====================
*/

//global variable
let selectedIds = [];

// called on onclick of apply button
const applySelection = () => {
	const highestNode = document.getElementById('treeview');
	const checkElements = highestNode.querySelectorAll('input[type="checkbox"]');
	const resultElement = document.getElementById('selected-items');
	let selected = [];
	selectedIds = [];

	//updates array
	getAllSelected(checkElements, selected);

	if(selected.length>0){
		resultElement.innerHTML = selected.join(', ');
	}else{
		resultElement.innerHTML = 'No checked items.';
	}
	//hide cancel and apply btn 
	document.getElementById('containerBtn').style.display = 'none';
}

// get all checked checkboxes
const getAllSelected = (nodes, result) => {

	for(let i=0; i<nodes.length; i++){
		nodes[i].disabled = false;
		//add to array if selected or has child selected
		if (nodes[i].checked || nodes[i].indeterminate){
			//keep ids in array for cancel btn
			selectedIds.push(nodes[i].parentNode.id);

			if(nodes[i].parentNode.classList.contains('parent')){
				result.push(nodes[i].parentNode.id);
				const children = nodes[i].parentNode.lastElementChild.children;
				getAllSelected(children, result);
			}else{
				//get label
				result.push(nodes[i].nextElementSibling.innerHTML);
			}
		}
	}
}

// called on onclick of cancel button (uses global variable)
const cancelSelection = () => {
	const checkElements = document.getElementById('tree-content').querySelectorAll('li');
	const resultElement = document.getElementById('selected-items');
	clearAllChecks();
	
	for(let i=0; i<checkElements.length; i++){
		for(let j=0; j<selectedIds.length; j++){
			if (checkElements[i].id == selectedIds[j]){
				checkElements[i].firstElementChild.checked = true;
			}
		}
	}
	document.getElementById('containerBtn').style.display = 'none';
	resultElement.innerHTML = '';
	console.log(selectedIds);
}

// uncheck all checkboxes
const clearAllChecks = () => {
	const allInputElements = document.getElementById('tree-content').querySelectorAll('input[type="checkbox"]');
	for(let i=0; i<allInputElements.length; i++){
		allInputElements[i].checked = false;
	}
}

