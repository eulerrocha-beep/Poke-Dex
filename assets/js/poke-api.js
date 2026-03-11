// Objeto que contém todas as funções para comunicar com a PokeAPI
const pokeApi = {};

// Função que transforma os dados brutos da API em um objeto Pokémon
// Recebe: dados completos do pokémon vindo da API
// Retorna: objeto Pokémon formatado com apenas os dados que precisamos
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();  // Cria um novo Pokémon vazio
    pokemon.number = pokeDetail.id;  // Pega o ID (número) do pokémon
    pokemon.name = pokeDetail.name;  // Pega o nome
    pokemon.height = pokeDetail.height;  // Altura do pokémon
    pokemon.weight = pokeDetail.weight;  // Peso do pokémon
    
    // Extrai apenas os nomes dos tipos (a API retorna objetos complexos)
    // map() transforma cada tipo em só o seu nome
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;  // Pega o primeiro tipo (destructuring)

    pokemon.types = types;           // Atribui todos os tipos ao pokémon
    pokemon.type = pokemon.types[0]; // Atribui o tipo principal (primeiro)

    // Pega a URL da imagem do pokémon (sprite dream_world)
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon  // Retorna o pokémon pronto para usar
}

// Função que busca os detalhes completos de UM pokémon
// Recebe: objeto pokémon com URL
// Retorna: Promise com os detalhes do pokémon convertidos
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)                    // Faz requisição HTTP
        .then((response) => response.json())     // Converte resposta para JSON
        .then(convertPokeApiDetailToPokemon)     // Converte para objeto Pokémon
}

// Função que busca UMA LISTA de pokémons com paginação
// Recebe: offset (de onde começar) e limit (quantos pegar)
// Retorna: Promise com array de pokémons completos
pokeApi.getPokemons = (offset = 0, limit = 10) => {
    // Monta a URL com parâmetros de paginação
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        // Converte a resposta em JSON
        .then((response) => response.json())
        // Pega apenas o array "results" (ignora dados desnecessários)
        .then((jsonBody) => jsonBody.results)
        // Para CADA pokémon no array, busca os detalhes completos
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        // Espera TODAS as requisições terminarem (Promise.all é importante!)
        .then((detailRequests) => Promise.all(detailRequests))
        // Retorna o array final com todos os pokémons prontos
        .then((pokemonDetails) => pokemonDetails)
        // Tratamento de erro - se algo der errado
        .catch((error) => {
            console.error('Erro ao buscar pokémons:', error);
            throw error;  // Passa o erro para ser tratado em main.js
        })
};
