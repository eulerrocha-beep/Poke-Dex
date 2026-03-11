// Classe que define a estrutura de um Pokémon
// É como um "molde" para criar objetos Pokémon
class Pokemon {
    number;      // ID do Pokémon (#1, #2, #3...)
    name;        // Nome do Pokémon (Bulbasaur, Charmander...)
    type;        // Tipo principal (Grass, Fire, Water...)
    types = [];  // Array com todos os tipos (pode ter 1 ou 2)
    photo;       // URL da imagem do Pokémon
    height;      // Altura em decímetros (precisa dividir por 10 para metros)
    weight;      // Peso em hectogramas (precisa dividir por 10 para kg)
}