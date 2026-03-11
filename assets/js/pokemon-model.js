/* =====================================================
   MODELO POKÉMON (pokemon-model.js)
   =====================================================
   
   Este arquivo define a ESTRUTURA de um Pokémon.
   É como um "molde" ou "template" para criar objetos.
   
   PARA INICIANTES: Classes são usadas para organizar dados
   relacionados. Aqui todos os dados de um pokémon
   estão em um único lugar.
   ===================================================== */

// Class = "classe" é um molde para criar objetos
// Todas as instâncias de Pokemon terão as mesmas propriedades
class Pokemon {
    
    // number = ID do Pokémon (#1, #2, #3...)
    // Cada pokémon tem um número único
    number;
    
    // name = nome do Pokémon (Bulbasaur, Charmander, Squirtle...)
    name;
    
    // type = tipo principal do Pokémon
    // Cada pokémon tem pelo menos um tipo
    // Tipos: Grass, Fire, Water, Psychic, Fairy, etc
    type;
    
    // types = array com TODOS os tipos do pokémon
    // A maioria dos pokémons tem 1 tipo
    // Alguns têm 2 tipos (ex: Grass-Poison, Fire-Flying)
    // O primeiro tipo é o "type", os demais vêm aqui
    types = [];
    
    // photo = URL (endereço) da imagem do pokémon
    // É um link que aponta para uma imagem na internet
    // Exemplo: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    photo;
    
    // height = altura do pokémon
    // Retorna em DECÍMETROS (dm) da PokeAPI
    // Para converter para metros: height / 10
    // Exemplo: height = 7 dm → 0.7 metros (70 cm)
    height;
    
    // weight = peso do pokémon
    // Retorna em HECTOGRAMAS (hg) da PokeAPI
    // Para converter para quilogramas: weight / 10
    // Exemplo: weight = 69 hg → 6.9 kg
    weight;
}