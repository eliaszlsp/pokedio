
const pokeApi = {}


function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name 
    pokemon.height=pokeDetail.height
    pokemon.weight=pokeDetail.weight
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    const abilities= pokeDetail.abilities.map((typeSlot) => typeSlot.ability.name)
    const [ability] = abilities
    pokemon.abilities=abilities
    pokemon.ability=ability
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
      
    return pokemon
    
}



pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
      
}


pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then(function(response) {
            console.log('Response:', response);
            return response.json();
        })
        .then((jsonBody) => {
            console.log('JSON Body:', jsonBody);
            return jsonBody.results;
        })
        .then((pokemons) => {
            console.log('Pokemons:', pokemons);
            return pokemons.map(pokeApi.getPokemonDetail);
        })
        .then((detailRequests) => {
            console.log('Detail Requests:', detailRequests);
            return Promise.all(detailRequests);
        })
        .then((pokemonsDetails) => {
            console.log('Pokemons Details:', pokemonsDetails);
            return pokemonsDetails;
        });
}


