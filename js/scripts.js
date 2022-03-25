// Listing pokemons and their features
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
];


// Loop to list all the pokemons on the page
pokemonList.forEach (function(pokemon) {
	document.write("Name: " + pokemon.name + " (Height: " + pokemon.height + ". Types: " + pokemon.types + ".)");
	
	// Conditional text if Pokemon size is over 1.5
	if (pokemon.height > 1.5) {
		document.write("<span class=big_pokemon> - Wow, that's big!</span>");
	}
	document.write("<br>");
});
	

