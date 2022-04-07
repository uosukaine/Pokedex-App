// Listing pokemons and their features in IIFE format
let pokemonRepository = (function () {
	let modalContainer = document.querySelector("#modal-container");
	let pokemonList = [];
  	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	// Defining getAll function to return pokemonList
	function getAll () {
		return pokemonList;
	}

	// Defining add function to add to pokemonList
	function add(pokemon) {
		if (
			typeof pokemon === "object" && 
			"name" in pokemon && 
			"detailsUrl" in pokemon
		) {
			pokemonList.push(pokemon);
		} else {
			document.write("Pokemon is not correct")
		}
	}

	function addListItem(pokemon) {
		// Creating necessary variables
		let pokemonListCall = document.querySelector(".pokemon-list");
		let listItem = document.createElement("li");
		let button = document.createElement("button");
		
		// Adding format and features to buttons
		button.innerText = pokemon.name;
		button.classList.add("pokemon-button");
		
		// Changing DOM hierarchy
		listItem.appendChild(button);
		pokemonListCall.appendChild(listItem);
		
		// Button event listener on click
		button.addEventListener('click', function (event) {
			showDetails(pokemon);
		});
	}

	// Fetching Pokemon data
	function loadList() {
	    return fetch(apiUrl).then(function (response) {
	      	return response.json();
	    }).then(function (json) {
	      	json.results.forEach(function (item) {
	        	let pokemon = {
	          		name: item.name,
	         		detailsUrl: item.url
	        	};
	        	add(pokemon);
	      	});
	    }).catch(function (e) {
	      	console.error(e);
	    })
	}

	// Loading pokemon details
	function loadDetails(item) {
    	let url = item.detailsUrl;
    	return fetch(url).then(function (response) {
      		return response.json();
    	}).then(function (details) {
     		// Now we add the details to the item
      		item.imageUrl = details.sprites.front_default;
      		item.height = details.height;
      		item.types = details.types;
    	}).catch(function (e) {
      		console.error(e);
    	});
  	}
  	
  	// Showing modal when clicking a pokemon button
  	function showDetails(pokemon) {
  		loadDetails(pokemon).then(function () {
  			showModal(pokemon);
  		});	
  	}

  	function showModal(item) {
  		modalContainer.innerHTML = "";
    	let modal = document.createElement("div");
    	modal.classList.add("modal");
  
  		// Close button on modal
    	let closeButtonElement = document.createElement("button");
	    closeButtonElement.classList.add("modal-close");
	    closeButtonElement.innerText = "X";
	    closeButtonElement.addEventListener("click", hideDetails);
  		
  		// Pokemon name on modal
	    let titleElement = document.createElement("h1");
	    titleElement.innerText = item.name;
	  	
	  	// Pokemon height text on modal
	    let contentElement = document.createElement("p");
	    contentElement.innerText = "height: " + item.height;

	    // Pokemon types text on modal
	    let typesElement = document.createElement("p");
	    if (item.types.length > 0) {
       		let types = "";
       		item.types.forEach(function(i) {
        		console.log(i)
        		types += i.type.name + " "; 
    		});    	
      	typesElement.innerText = "type: " + types;
      	}

      	// Pokemon image on modal
      	let imageElement = document.createElement("img");
      	imageElement.classList.add("image-element");
      	imageElement.src = item.imageUrl;
      	
  	    modal.appendChild(closeButtonElement);
	    modal.appendChild(titleElement);
	    modal.appendChild(contentElement);
	    modal.appendChild(typesElement);
	    modal.appendChild(imageElement);
	    modalContainer.appendChild(modal);
	    
	    modalContainer.classList.add("is-visible");
	}

	let dialogPromiseReject;

  	// Hiding modal
  	function hideDetails() {
    	modalContainer.classList.remove("is-visible");
	}

	// Hiding modal when pressing Escape button
	window.addEventListener("keydown", (e) => {
	    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
	      hideDetails();
	    }
	});
  
  	// Hiding modal when clicking
  	modalContainer.addEventListener("click", (e) => {
    	let target = e.target;
    	if (target === modalContainer) {
      		hideDetails();
    	}
  	});

	// Returning getAll, add and addListItem functions
	return {
		getAll: getAll,
		add: add,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showDetails: showDetails,
		hideDetails: hideDetails
	}
})();

// Loading data
pokemonRepository.loadList().then(function() {
	// forEach loop to list all the pokemons on the page
  	pokemonRepository.getAll().forEach(function(pokemon){
    	pokemonRepository.addListItem(pokemon);
  	});
});
	

