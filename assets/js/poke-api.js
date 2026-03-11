/* =====================================================
   API POKÉMON (poke-api.js)
   =====================================================
   
   Este arquivo contém TODAS as funções que se comunicam
   com a PokeAPI. É a "ponte" entre nossa app e os dados.
   
   PARA INICIANTES: APIs são serviços que fornecem dados.
   Aqui buscamos informações sobre pokémons da internet.
   ===================================================== */

// Objeto pokeApi = container para agrupar funções relacionadas
// Dessa forma, organized: pokeApi.getPokemons() é claro
const pokeApi = {};

// =====================================================
// FUNÇÃO 1: Converter dados da API em objeto Pokémon
// =====================================================
// A PokeAPI retorna muitos dados. Esta função extrai
// apenas o que precisamos e cria um objeto Pokémon.

function convertPokeApiDetailToPokemon(pokeDetail) {
    
    // new Pokemon() cria um novo objeto vazio da classe Pokemon
    const pokemon = new Pokemon();
    
    // Preenche cada propriedade do pokémon com dados da API
    
    // pokeDetail.id = número do pokémon vindo da API
    pokemon.number = pokeDetail.id;
    
    // pokeDetail.name = nome vindo da API
    pokemon.name = pokeDetail.name;
    
    // pokeDetail.height = altura vindo da API (em decímetros)
    pokemon.height = pokeDetail.height;
    
    // pokeDetail.weight = peso vindo da API (em hectogramas)
    pokemon.weight = pokeDetail.weight;
    
    // ===== Extração dos tipos =====
    // A API retorna tipos assim: [{type: {name: "grass"}}, {type: {name: "poison"}}]
    // Precisamos extrair só os nomes
    // .map() transforma cada item complexo em um nome simples
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    
    // Destructuring = forma elegante de extrair o primeiro elemento
    // const [type] = types é o mesmo que: const type = types[0]
    const [type] = types;

    // Atribui todos os tipos (array) ao pokémon
    pokemon.types = types;
    
    // Atribui o tipo principal (primeiro tipo)
    // Usado para CSS (cores diferentes por tipo)
    pokemon.type = pokemon.types[0];

    // ===== Extração da imagem =====
    // A API tem várias imagens disponíveis
    // dream_world.front_default = imagem grande e bonitinha
    // É um URL (endereço) que aponta para a imagem
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    // Retorna o pokémon pronto para usar
    return pokemon;
}

// =====================================================
// FUNÇÃO 2: Buscar detalhes de UM pokémon
// =====================================================
// Recebe um pokémon simples (com só a URL) e busca todos os detalhes.

// pokeApi.getPokemonDetail = ... é uma função seta (arrow function)
// Está dentro do objeto pokeApi para organização
pokeApi.getPokemonDetail = (pokemon) => {
    
    // pokemon.url é um endereço tipo:
    // "https://pokeapi.co/api/v2/pokemon/1/"
    
    // fetch() faz uma requisição HTTP (busca dados na internet)
    // Retorna uma Promise (promessa de dados no futuro)
    return fetch(pokemon.url)
        
        // .then() executa quando os dados chegam
        // response.json() converte a resposta em JSON (formato JavaScript)
        .then((response) => response.json())
        
        // Segundo .then() recebe o JSON convertido
        // Passa para a função convertPokeApiDetailToPokemon
        // Que transforma em um objeto Pokémon formatado
        .then(convertPokeApiDetailToPokemon)
    ;
}

// =====================================================
// FUNÇÃO 3: Buscar LISTA de pokémons (pagina)
// =====================================================
// Esta é a função mais importante. Busca vários pokémons com paginação.

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    // offset = de qual número começar (padrão: 0)
    // limit = quantos buscar (padrão: 10)
    
    // Template literal (com ` `) para montar a URL
    // ? = parâmetros
    // offset=0&limit=10 = do 0 ao 10
    // offset=10&limit=10 = do 10 ao 20
    // etc
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        
        // Converte a resposta em JSON
        .then((response) => response.json())
        
        // A API retorna {results: [...], count: ..., next: ...}
        // Pegamos só o array results (os pokémons)
        .then((jsonBody) => jsonBody.results)
        
        // Agora temos um array com pokémons simples
        // (só tem URL, nada mais)
        // .map() vai transformar cada um
        // Mas getPokemonDetail retorna uma Promise!
        // Então fica um array de Promises
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        
        // Promise.all() é CRUCIAL aqui
        // Espera TODAS as Promises terminarem
        // Se pegar em paralelo em vez de uma por uma, fica muito mais rápido
        .then((detailRequests) => Promise.all(detailRequests))
        
        // Agora temos o array final com pokémons completos
        // Retorna esse array
        .then((pokemonDetails) => pokemonDetails)
        
        // Se algo der errado em qualquer etapa:
        .catch((error) => {
            // Mostra o erro no console (F12)
            console.error('Erro ao buscar pokémons:', error);
            // Re-lança o erro para ser tratado em main.js
            throw error;
        })
    ;
};

/* =====================================================
   RESUMO DE COMO FUNCIONA:
   
   1. main.js chama pokeApi.getPokemons(0, 10)
   2. Essa função monta uma URL com paginação
   3. fetch() vai à internet buscar dados
   4. Response vira JSON (formato JavaScript)
   5. Pega o array "results"
   6. Para CADA pokémon no array, chama getPokemonDetail()
   7. getPokemonDetail() faz OUTRA requisição para cada um
   8. Cada resultado é convertido em objeto Pokémon
   9. Promise.all() espera TODOS terminarem
   10. Retorna array de pokémons completos
   11. main.js recebe no .then() de loadPokemonItens
   
   IMPORTANTE:
   - Promises são assíncronas (não bloqueiam a página)
   - .then() encadeia operações
   - Promise.all() espera vários em paralelo
   - Sempre tratar erros com .catch()
   ===================================================== */
