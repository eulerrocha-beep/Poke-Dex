// ===== CONFIGURAÇÕES =====
const maxRecords = 151;
let offset = 0;
const limit = 10;

let allPokemons = [];
let filteredPokemons = [];
let showingFavoritesOnly = false;

// ===== DOM =====
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const sortSelect = document.getElementById('sortSelect');
const favoritesBtn = document.getElementById('favoritesBtn');
const themeToggle = document.getElementById('themeToggle');
const modal = document.getElementById('pokemonModal');
const modalClose = document.getElementById('modalClose');
const errorContainer = document.getElementById('errorContainer');

// ===== PREFERÊNCIAS SALVAS =====
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

let savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

// ===== ERRO =====
function showError(message) {
    errorContainer.innerHTML = `<div class="error-message">⚠️ ${message}</div>`;
    setTimeout(() => errorContainer.innerHTML = '', 5000);
}

// ===== CARREGAR POKÉMON =====
function loadPokemonItens(offset, limit) {

    loadMoreButton.disabled = true;
    loadMoreButton.textContent = 'Carregando...';

    pokeApi.getPokemons(offset, limit)
        .then((pokemons) => {

            allPokemons = allPokemons.concat(pokemons);
            applyFiltersAndRender();

            loadMoreButton.disabled = false;
            loadMoreButton.textContent = 'Load More';

        })
        .catch((error) => {

            showError('Erro ao carregar pokémons.');
            console.error(error);

            loadMoreButton.disabled = false;
            loadMoreButton.textContent = 'Load More';
        });
}

// ===== CRIAR POKÉMON =====
function createPokemonElement(pokemon) {

    const isFavorite = savedFavorites.includes(pokemon.number);
    const heartIcon = isFavorite ? '❤️' : '🤍';
    const activeClass = isFavorite ? 'active' : '';

    return `
    <li class="pokemon ${pokemon.type}" data-pokemon-id="${pokemon.number}">
    
        <button class="favorite-btn ${activeClass}"
        onclick="toggleFavorite(event, ${pokemon.number})">
        ${heartIcon}
        </button>

        <span class="number">#${String(pokemon.number).padStart(3, '0')}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map(type =>
                    `<li class="type ${type.toLowerCase()}">${type}</li>`
                ).join('')}
            </ol>

            <img src="${pokemon.photo}" 
            alt="${pokemon.name}"
            onclick="openModal(${pokemon.number})">
        </div>
    </li>
    `;
}

// ===== FILTROS =====
function applyFiltersAndRender() {

    if (showingFavoritesOnly) {
        filteredPokemons = allPokemons.filter(p =>
            savedFavorites.includes(p.number)
        );
    } else {
        filteredPokemons = [...allPokemons];
    }

    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm) {
        filteredPokemons = filteredPokemons.filter(p =>
            p.name.toLowerCase().includes(searchTerm)
        );
    }

    const selectedType = typeFilter.value;

    if (selectedType) {
        filteredPokemons = filteredPokemons.filter(p =>
            p.types.some(t => t.toLowerCase() === selectedType.toLowerCase())
        );
    }

    const sortBy = sortSelect.value;

    if (sortBy === 'name') {
        filteredPokemons.sort((a,b)=>a.name.localeCompare(b.name));
    }
    else if (sortBy === 'type') {
        filteredPokemons.sort((a,b)=>a.type.localeCompare(b.type));
    }
    else {
        filteredPokemons.sort((a,b)=>a.number - b.number);
    }

    pokemonList.innerHTML = filteredPokemons
        .map(createPokemonElement)
        .join('');
}

// ===== FAVORITOS =====
function toggleFavorite(event, pokemonId) {

    event.stopPropagation();

    const index = savedFavorites.indexOf(pokemonId);

    if (index > -1) {
        savedFavorites.splice(index,1);
    } else {
        savedFavorites.push(pokemonId);
    }

    localStorage.setItem('favorites', JSON.stringify(savedFavorites));

    applyFiltersAndRender();
}

// ===== MODAL =====
function openModal(pokemonId) {

    const pokemon = allPokemons.find(p => p.number === pokemonId);

    if (!pokemon) return;

    document.getElementById('modalTitle').textContent = pokemon.name;
    document.getElementById('modalNumber').textContent =
        '#' + String(pokemon.number).padStart(3,'0');

    document.getElementById('modalImage').src = pokemon.photo;
    document.getElementById('modalTypes').textContent = pokemon.types.join(', ');

    if (pokemon.height)
        document.getElementById('modalHeight').textContent = pokemon.height/10 + ' m';

    if (pokemon.weight)
        document.getElementById('modalWeight').textContent = pokemon.weight/10 + ' kg';

    modal.classList.add('show');
}

function closeModal(){
    modal.classList.remove('show');
}

// ===== TEMA =====
function toggleTheme(){

    document.body.classList.toggle('dark-mode');

    const dark = document.body.classList.contains('dark-mode');

    localStorage.setItem('theme', dark ? 'dark':'light');

    themeToggle.textContent = dark ? '☀️':'🌙';
}

// ===== FAVORITOS VIEW =====
function toggleFavoritesView(){

    showingFavoritesOnly = !showingFavoritesOnly;

    applyFiltersAndRender();
}

// ===== SCROLL INFINITO =====
window.addEventListener('scroll',()=>{

    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.body.offsetHeight;

    if(scrollPosition >= pageHeight - 500 &&
       offset + limit < maxRecords &&
       !loadMoreButton.disabled &&
       !showingFavoritesOnly){

        loadMoreButton.click();
    }

});

// ===== EVENTOS =====

loadMoreButton.addEventListener('click',()=>{

    offset += limit;

    if(offset + limit >= maxRecords){

        const newLimit = maxRecords - offset;
        loadPokemonItens(offset,newLimit);

        loadMoreButton.remove();
    }
    else{
        loadPokemonItens(offset,limit);
    }

});

searchInput.addEventListener('input',applyFiltersAndRender);
typeFilter.addEventListener('change',applyFiltersAndRender);
sortSelect.addEventListener('change',applyFiltersAndRender);

favoritesBtn.addEventListener('click',toggleFavoritesView);
themeToggle.addEventListener('click',toggleTheme);

modalClose.addEventListener('click',closeModal);

modal.addEventListener('click',(e)=>{
    if(e.target === modal) closeModal();
});

// ===== INICIALIZAÇÃO =====
pokemonList.classList.add('pokemons');

loadPokemonItens(offset,limit);