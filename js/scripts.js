// Listing pokemons and their features in IIFE format
let pokemonRepository = (function () {
	let pokemonList = [
		{
			name: "Bulbasaur",
			height: 2,
			types: ["grass", "poison"]
		},
		{
			name: "Charmander",
			height: 2,
			types: ["fire"]
		},
		{
			name: "Squirtle",
			height: 1,
			types: ["water"]
		},
		{
			name: "Caterpie",
			height: 1,
			types: ["bug"]
		},
		{
			name: "Weedle",
			height: 1,
			types: ["bug", "poison"]
		}
	]

	// Defining getAll function to return pokemonList
	function getAll () {
		return pokemonList;
	}

	// Defining add function to add to pokemonList
	function add(pokemon) {
		if (typeof pokemon === "object") {
			pokemonList.push(pokemon);
		} else {
			document.write("Must be an object")
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
		button.addEventListener('click', function () {
			showDetails(pokemon.name);
		});
	}

	// Function for click
	function showDetails(pokemon) {
		console.log(pokemon);
	}

	// Returning getAll, add and addListItem functions
	return {
		getAll: getAll,
		add: add,
		addListItem: addListItem
	}

})();

// forEach loop to list all the pokemons on the page
pokemonRepository.getAll().forEach (function(pokemon) {
	pokemonRepository.addListItem(pokemon);
});
	

