const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const widthPlus= document.querySelector(".plus")

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    const weight = (pokemon.weight/10).toString()
    const height = (pokemon.height/10).toString()
   

     
     
    return `
    <li>
    <div class="pokemon grass">
        <div class="header">
            <span class="name">${pokemon.name}r</span>
            <span class="number">${pokemon.number}</span>
        </div>
        <div class="container ">
            <img id="img-pokemon"
            src="${pokemon.photo}"
            alt="${pokemon.name}" srcset="">

            <div class="types">
                <span> types:</span>
                ${pokemon.types.map((type) => `<span class="types ${type}">${type}  </span>`).join('')}
            </div>
        </div>
        <div class="plus">
            <div class="more-add">
                <div class="dimensions">
                    <span>Dimensions:</span>
                    <span>
                         height
                        :
                        ${(height)}m</span>
                    <span>
                    weight:
                        ${(weight)}kg</span>

                </div>
                <div class="skills">
                    <span>abilities:</span>
                    ${pokemon.abilities.map((ability) => `<span >${ability}  </span>`).join('')}  </div>

                </div>

            </div>

        </div>

    </div>
</li>
        
    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
        
    })
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }

   
})


