const URL_POKEMONES = "https://pokeapi.co/api/v2/pokemon";

const buscar = document.querySelector("#buscar");
const input = document.querySelector("#myInput");
const btnP = document.querySelector("#btnPrev");
const btnN = document.querySelector("#btnNext");

const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  dark: "#EE99AC",
};

input.addEventListener("input", function (e) {
  if (e.target.value === "") {
    listar_pokemon();
  }
});

const form = document.querySelector("#pokeDex");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  document.querySelector("#spinner").style.display = "block";
  const input = form.querySelector(`input`).value;
  const res = fetch(`${URL_POKEMONES}/${input.toLowerCase()}`);

  res
    .then((Promesa) => {
      return Promesa.json();
    })
    .catch(() => alert("Pokemon no encontrado"))
    .then((infoPokemon) => {
      let grilla = document.querySelector("#grilla-personajes");
      grilla.innerHTML = `
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
         `;
    })
    .finally(() => (document.querySelector("#spinner").style.display = "none"));
});

btnN.addEventListener(`click`, function (e) {
  let urlPoke = e.target.getAttribute(`data-url-pokemon`);
  if (urlPoke != `null`) {
    listar_pokemon(e.target.dataset.urlPokemon);
  }
});

btnP.addEventListener(`click`, function (e) {
  if (e.target.dataset.urlPokemon != `null`) {
    listar_pokemon(e.target.dataset.urlPokemon);
  }
});

listar_pokemon();

function listar_pokemon(urlPokemones = `${URL_POKEMONES}?offset=0&limit=4`) {
  let grilla = document.querySelector("#grilla-personajes");
  grilla.innerHTML = ``;
  let llamado = fetch(urlPokemones);
  llamado
    .then((Promesa) => Promesa.json())
    .then((informacion) => {
      informacion.results.forEach((pokemon) => {
        let urlPokemon = pokemon.url;
        let llamarPokemon = fetch(urlPokemon);
        llamarPokemon
          .then((llamada) => llamada.json())
          .then((infoPokemon) => {
            // value mapping
            const POKEMON_COLOR = typeColors[infoPokemon.types[0].type.name];

            grilla.innerHTML += `
        <div class="col">
            <div class="card carta">


            <div style="background-color: ${POKEMON_COLOR};"  class="fondo">
                <img src="${infoPokemon.sprites.other["official-artwork"].front_default}" class="pokemonImg img-container card-img-top mt-5 p-4" alt="...">
            </div>

            <div class="card-body">
                <p style="color:${POKEMON_COLOR};"  class="pokemonNom card-text">  ${infoPokemon.name} </p>
            </div>
            </div>
         </div>
         `;
          });
      });

      btnP.setAttribute(`data-url-pokemon`, informacion.previous);
      btnN.setAttribute(`data-url-pokemon`, informacion.next);
    });
}
