const URL_POKEMONES = "https://pokeapi.co/api/v2/pokemon";

const buscar = document.querySelector("#buscar");
const input = document.querySelector("#myInput");
const btnP = document.querySelector("#btnPrev");
const btnN = document.querySelector("#btnNext");

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
         `;
          });
      });

      btnP.setAttribute(`data-url-pokemon`, informacion.previous);
      btnN.setAttribute(`data-url-pokemon`, informacion.next);
    });
}
