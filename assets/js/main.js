/* =====================================================
   POKÉDEX - ARQUIVO PRINCIPAL (main.js)
   =====================================================
   
   Este é o "cérebro" da Pokédex. Aqui acontece toda a lógica:
   - Buscar pokémons da API
   - Filtrar e ordenar
   - Guardar favoritos
   - Alternar temas
   
   PARA INICIANTES: Estude este arquivo de cima para baixo.
   Cada seção está bem comentada.
   ===================================================== */

// =====================================================
// PARTE 1: VARIÁVEIS GLOBAIS (dados que usamos sempre)
// =====================================================

// Máximo de pokémons na Geração 1
// const = não pode mudar depois (constante)
const maxRecords = 151;

// Controla qual pokémon carregar a seguir (começa em 0)
// let = pode mudar durante a execução
let offset = 0;

// Quantos pokémons carregar de uma vez
const limit = 10;

// Array que armazena TODOS os pokémons já carregados da API
// Conforme clica "Load More", mais são adicionados
let allPokemons = [];

// Array com os pokémons que estão sendo mostrados NA TELA
// Este array muda quando aplica filtros ou busca
let filteredPokemons = [];

// Flag (true/false) para saber se estamos mostrando só favoritos
let showingFavoritesOnly = false;

// =====================================================
// PARTE 2: SELETORES DO DOM (pegando elementos HTML)
// =====================================================
// DOM = Document Object Model (a estrutura HTML da página)
// Aqui pegamos referências aos elementos HTML para manipular

// Lista (ol) onde os pokémons serão mostrados
const pokemonList = document.getElementById('pokemonList');

// Botão "Load More" para carregar mais pokémons
const loadMoreButton = document.getElementById('loadMoreButton');

// Campo de entrada para buscar pokémons
const searchInput = document.getElementById('searchInput');

// Dropdown para filtrar por tipo
const typeFilter = document.getElementById('typeFilter');

// Dropdown para ordenar (por nome, tipo, número)
const sortSelect = document.getElementById('sortSelect');

// Botão para mostrar/esconder favoritos
const favoritesBtn = document.getElementById('favoritesBtn');

// Botão para alternar tema claro/escuro
const themeToggle = document.getElementById('themeToggle');

// Div que é o modal (janela com detalhes)
const modal = document.getElementById('pokemonModal');

// Botão X para fechar o modal
const modalClose = document.getElementById('modalClose');

// Container para mostrar erros
const errorContainer = document.getElementById('errorContainer');

// =====================================================
// PARTE 3: CARREGAR PREFERÊNCIAS SALVAS DO USUÁRIO
// =====================================================
// Quando a página abre, restauramos as escolhas do usuário

// localStorage = pequeno banco de dados no navegador
// Busca o tema salvo. Se não encontrar, usa 'light' (claro)
const savedTheme = localStorage.getItem('theme') || 'light';

// Se o usuário tinha tema escuro, ativa agora
if (savedTheme === 'dark') {
    // classList.add() adiciona uma classe CSS
    document.body.classList.add('dark-mode');
    // Muda o ícone do botão para sol
    themeToggle.textContent = '☀️';
}

// Array com IDs dos pokémons favoritados pelo usuário
// JSON.parse() converte texto JSON em array JavaScript
let savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

// =====================================================
// PARTE 4: FUNÇÃO - MOSTRAR ERROS
// =====================================================
// Uma função é um bloco de código reutilizável
// Esta mostra uma mensagem de erro por 5 segundos

function showError(message) {
    // Template literals (com ` `) permitem inserir variáveis com ${}
    // Cria HTML com a mensagem e adiciona à página
    errorContainer.innerHTML = `<div class="error-message">⚠️ ${message}</div>`;
    
    // setTimeout executa uma ação depois de um tempo (5000 ms = 5 segundos)
    // A arrow function () => {} é uma forma moderna de escrever functions
    setTimeout(() => errorContainer.innerHTML = '', 5000);
}

// =====================================================
// PARTE 5: FUNÇÃO - CARREGAR POKÉMONS DA API
// =====================================================
// Esta função busca pokémons da PokeAPI

function loadPokemonItens(offset, limit) {

    // Desabilita o botão enquanto carrega (evita múltiplos cliques)
    loadMoreButton.disabled = true;
    // Muda o texto para avisar que está carregando
    loadMoreButton.textContent = 'Carregando...';

    // pokeApi.getPokemons() está em poke-api.js
    // Retorna uma Promise (promessa de dados no futuro)
    // .then() executa quando os dados chegam com sucesso
    pokeApi.getPokemons(offset, limit)
        .then((pokemons) => {
            // concat junta um array com outro
            // Aqui adicionamos novos pokémons aos já carregados
            allPokemons = allPokemons.concat(pokemons);
            
            // Aplica filtros e mostra na tela
            applyFiltersAndRender();

            // Reabilita o botão para o usuário clicar de novo
            loadMoreButton.disabled = false;
            // Restaura o texto original
            loadMoreButton.textContent = 'Load More';

        })
        // .catch() executa se houver erro na requisição
        .catch((error) => {
            // Mostra mensagem de erro
            showError('Erro ao carregar pokémons.');
            // console.error imprime o erro no console (F12)
            // Útil para debugar (encontrar erros)
            console.error(error);

            // Reabilita botão mesmo com erro
            loadMoreButton.disabled = false;
            loadMoreButton.textContent = 'Load More';
        });
}

// =====================================================
// PARTE 6: FUNÇÃO - CRIAR ELEMENTO POKÉMON (HTML)
// =====================================================
// Cria o código HTML para mostrar UM pokémon na listagem

function createPokemonElement(pokemon) {

    // Verifica se este pokémon está nos favoritos
    // .includes() retorna true/false se encontra
    const isFavorite = savedFavorites.includes(pokemon.number);
    
    // Escolhe qual ícone de coração mostrar
    // Ternário (? :) é uma forma curta de if/else
    const heartIcon = isFavorite ? '❤️' : '🤍';
    
    // Se é favorito, adiciona classe 'active' para estilo diferente
    const activeClass = isFavorite ? 'active' : '';

    // Template literal com ` ` permite quebras de linha e ${variáveis}
    // Retorna uma string HTML pronta para inserir na página
    return `
    <li class="pokemon ${pokemon.type}" data-pokemon-id="${pokemon.number}">
    
        <!-- Botão de favorito com onclick que executa toggleFavorite -->
        <button class="favorite-btn ${activeClass}"
        onclick="toggleFavorite(event, ${pokemon.number})">
        ${heartIcon}
        </button>

        <!-- Número formatado: "1" vira "001" -->
        <span class="number">#${String(pokemon.number).padStart(3, '0')}</span>
        
        <!-- Nome do pokémon -->
        <span class="name">${pokemon.name}</span>

        <!-- Seção com tipos e imagem -->
        <div class="detail">
            <ol class="types">
                <!-- .map() transforma cada tipo em um <li> -->
                <!-- .join('') junta tudo sem separador -->
                ${pokemon.types.map(type =>
                    `<li class="type ${type.toLowerCase()}">${type}</li>`
                ).join('')}
            </ol>

            <!-- Imagem que, ao clicar, abre o modal -->
            <img src="${pokemon.photo}" 
            alt="${pokemon.name}"
            onclick="openModal(${pokemon.number})">
        </div>
    </li>
    `;
}

// =====================================================
// PARTE 7: FUNÇÃO - APLICAR FILTROS E MOSTRAR RESULTADOS
// =====================================================
// Uma das funções MAIS IMPORTANTES
// Aplica todos os filtros e renderiza o resultado na tela

function applyFiltersAndRender() {

    // ========== PASSO 1: Filtro de Favoritos ==========
    
    if (showingFavoritesOnly) {
        // Se o usuário quer só favoritos, filtra
        // .filter() cria novo array com apenas os elementos que passam no teste
        // p => é uma arrow function, p é cada pokémon
        filteredPokemons = allPokemons.filter(p =>
            savedFavorites.includes(p.number)
        );
    } else {
        // [...allPokemons] cria uma CÓPIA do array (não usa o original)
        // Spread operator ... "espalha" os elementos
        filteredPokemons = [...allPokemons];
    }

    // ========== PASSO 2: Filtro de Busca (por nome) ==========
    
    // .toLowerCase() converte para minúsculas
    // Busca case-insensitive: "Pikachu" ou "pikachu" funcionam
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm) {
        // Filtra para manter apenas pokémons que contêm o texto digitado
        filteredPokemons = filteredPokemons.filter(p =>
            p.name.toLowerCase().includes(searchTerm)
        );
    }

    // ========== PASSO 3: Filtro de Tipo ==========
    
    const selectedType = typeFilter.value;

    if (selectedType) {
        // Filtra para manter apenas pokémons que têm este tipo
        // .some() retorna true se pelo menos um tipo corresponde
        filteredPokemons = filteredPokemons.filter(p =>
            p.types.some(t => t.toLowerCase() === selectedType.toLowerCase())
        );
    }

    // ========== PASSO 4: Ordenação ==========
    
    const sortBy = sortSelect.value;

    if (sortBy === 'name') {
        // Ordena alfabeticamente por nome
        // .localeCompare() compara strings respeitando acentos
        filteredPokemons.sort((a,b)=>a.name.localeCompare(b.name));
    }
    else if (sortBy === 'type') {
        // Ordena por tipo
        filteredPokemons.sort((a,b)=>a.type.localeCompare(b.type));
    }
    else {
        // Ordena por número (padrão)
        // Números não precisam de localeCompare, subtração funciona
        filteredPokemons.sort((a,b)=>a.number - b.number);
    }

    // ========== PASSO 5: Renderizar na tela ==========
    
    // .map() transforma cada pokémon em HTML
    // .join('') junta todos os HTMLs em uma string
    pokemonList.innerHTML = filteredPokemons
        .map(createPokemonElement)
        .join('');
}

// =====================================================
// PARTE 8: FUNÇÃO - ALTERNAR FAVORITO
// =====================================================
// Adiciona ou remove um pokémon dos favoritos

function toggleFavorite(event, pokemonId) {

    // event.stopPropagation() para de "borbulhar" o evento
    // Impede que o clique no botão chegue até o elemento pai
    event.stopPropagation();

    // .indexOf() retorna a posição no array ou -1 se não encontrar
    const index = savedFavorites.indexOf(pokemonId);

    if (index > -1) {
        // Se encontrou (index >= 0), remove do array
        // .splice(posição, quantos remover) remove elementos
        savedFavorites.splice(index,1);
    } else {
        // Se não encontrou, adiciona ao final do array
        // .push() adiciona um elemento no final
        savedFavorites.push(pokemonId);
    }

    // Salva no localStorage (dados persistem ao fechar a aba)
    // JSON.stringify() converte array em texto
    localStorage.setItem('favorites', JSON.stringify(savedFavorites));

    // Renderiza novamente para mostrar o coração atualizado
    applyFiltersAndRender();
}

// =====================================================
// PARTE 9: FUNÇÕES - MODAL (detalhes do pokémon)
// =====================================================
// Modal = janela que aparece com informações

function openModal(pokemonId) {

    // .find() retorna o PRIMEIRO elemento que passa no teste
    // p => p.number === pokemonId testa se o número corresponde
    const pokemon = allPokemons.find(p => p.number === pokemonId);

    // Se não encontrou, sai da função (retorna undefined)
    if (!pokemon) return;

    // Preenche cada campo do modal com dados do pokémon
    
    // Nome na parte superior do modal
    document.getElementById('modalTitle').textContent = pokemon.name;
    
    // Número formatado com zeros à esquerda
    document.getElementById('modalNumber').textContent =
        '#' + String(pokemon.number).padStart(3,'0');

    // Imagem grande do pokémon
    document.getElementById('modalImage').src = pokemon.photo;
    
    // Tipos separados por vírgula
    // .join(', ') junta array em string com separador
    document.getElementById('modalTypes').textContent = pokemon.types.join(', ');

    // Altura: API retorna em decímetros, dividimos por 10 para metros
    // if (pokemon.height) verifica se existe antes de usar
    if (pokemon.height)
        document.getElementById('modalHeight').textContent = pokemon.height/10 + ' m';

    // Peso: mesma coisa (decímetros para quilogramas)
    if (pokemon.weight)
        document.getElementById('modalWeight').textContent = pokemon.weight/10 + ' kg';

    // Mostra o modal adicionando a classe 'show'
    // CSS controla o display (show = visible, sem show = hidden)
    modal.classList.add('show');
}

// Função para fechar o modal
function closeModal(){
    // Remove a classe 'show' que torna o modal visível
    modal.classList.remove('show');
}

// =====================================================
// PARTE 10: FUNÇÃO - ALTERNAR TEMA (claro/escuro)
// =====================================================
// Muda entre modo claro e escuro

function toggleTheme(){

    // .toggle() adiciona a classe se não tiver, ou remove se tiver
    // É como um interruptor - liga/desliga
    document.body.classList.toggle('dark-mode');

    // Verifica qual é o estado agora
    // .contains() retorna true/false se a classe existe
    const dark = document.body.classList.contains('dark-mode');

    // Salva a preferência para quando voltar à página
    // Ternário (? :) escolhe 'dark' ou 'light'
    localStorage.setItem('theme', dark ? 'dark':'light');

    // Muda o ícone do botão
    // Se é dark mode, mostra sol (☀️). Senão, mostra lua (🌙)
    themeToggle.textContent = dark ? '☀️':'🌙';
}

// =====================================================
// PARTE 11: FUNÇÃO - ALTERNAR VISUALIZAÇÃO DE FAVORITOS
// =====================================================
// Mostra todos os pokémons ou apenas os favoritados

function toggleFavoritesView(){

    // ! (NOT) inverte o valor
    // true vira false, false vira true
    showingFavoritesOnly = !showingFavoritesOnly;

    // Aplica o filtro e mostra o resultado
    applyFiltersAndRender();
}

// =====================================================
// PARTE 12: SCROLL INFINITO
// =====================================================
// Carrega mais pokémons automaticamente ao fazer scroll

// addEventListener = "ouve" um evento (aqui, scroll)
// Quando o evento acontece, executa a função
window.addEventListener('scroll',()=>{

    // window.innerHeight = altura visível da janela
    // window.scrollY = quanto scrollou para baixo
    // Somadas = posição do fundo da tela
    const scrollPosition = window.innerHeight + window.scrollY;
    
    // Altura total da página
    const pageHeight = document.body.offsetHeight;

    // Se chegou perto do final da página
    // E ainda há pokémons para carregar
    // E o botão não está em processo de carregamento
    // E não estamos só mostrando favoritos
    if(scrollPosition >= pageHeight - 500 &&
       offset + limit < maxRecords &&
       !loadMoreButton.disabled &&
       !showingFavoritesOnly){

        // Simula um clique no botão "Load More"
        // Carrega mais pokémons automaticamente
        loadMoreButton.click();
    }

});

// =====================================================
// PARTE 13: EVENT LISTENERS (ouvintes de eventos)
// =====================================================
// Listeners = "escutadores"
// Quando algo acontece (clique, digitação, etc),
// a função associada é executada

// ===== Evento: Clique no botão "Load More" =====
loadMoreButton.addEventListener('click',()=>{

    // Aumenta o offset para trazer próximos pokémons
    offset += limit;

    // Verifica se chegou ao máximo
    if(offset + limit >= maxRecords){
        // Calcula quantos faltam até 151
        const newLimit = maxRecords - offset;
        // Carrega os últimos pokémons
        loadPokemonItens(offset,newLimit);

        // Remove o botão da página (não é mais necessário)
        // .remove() deleta o elemento do DOM
        loadMoreButton.remove();
    }
    else{
        // Se não é o último lote, carrega 10 pokémons normalmente
        loadPokemonItens(offset,limit);
    }

});

// ===== Evento: Digitação no campo de busca =====
// Conforme o usuário digita, filtra em tempo real
searchInput.addEventListener('input',applyFiltersAndRender);

// ===== Evento: Mudança no filtro de tipo =====
// Quando seleciona um tipo no dropdown, filtra
typeFilter.addEventListener('change',applyFiltersAndRender);

// ===== Evento: Mudança na ordenação =====
// Quando muda a forma de ordenar, reaplica
sortSelect.addEventListener('change',applyFiltersAndRender);

// ===== Evento: Clique no botão de favoritos =====
// Mostra/oculta apenas os pokémons favoritados
favoritesBtn.addEventListener('click',toggleFavoritesView);

// ===== Evento: Clique no botão de tema =====
// Alterna entre claro e escuro
themeToggle.addEventListener('click',toggleTheme);

// ===== Evento: Clique no X do modal =====
// Fecha a janela de detalhes
modalClose.addEventListener('click',closeModal);

// ===== Evento: Clique no modal (fundo) =====
// Se clicar no fundo (não no conteúdo), fecha
modal.addEventListener('click',(e)=>{
    // e.target = exatamente o que foi clicado
    // Se foi o modal (fundo), fecha
    if(e.target === modal) closeModal();
});

// =====================================================
// PARTE 14: INICIALIZAÇÃO (código que executa ao carregar)
// =====================================================

// Adiciona a classe 'pokemons' à lista (CSS usa isso para estilo)
pokemonList.classList.add('pokemons');

// Carrega os primeiros pokémons quando a página abre
// offset = 0 (começa do início)
// limit = 10 (carrega 10 pokémons)
loadPokemonItens(offset,limit);

/* =====================================================
   FIM DO ARQUIVO main.js
   
   FLUXO DA APLICAÇÃO:
   1. Página abre → Inicialização executa
   2. Carrega 10 pokémons da PokeAPI
   3. Mostra na tela (renderiza)
   4. Usuário interage (clica, digita, scroll)
   5. Listeners disparam as funções apropriadas
   6. Filtros são aplicados → renderiza novamente
   7. Dados são salvos (favoritos, tema)
   
   CONCEITOS-CHAVE PARA INICIANTES:
   
   • const = variável que não pode mudar
   • let = variável que pode mudar
   
   • Arrays []
     - Listas de dados (pokémons, favoritos, etc)
     - .push() = adiciona elemento
     - .filter() = filtra elementos
     - .map() = transforma cada elemento
     - .sort() = ordena elementos
     - .splice() = remove elementos
   
   • Objetos {}
     - Dados estruturados (pokemon.name, pokemon.photo)
   
   • Functions
     - Blocos de código reutilizáveis
     - function nomeFunc() {} ou () => {}
   
   • DOM (Document Object Model)
     - A estrutura HTML
     - document.getElementById() = pega elemento
     - .classList.add/remove() = adiciona/remove classe CSS
     - .innerHTML = insere HTML
     - .textContent = insere apenas texto
   
   • Events (Eventos)
     - Coisas que acontecem (clique, digitação, scroll)
     - addEventListener() = "ouve" um evento
     - Quando acontece, executa uma função
   
   • localStorage
     - Banco de dados do navegador
     - Persiste mesmo fechando a aba
     - .getItem() = pega dados
     - .setItem() = salva dados
   
   • Promises (.then, .catch)
     - Código que executa depois
     - .then() = se conseguiu
     - .catch() = se deu erro
   
   PARA APRENDER MAIS:
   - Estude cada função com calma
   - Coloque console.log() para ver valores
   - Mude coisas e veja o que acontece
   - Leia a documentação do MDN Web Docs
   ===================================================== */