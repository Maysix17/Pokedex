const pokemonList = document.getElementById("pokemon-list");

const limit = 600;
const offset = 0;

// Cargar los Pokémon al iniciar
async function loadPokemons() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();

  for (const pokemon of data.results) {
    const pokemonData = await fetch(pokemon.url).then(res => res.json());

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.dataset.name = pokemonData.name;

    const img = document.createElement("img");
    img.src = pokemonData.sprites.front_default;
    img.alt = pokemonData.name;

    const name = document.createElement("p");
    name.textContent = pokemonData.name;

    div.appendChild(img);
    div.appendChild(name);
    pokemonList.appendChild(div);

    // Verificar si ya está registrado
    checkIfRegistered(pokemonData.name, div);

    // Evento de click para registrar 
    div.addEventListener("click", async () => {
      await handleRegister(pokemonData);
      setTimeout(() => {
        window.location.href = `details.html?name=${pokemonData.name}`;
      }, 1500);
    });
  }
}

// Verificar si ya está registrado
async function checkIfRegistered(name, div) {
  try {
    const response = await fetch('http://localhost:3000/api/pokemon/check-name?name=' + name);
    if (!response.ok) return;

    const data = await response.json();

    if (data && data.name === name) {
      div.classList.add("registered");
    }
  } catch (error) {
    console.error("Error al verificar si está registrado:", error);
  }
}

// Registrar en tu API 
async function handleRegister(pokemon) {
  try {
    await fetch('http://localhost:3000/api/pokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        no: pokemon.id,
        name: pokemon.name,
        height: pokemon.height.toString(),
        weight: pokemon.weight.toString(),
        gender: 'unknown',
        category: 'electric',
        ability: pokemon.abilities?.[0]?.ability?.name || 'unknown',
        image: pokemon.sprites.front_default,
      }),
    });
  } catch (error) {
    console.error('Error al registrar:', error);
  }
}

loadPokemons();
