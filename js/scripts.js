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
		//creating container
        let container = document.querySelector('.container-fluid');

        //create row div and add necessary classes
        let row = document.createElement('div');
        row.classList.add('row', 'align-content-center', 'list-group-item');

        //create column div and add necessary classes
        let col = document.createElement('div');
		col.classList.add('col', 'd-flex', 'justify-content-center');

		//create button and add necessary classes and attributes
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-danger', 'btn-block');
        button.setAttribute('type', 'button');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemonModal');

        col.appendChild(button);
        row.appendChild(col);
        container.appendChild(row);

        //show pokemon details when button clicked
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

	// Fetching pokemon details
	function loadDetails(item) {
    	let url = item.detailsUrl;
    	return fetch(url).then(function (response) {
      		return response.json();
    	}).then(function (details) {
      		item.height = details.height;
      		item.types = details.types;
      		item.imageUrl = details.sprites.front_default;
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
    	let modalTitle = document.querySelector('.modal-title');
        let modalBody = document.querySelector('.modal-body');
        while (modalBody.firstChild) {
        	modalBody.removeChild(modalBody.firstChild);
        }
       
        modalTitle.innerText = item.name;

        // Defining height text
        let heightElement = document.createElement('p');
        heightElement.innerText = 'height: ' + item.height;
        let typeArray = item.types.map(function (i) {
            return i.type.name;
		})

        // Defining type text
        let typeElement = document.createElement('p');
        typeElement.innerText = 'type:'
        typeArray.forEach(function (type) {
            typeElement.innerText += ' ' + type;
        });

        // Defining image
        let imageElement = document.createElement('img');
        imageElement.setAttribute('src', item.imageUrl);
        imageElement.setAttribute('alt', 'picture of: ' + item.name);
        imageElement.setAttribute('class', 'image-element');

        // Adding elements to modalBody
        modalBody.appendChild(heightElement);
        modalBody.appendChild(typeElement);
	    modalBody.appendChild(imageElement);

	}

	return {
		getAll: getAll,
		add: add,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showDetails: showDetails,
	}
})();

// Loading data
pokemonRepository.loadList().then(function() {
	// forEach loop to list all the pokemons on the page
  	pokemonRepository.getAll().forEach(function(pokemon){
    	pokemonRepository.addListItem(pokemon);
  	});
});