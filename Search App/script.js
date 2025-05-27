document.getElementById("search-button").addEventListener("click", async function() {
    const searchInput = document.getElementById("search-input").value.trim().toLowerCase();
    
    if (!searchInput) {
        alert("Please enter a Pokémon name or ID.");
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`);
        if (!response.ok) {
            alert("Pokémon not found");
            return;
        }
        
        const data = await response.json();
        
        document.getElementById("pokemon-name").innerText = data.name.toUpperCase();
        document.getElementById("pokemon-id").innerText = `#${data.id}`;
        document.getElementById("weight").innerText = `Weight: ${data.weight}`;
        document.getElementById("height").innerText = `Height: ${data.height}`;
        document.getElementById("hp").innerText = data.stats[0].base_stat;
        document.getElementById("attack").innerText = data.stats[1].base_stat;
        document.getElementById("defense").innerText = data.stats[2].base_stat;
        document.getElementById("special-attack").innerText = data.stats[3].base_stat;
        document.getElementById("special-defense").innerText = data.stats[4].base_stat;
        document.getElementById("speed").innerText = data.stats[5].base_stat;

        // Türleri temizleyip yeniden ekleyelim
        const typesElement = document.getElementById("types");
        typesElement.innerHTML = "";
        data.types.forEach(typeInfo => {
            const typeSpan = document.createElement("span");
            typeSpan.innerText = typeInfo.type.name.toUpperCase();
            typesElement.appendChild(typeSpan);
        });

        // Pokémon resmini ekleyelim
        document.getElementById("sprite").src = data.sprites.front_default;
        document.getElementById("sprite").alt = data.name;

        document.getElementById("pokemon-info").style.display = "block";

    } catch (error) {
        alert("An error occurred while fetching data.");
        console.error(error);
    }
});