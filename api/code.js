
let buscary = document.querySelector("#buscar")
let btnP = document.querySelector("#btnPrev")
let btnN = document.querySelector("#btnNext")

btnP.setAttribute(`data-url-pokemon`, ``)
btnN.setAttribute(`data-url-pokemon`, `https://pokeapi.co/api/v2/pokemon?offset=20&limit=20`)

buscary.addEventListener(`click`, function (e) {
    e.preventDefault();


}

)

btnN.addEventListener(`click`, function (e) {
    let urlPoke = e.target.getAttribute(`data-url-pokemon`)
    if (urlPoke != `null`) {
        listar_pokemon(e.target.dataset.urlPokemon)
    }
}
)

btnP.addEventListener(`click`, function (e) {
    if (e.target.dataset.urlPokemon != `null`) {
        listar_pokemon(e.target.dataset.urlPokemon)
    }
}
)

listar_pokemon()

function listar_pokemon(URL = 'https://pokeapi.co/api/v2/pokemon') {
    let grilla = document.querySelector("#grilla-personajes")
    grilla.innerHTML = ``
    let llamdo = fetch(URL)
    llamdo.then(Promesa => Promesa.json())
        .then(informacion => {
            informacion.results.forEach(pokemon => {
                let urlpokemon = pokemon.url
                let llamarPokomn = fetch(urlpokemon)
                llamarPokomn.then(llammada => llammada.json())
                    .then(infoPokemon => {
                        grilla.innerHTML += `
        <div class="col"> 
    
      
            <div class="card carta">
    
            <div class="fondo">
                <img src="${infoPokemon.sprites.other["official-artwork"].front_default}" class="pokemonImg img-container card-img-top mt-5 p-4" alt="...">
            </div>
    
            <div class="card-body">
                <p class="pokemonNom card-text">${infoPokemon.name}</p>
            </div>
            </div>
         </div>
         `
                    })
            });

            btnP.setAttribute(`data-url-pokemon`, informacion.previous)
            btnN.setAttribute(`data-url-pokemon`, informacion.next)

        })



}
