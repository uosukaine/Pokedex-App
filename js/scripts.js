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

for (let i = 0; i < pokemonList.length; i++) {
	document.write("Name: " + pokemonList[i].name + " (Height: " + pokemonList[i].height + ".");
	document.write(" Types: " + pokemonList[i].types[0]);
	for (let j = 1; j < pokemonList[i]["types"].length; j++) {
		document.write(", " + pokemonList[i].types[j]);
	}
	document.write(".)<br>");
}
