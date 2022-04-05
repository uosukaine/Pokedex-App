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
  		console.log(pokemon);
  		pokemonRepository.loadDetails(pokemon).then(function (title, text) {
  		
	  		modalContainer.innerHTML = "";
	    	let modal = document.createElement("div");
	    	modal.classList.add("modal");
	  
	    	let closeButtonElement = document.createElement("button");
		    closeButtonElement.classList.add("modal-close");
		    closeButtonElement.innerText = "X";
		    closeButtonElement.addEventListener("click", hideDetails);
	  
		    let titleElement = document.createElement("h1");
		    titleElement.innerText = title;
		  
		    let contentElement = document.createElement("p");
		    contentElement.innerText = text;
	  
		    modal.appendChild(closeButtonElement);
		    modal.appendChild(titleElement);
		    modal.appendChild(contentElement);
		    modalContainer.appendChild(modal);
		    
		    modalContainer.classList.add("is-visible");
		});
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
	

