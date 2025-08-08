document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById("pokemon-info");

  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  if (!name) {
    container.innerHTML = "<p>Nombre de Pokémon no especificado.</p>";
    return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(res => res.json())
    .then(pokemon => {
      const heightMeters = pokemon.height / 10; // la altura viene en decímetros
      const weightKg = pokemon.weight / 10;     // el peso viene en hectogramos

      container.innerHTML = `
        <div class="pokemon-card">
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          <h2>${pokemon.name}</h2>
          <p><strong>Altura:</strong> ${heightMeters} m</p>
          <p><strong>Peso:</strong> ${weightKg} kg</p>
          <p><strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
          <p><strong>Habilidades:</strong> ${pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
          
        </div>
      `;
    })
    .catch(err => {
      console.error("Error cargando Pokémon:", err);
      container.innerHTML = "<p>Error al cargar la información del Pokémon.</p>";
    });
});
