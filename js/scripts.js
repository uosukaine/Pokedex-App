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
		pokemonList.push(pokemon);
	}

	// Returning getAll and add functions
	return {
		getAll: getAll,
		add: add
	}

})();

// Loop to list all the pokemons on the page
pokemonRepository.getAll().forEach (function(pokemon) {
	document.write("Name: " + pokemon.name + " (Height: " + pokemon.height + ". Types: " + pokemon.types + ".)");
	
	// Conditional text if Pokemon size is over 1.5
	if (pokemon.height > 1.5) {
		document.write("<span class=big_pokemon> - Wow, that's big!</span>");
	}
	document.write("<br>");
});
	

