# 💡 EXEMPLOS PRÁTICOS - Aprendendo com a Pokédex

## Para Programadores Iniciantes

Este arquivo mostra **exemplos reais do código** com explicações sobre cada conceito.

---

## 1️⃣ VARIÁVEIS

### Exemplo do Código Real

```javascript
// Em main.js, linhas 21-28
const maxRecords = 151;
let offset = 0;
const limit = 10;
let allPokemons = [];
let filteredPokemons = [];
let showingFavoritesOnly = false;
let savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
```

### O que Significa?

```javascript
const maxRecords = 151;
// const = constante (não pode mudar)
// maxRecords = nome da variável
// 151 = valor

let offset = 0;
// let = pode mudar depois
// offset = nome da variável
// 0 = valor inicial
```

### Por que const vs let?

```javascript
const maxRecords = 151;  // Nunca muda, usa const
let offset = 0;          // Muda (cresce com Load More), usa let

// Isso daria erro:
maxRecords = 200;  // ❌ TypeError: Assignment to constant variable

// Mas isso funciona:
offset = 10;  // ✅ Ok, muda para 10
offset = 20;  // ✅ Ok, muda para 20
```

---

## 2️⃣ ARRAYS E MÉTODOS

### .push() - Adicionar Elemento

```javascript
// No começo: allPokemons = []
// Vazio!

pokeApi.getPokemons(0, 10).then((pokemons) => {
    // pokemons = [
    //   {number: 1, name: 'Bulbasaur', ...},
    //   {number: 2, name: 'Ivysaur', ...},
    //   ...10 pokémons...
    // ]
    
    allPokemons = allPokemons.concat(pokemons);
    // concat = junta dois arrays
    // Resultado: allPokemons agora tem 10 pokémons
});

// Depois de 2ª vez:
// allPokemons tem 20 pokémons
// Depois de 3ª vez:
// allPokemons tem 30 pokémons
```

### .filter() - Filtrando

```javascript
// Todos os pokémons estão em allPokemons

// FILTRAR POR TIPO
const selectedType = 'grass';
filteredPokemons = allPokemons.filter(p => 
    p.types.includes(selectedType)
);
// Resultado: só pokémons com tipo grass

// FILTRAR POR NOME
const searchTerm = 'pika';
filteredPokemons = filteredPokemons.filter(p =>
    p.name.toLowerCase().includes(searchTerm)
);
// Resultado: Pikachu, Pikachutwo, etc (se existissem)

// FILTRAR FAVORITOS
const favorites = [1, 25, 151];
filteredPokemons = allPokemons.filter(p =>
    favorites.includes(p.number)
);
// Resultado: só Bulbasaur, Pikachu, Mewtwo
```

### .map() - Transformando

```javascript
// Transformar números em strings
const tipos = [1, 2, 3];
const nomes = tipos.map(num => 'Pokemon ' + num);
// Resultado: ['Pokemon 1', 'Pokemon 2', 'Pokemon 3']

// No código real (pokédex.js):
${pokemon.types.map(type =>
    `<li class="type ${type.toLowerCase()}">${type}</li>`
).join('')}

// Transforma:
// [Grass, Poison]
// Em:
// <li class="type grass">Grass</li><li class="type poison">Poison</li>
```

### .sort() - Ordenando

```javascript
const pokemons = [
    {name: 'Charmander', number: 4},
    {name: 'Bulbasaur', number: 1},
    {name: 'Squirtle', number: 7}
];

// Ordenar por número
pokemons.sort((a, b) => a.number - b.number);
// Resultado: [Bulbasaur(1), Charmander(4), Squirtle(7)]

// Ordenar por nome
pokemons.sort((a, b) => a.name.localeCompare(b.name));
// Resultado: [Bulbasaur, Charmander, Squirtle]
```

---

## 3️⃣ OBJETOS E CLASSES

### Classe Pokémon

```javascript
// Em pokemon-model.js

class Pokemon {
    number;      // ID do pokémon
    name;        // Nome
    type;        // Tipo principal
    types = [];  // Array de tipos
    photo;       // URL da imagem
    height;      // Altura em dm
    weight;      // Peso em hg
}

// Criar uma instância
const bulbasaur = new Pokemon();
bulbasaur.number = 1;
bulbasaur.name = 'Bulbasaur';
bulbasaur.type = 'Grass';
bulbasaur.types = ['Grass', 'Poison'];
bulbasaur.photo = 'https://...';
bulbasaur.height = 7;  // 0.7m
bulbasaur.weight = 69; // 6.9kg

// Acessar propriedades
console.log(bulbasaur.name);     // 'Bulbasaur'
console.log(bulbasaur.types[0]); // 'Grass'
```

---

## 4️⃣ FUNÇÕES

### Função Tradicional

```javascript
// Em main.js
function showError(message) {
    errorContainer.innerHTML = 
        `<div class="error-message">⚠️ ${message}</div>`;
    setTimeout(() => errorContainer.innerHTML = '', 5000);
}

// Chamar função
showError('Erro ao carregar pokémons.');
// Mostra mensagem por 5 segundos
```

### Arrow Function

```javascript
// Tradicional
function saudacao(nome) {
    return 'Olá, ' + nome;
}

// Arrow function (moderna)
const saudacao = (nome) => {
    return 'Olá, ' + nome;
};

// Arrow function curta
const saudacao = (nome) => 'Olá, ' + nome;

// No código (poke-api.js):
.then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
// (pokemons) => ... é uma arrow function
```

---

## 5️⃣ DOM MANIPULATION

### Pegar Elemento

```javascript
// Em main.js
const pokemonList = document.getElementById('pokemonList');
// Pega o elemento com id="pokemonList"
// Agora podemos manipular esse elemento

const loadMoreButton = document.getElementById('loadMoreButton');
// Pega o botão "Load More"

const searchInput = document.getElementById('searchInput');
// Pega o campo de busca
```

### Mudar Conteúdo

```javascript
// Inserir HTML (várias linhas de pokémons)
pokemonList.innerHTML = filteredPokemons
    .map(createPokemonElement)
    .join('');

// Mudar texto
loadMoreButton.textContent = 'Carregando...';

// Depois:
loadMoreButton.textContent = 'Load More';

// Resultado visual:
// Botão muda de texto em tempo real ✨
```

### Adicionar/Remover Classes

```javascript
// Adicionar classe (para dark mode)
document.body.classList.add('dark-mode');
// Agora body tem class="dark-mode"
// CSS aplica cores escuras

// Remover classe
document.body.classList.remove('dark-mode');

// Alternar
document.body.classList.toggle('dark-mode');
// Se tem, remove. Se não tem, adiciona.

// Verificar
const isDark = document.body.classList.contains('dark-mode');
// true ou false
```

### Acessar Atributos Customizados

```html
<!-- No HTML: -->
<img data-pokemon-id="25" src="..." alt="Pikachu">
```

```javascript
// No JavaScript:
const img = document.querySelector('img');
const pokemonId = img.dataset.pokemonId;
// pokemonId = '25'

// No código real (main.js):
const pokemonId = parseInt(e.target.dataset.pokemonId);
// parseInt converte string '25' em número 25
```

---

## 6️⃣ EVENTS (Eventos)

### Clique em Botão

```javascript
// Em main.js
loadMoreButton.addEventListener('click', () => {
    offset += limit;
    loadPokemonItens(offset, limit);
});

// Quando o usuário clica no botão:
// 1. offset aumenta de 10 em 10
// 2. Carrega próximos 10 pokémons
// 3. Renderiza na tela
```

### Digitação em Campo

```javascript
searchInput.addEventListener('input', applyFiltersAndRender);

// Toda vez que digita uma letra:
// applyFiltersAndRender() executa
// Filtra pokémons em tempo real
// Resulta em busca responsiva
```

### Mudança em Select

```javascript
typeFilter.addEventListener('change', applyFiltersAndRender);

// Quando seleciona um tipo:
// applyFiltersAndRender() executa
// Filtra por tipo
```

### Scroll da Página

```javascript
window.addEventListener('scroll', () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.body.offsetHeight;
    
    if (scrollPosition >= pageHeight - 500) {
        loadMoreButton.click();
    }
});

// Quando scroll chega perto do final:
// Simula clique no botão Load More
// Carrega próximos pokémons automaticamente
// Infinite scroll! ∞
```

---

## 7️⃣ PROMISES E FETCH API

### Buscar Dados da Internet

```javascript
// Em poke-api.js
pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    
    return fetch(url)
        // fetch() faz requisição HTTP
        // Retorna uma Promise
        
        .then((response) => response.json())
        // .then() executa quando resposta chega
        // response.json() converte em JSON
        
        .then((jsonBody) => jsonBody.results)
        // Pega só a lista de pokémons
        
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        // Para cada pokémon, busca detalhes
        
        .then((detailRequests) => Promise.all(detailRequests))
        // Promise.all() espera TODAS as requisições
        // Muito mais rápido que esperar uma por uma!
        
        .catch((error) => {
            console.error('Erro ao buscar pokémons:', error);
            throw error;
        });
        // .catch() se algo der errado
};

// Em main.js, quando chama:
pokeApi.getPokemons(0, 10)
    .then((pokemons) => {
        allPokemons = allPokemons.concat(pokemons);
        applyFiltersAndRender();
    })
    .catch((error) => {
        showError('Erro ao carregar pokémons.');
    });
```

### Visualização do Fluxo

```
1. fetch(url) → Vai à internet
         ↓
2. response chega → .then() executa
         ↓
3. response.json() → Converte em JavaScript
         ↓
4. Pega results → Lista simples
         ↓
5. getPokemonDetail() → Para cada um, busca detalhes (10 requisições!)
         ↓
6. Promise.all() → Espera TODOS terminarem
         ↓
7. .then() → Retorna lista completa para main.js
         ↓
8. applyFiltersAndRender() → Mostra na tela! 🎉
```

---

## 8️⃣ LOCALSTORAGE (Salvar Dados)

### Guardar Favoritos

```javascript
// Em main.js
const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Quando clica para favoritar:
function toggleFavorite(event, pokemonId) {
    const index = savedFavorites.indexOf(pokemonId);
    
    if (index > -1) {
        // Já está favoritado, remove
        savedFavorites.splice(index, 1);
    } else {
        // Não está, adiciona
        savedFavorites.push(pokemonId);
    }
    
    // SALVA NO NAVEGADOR (importante!)
    localStorage.setItem('favorites', JSON.stringify(savedFavorites));
    // JSON.stringify() converte array em string
    // Exemplo: [1, 25, 151] vira '[1,25,151]'
}

// Quando recarrega página:
const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
// JSON.parse() converte string de volta em array
// Resultado: favoritos aparecem mesmo após recarregar! ✨
```

### Guardar Tema

```javascript
// Quando clica no botão de tema:
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Salva a preferência
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Quando página abre:
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}
// Resultado: tema que escolheu persiste! ✨
```

---

## 9️⃣ OPERADOR TERNÁRIO (? :)

### Sintaxe

```javascript
condição ? valortrue : valorfalso

// Exemplo:
const age = 20;
const pode = age >= 18 ? 'Sim' : 'Não';
// Se age >= 18, pode = 'Sim'
// Senão, pode = 'Não'

// No código real:
const heartIcon = isFavorite ? '❤️' : '🤍';
// Se é favorito: '❤️'
// Senão: '🤍'

const activeClass = isFavorite ? 'active' : '';
// Se é favorito: adiciona classe 'active'
// Senão: string vazia
```

---

## 🔟 TEMPLATE LITERALS (` `)

### Sintaxe

```javascript
// Tradicional (concatenação com +)
const msg = 'Olá, ' + nome + '!';

// Template literal (moderno)
const msg = `Olá, ${nome}!`;
// ${ } insere variáveis
// Quebras de linha funcionam naturalmente

// No código real:
return `
    <li class="pokemon ${pokemon.type}">
        <span class="name">${pokemon.name}</span>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
    </li>
`;

// ${variavel} insere:
// - pokemon.type → 'grass'
// - pokemon.name → 'Bulbasaur'
// - pokemon.photo → 'https://...'
```

---

## 1️⃣1️⃣ DESTRUCTURING

### Arrays

```javascript
const types = ['Grass', 'Poison'];
const [type] = types;
// type = 'Grass'
// Pega o primeiro elemento

const [primeiro, segundo] = types;
// primeiro = 'Grass'
// segundo = 'Poison'
```

### Objetos

```javascript
const pokemon = {number: 1, name: 'Bulbasaur'};
const {number, name} = pokemon;
// number = 1
// name = 'Bulbasaur'

// Renomear:
const {number: id, name: nomePok} = pokemon;
// id = 1
// nomePok = 'Bulbasaur'
```

---

## 1️⃣2️⃣ SPREAD OPERATOR (...)

### Copiar Array

```javascript
const original = [1, 2, 3];
const copia = [...original];
// copia = [1, 2, 3]
// Mas é uma cópia, não a referência

copia[0] = 99;
// original[0] ainda é 1 (não foi afetado)
// copia[0] é 99

// No código:
filteredPokemons = [...allPokemons];
// Faz uma cópia para não afetar allPokemons original
```

### Juntar Arrays

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const junta = [...arr1, ...arr2];
// junta = [1, 2, 3, 4]
```

---

## 📊 Tabela de Referência

| Conceito | Exemplo | Uso |
|----------|---------|-----|
| const | `const max = 151` | Valor que não muda |
| let | `let offset = 0` | Valor que muda |
| .push() | `arr.push(item)` | Adicionar ao array |
| .filter() | `arr.filter(x => x > 5)` | Filtrar array |
| .map() | `arr.map(x => x * 2)` | Transformar array |
| .sort() | `arr.sort((a,b) => a - b)` | Ordenar array |
| .join() | `arr.join(',')` | Juntar em string |
| function | `function f() {}` | Função tradicional |
| Arrow => | `const f = () => {}` | Função moderna |
| DOM | `document.getElementById()` | Pegar elemento HTML |
| .addEventListener() | `el.addEventListener('click', fn)` | Ouvir evento |
| fetch() | `fetch(url).then()` | Buscar dados |
| Promise | `.then().catch()` | Código assincron |
| localStorage | `localStorage.setItem()` | Salvar dados |
| ? : | `cond ? true : false` | Ternário (if curto) |
| `` | `` `${var}` `` | Template literal |
| ... | `[...arr]` | Spread operator |

---

## 🎯 Praticando

### Exercício 1: Filtro Customizado
```javascript
// Adicione em main.js no console (F12):
const filtrados = allPokemons.filter(p => p.weight > 100);
console.log(filtrados);
// Mostra pokémons com peso > 100 hg (10 kg)
```

### Exercício 2: Transformação
```javascript
const nomes = allPokemons.map(p => p.name.toUpperCase());
console.log(nomes);
// ['BULBASAUR', 'IVYSAUR', ...]
```

### Exercício 3: Busca
```javascript
const pikachu = allPokemons.find(p => p.name === 'Pikachu');
console.log(pikachu);
// Mostra o objeto completo de Pikachu
```

### Exercício 4: Contagem
```javascript
const grassTypes = allPokemons.filter(p => 
    p.types.includes('Grass')
).length;
console.log(`Total de tipo Grass: ${grassTypes}`);
```

---

## 💡 Resumo

Todos esses conceitos estão **no código real** da Pokédex!

- Estude o código comentado
- Veja como cada conceito é usado
- Teste no console (F12)
- Modifique e veja o resultado
- Aprenda praticando! 🚀

---

**Bom aprendizado!** 📚💪
