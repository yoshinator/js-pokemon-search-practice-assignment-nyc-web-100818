document.addEventListener('DOMContentLoaded', () => {

  const pokeContainer = document.getElementById("pokemon-container")
  const searchBar = document.getElementById("pokemon-search-input")
  console.log(searchBar);
  let pokeData
  let aPoke
  newElement = (element) => document.createElement(element)

  searchBar.addEventListener("keyup", function(event){
    showAllPokemon();
  })

  function fetchAllPokemon(){
    fetch("http://localhost:3000/pokemon", {method: "GET"})
    .then( response => response.json())
    .then( function(data){
      pokeData = data
      // debugger
      showAllPokemon()
    })
  }

  function fetchAPokemon(id, cb){
    fetch(`http://localhost:3000/pokemon/${id}`, {method: "GET"})
    .then( response => response.json())
    .then( function(data){
      cb(data)
    })
  }


  showAllPokemon = () => {
    pokeContainer.innerHTML = ""
    pokeData.forEach(function(poke){
      if (poke.name.includes(searchBar.value)) {
        pokeContainer.innerHTML +=
        `<div class="pokemon-container">
          <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
            <h1 class="center-text">${poke.name}</h1>
              <div style="width:239px;margin:auto">
                <div style="width:96px;margin:auto">
                  <img data-id="${poke.id}" data-action="flip" class="toggle-sprite" src="${poke.sprites.front}">
                </div>
              </div>
          </div>
        </div>`
      }
      })
    clickStates()
  }

    // <img data-id="2" data-action="flip" class="toggle-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png">
  function clickStates() {
    pokeContainer.addEventListener("click", function(event){
      if (event.target.className === 'toggle-sprite'){
        fetchAPokemon(event.target.dataset.id, function(data){
          aPoke = data
          flipPoke(event.target.src, aPoke)
        })
      }
    })
  }

  function flipPoke(imgSrc, poke){
    let toggle = document.querySelector(`[data-id="${poke.id}"]`)
    if (toggle.src === poke.sprites.front){
      console.log('FRONT');
      toggle.src = poke.sprites.back
    }else if(toggle.src === poke.sprites.back){
      console.log('BACK');
      toggle.src = poke.sprites.front
    }
  }

fetchAllPokemon()
})
