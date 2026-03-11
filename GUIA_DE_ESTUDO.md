# 📚 Guia de Estudo - Pokédex

## Para Programadores Iniciantes

Este documento ajuda você a entender o código da Pokédex passo a passo.

---

## 📖 Como Estudar Este Projeto

### 1️⃣ Comece por aqui:
1. Leia este arquivo
2. Abra `index.html` no navegador
3. Veja a página funcionando
4. Abra o console (F12) e observe

### 2️⃣ Estude os arquivos na ordem:
1. **pokemon-model.js** - Entender a estrutura de dados
2. **poke-api.js** - Entender como buscar dados
3. **main.js** - Entender a lógica da aplicação
4. **index.html** - Entender a estrutura HTML
5. **assets/css/** - Entender o estilo

---

## 🎯 Conceitos Fundamentais

### Variáveis e Tipos

```javascript
// const = não pode mudar depois
const maxRecords = 151;

// let = pode mudar
let offset = 0;

// Tipos de dados:
const numero = 10;              // number
const texto = "Pikachu";        // string
const verdadeiro = true;        // boolean
const lista = [1, 2, 3];        // array
const dados = {nome: "Ash"};    // object
```

### Arrays (Listas)

```javascript
// Criar
const pokemons = ['Bulbasaur', 'Charmander'];

// Adicionar
pokemons.push('Squirtle');

// Remover (1 elemento a partir do índice 0)
pokemons.splice(0, 1);

// Encontrar
const tem = pokemons.includes('Charmander'); // true

// Tamanho
const tamanho = pokemons.length; // 2

// Transformar (.map)
const maiuscula = pokemons.map(p => p.toUpperCase());

// Filtrar (.filter)
const comC = pokemons.filter(p => p.includes('C'));

// Ordenar (.sort)
pokemons.sort((a, b) => a.localeCompare(b));
```

### Objetos

```javascript
// Criar um objeto (como a classe Pokemon)
const pokemon = {
    number: 25,
    name: 'Pikachu',
    type: 'Electric'
};

// Acessar propriedades
console.log(pokemon.name); // 'Pikachu'

// Modificar
pokemon.name = 'Raichu';

// Usar com arrays
const pokemons = [
    {number: 1, name: 'Bulbasaur'},
    {number: 25, name: 'Pikachu'}
];
```

### Functions (Funções)

```javascript
// Função tradicional
function saudacao(nome) {
    return "Olá, " + nome;
}

// Arrow function (moderna)
const saudacao = (nome) => {
    return "Olá, " + nome;
};

// Arrow function com return implícito
const saudacao = (nome) => "Olá, " + nome;

// Sem parâmetros
const agora = () => new Date();

// Chamar função
const msg = saudacao('Ash');
console.log(msg); // "Olá, Ash"
```

### DOM (Document Object Model)

```javascript
// Pegar elemento
const titulo = document.getElementById('titulo');

// Mudar conteúdo
titulo.textContent = 'Nova Pokédex';

// Adicionar classe CSS
titulo.classList.add('ativo');

// Remover classe CSS
titulo.classList.remove('inativo');

// Alternar classe CSS
titulo.classList.toggle('escuro');

// Inserir HTML
titulo.innerHTML = '<strong>Pokédex</strong>';

// Acessar atributo
const tipo = elemento.dataset.tipo; // data-tipo

// Adicionar event listener
botao.addEventListener('click', () => {
    console.log('Botão clicado!');
});
```

### Events (Eventos)

```javascript
// Clique
elemento.addEventListener('click', () => {});

// Digitação
input.addEventListener('input', () => {});

// Mudança no select
select.addEventListener('change', () => {});

// Scroll da página
window.addEventListener('scroll', () => {});

// Envio de formulário
form.addEventListener('submit', (e) => {
    e.preventDefault(); // evita recarregar página
});
```

### Promises (Promessas Assíncronas)

```javascript
// Uma Promise é um código que executa depois
// .then() = quando conseguiu
// .catch() = quando deu erro

fetch('https://pokeapi.co/api/v2/pokemon/1')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log('Erro:', error));

// Arrow functions modernas são curtas
.then(response => response.json())

// Equivalente a:
.then(function(response) {
    return response.json();
})
```

### localStorage (Dados no Navegador)

```javascript
// Salvar dados
const favoritos = [1, 25, 151];
localStorage.setItem('favoritos', JSON.stringify(favoritos));

// Carregar dados
const favoritos = JSON.parse(localStorage.getItem('favoritos'));

// Remover dados
localStorage.removeItem('favoritos');

// JSON.stringify = converte objeto em texto
// JSON.parse = converte texto em objeto
```

---

## 🔍 Rastreando o Fluxo da Aplicação

### O que acontece quando a página abre?

```
1. index.html carrega
2. <script> carrega: pokemon-model.js, poke-api.js, main.js
3. JavaScript começa a executar (de cima para baixo)
4. Variáveis globais são criadas
5. Seletores do DOM pegam elementos HTML
6. Funções são definidas
7. Event listeners são adicionados
8. loadPokemonItens(0, 10) é chamado
   ↓
9. loadMoreButton fica desabilitado
10. pokeApi.getPokemons(0, 10) é chamado
    ↓
11. Requisição HTTP é feita à PokeAPI
12. Resposta vira JSON
13. Para cada pokémon simples, getPokemonDetail() é chamado
14. Promise.all() espera TODAS as requisições
    ↓
15. allPokemons recebe o array completo
16. applyFiltersAndRender() é chamado
17. Pokémons aparecem na tela! 🎉
18. loadMoreButton volta a ficar habilitado
```

### O que acontece quando clica em um tipo?

```
1. typeFilter dispara evento 'change'
2. applyFiltersAndRender() é chamado
3. showingFavoritesOnly é verificado
4. searchTerm é extraído
5. selectedType é extraído
6. Filtro de tipo é aplicado
7. Ordenação é aplicada
8. pokemonList.innerHTML é atualizado
9. Pokémons filtrados aparecem na tela
```

---

## 🎨 Estrutura do Projeto

```
Poke Dex/
│
├── index.html              ← Estrutura (HTML)
│
├── assets/
│   ├── css/
│   │   ├── global.css      ← Estilos globais (CSS)
│   │   └── pokedex.css     ← Estilos específicos (CSS)
│   │
│   └── js/
│       ├── pokemon-model.js   ← Classe Pokémon
│       ├── poke-api.js        ← Funções de API
│       └── main.js            ← Lógica da app
│
└── Documentação/
    ├── README.md              ← Como usar
    ├── GUIA_DE_ESTUDO.md      ← Este arquivo
    └── etc
```

---

## 🧪 Dicas para Aprender

### 1. Use console.log() para ver valores

```javascript
// Adicione em main.js para debugar
console.log('allPokemons:', allPokemons);
console.log('filteredPokemons:', filteredPokemons);
console.log('savedFavorites:', savedFavorites);
```

Abra F12 no navegador para ver o console.

### 2. Mude valores e veja o que acontece

```javascript
// Tente mudar:
const limit = 10;  // mude para 5 ou 20

// Tente desativar:
// loadPokemonItens(offset, limit);
```

### 3. Leia os comentários no código

Cada arquivo JavaScript tem comentários explicando cada parte.

### 4. Pesquise no MDN Web Docs

https://developer.mozilla.org/pt-BR/

Procure por:
- Array methods (.map, .filter, .sort)
- DOM methods (getElementById, classList)
- Fetch API
- localStorage

### 5. Experimente no console (F12)

```javascript
// Teste comandos direto:
document.querySelectorAll('.pokemon').length

// Veja dados da página:
allPokemons

// Veja dados salvos:
localStorage.getItem('favorites')

// Teste funções:
toggleTheme()
openModal(25)
```

---

## 🎓 Exercícios de Aprendizado

### Fácil

1. **Mude a cor do tema claro**
   - Arquivo: `assets/css/global.css`
   - Procure: `:root`
   - Altere: `--bg-primary` para outra cor

2. **Mude a quantidade de pokémons carregados**
   - Arquivo: `assets/js/main.js`
   - Procure: `const limit = 10;`
   - Mude para: `const limit = 20;`

3. **Adicione um console.log ao carregar pokémons**
   - Arquivo: `assets/js/main.js`
   - Procure: `allPokemons = allPokemons.concat(pokemons);`
   - Depois, adicione: `console.log('Pokémons carregados:', allPokemons);`

### Médio

4. **Crie um novo filtro (por geração)**
   - Seria necessário adicionar um dropdown no HTML
   - Adicionar lógica no applyFiltersAndRender()

5. **Mude o ícone de favorito**
   - Arquivo: `assets/js/main.js`
   - Procure: `const heartIcon = isFavorite ? '❤️' : '🤍';`
   - Mude para outro emoji

6. **Aumente o tamanho dos cartões pokémon**
   - Arquivo: `assets/css/pokedex.css`
   - Procure: `.pokemon { ... }`
   - Aumentar `width` e `height`

### Difícil

7. **Adicione estatísticas (ATK, DEF, SP)**
   - Seria necessário:
     - Adicionar no pokemon-model.js
     - Buscar na PokeAPI (stats)
     - Mostrar no modal

8. **Crie um sistema de comparação de pokémons**
   - Selecione 2 pokémons
   - Mostre lado a lado

9. **Implemente busca por número**
   - Modifique o filtro de busca em main.js

---

## 📚 Recursos para Aprender

### Sites
- https://www.w3schools.com/js/ - Tutorial JavaScript
- https://developer.mozilla.org/pt-BR/docs/Web/JavaScript - Documentação oficial
- https://pokeapi.co/ - Documentação da PokeAPI

### Vídeos
- Busque no YouTube: "JavaScript para iniciantes"
- Busque: "DOM manipulation JavaScript"
- Busque: "Async JavaScript promises"

### Livros
- "JavaScript Eloquente" (online, grátis)
- "Você não sabe JS" (série online)

---

## 🐛 Debugando Erros

### Erro: "Cannot read property 'number' of undefined"

Significa que está tentando acessar `.number` de algo que não existe.

```javascript
// Adicione verificação:
if (pokemon) {
    console.log(pokemon.number);
}
```

### Erro: "pokeApi is not defined"

Significa que poke-api.js não foi carregado antes de main.js.

Verifique em index.html a ordem dos scripts:
```html
<script src="assets/js/pokemon-model.js"></script>
<script src="assets/js/poke-api.js"></script>
<script src="assets/js/main.js"></script>
```

### A página não carrega pokémons

1. Abra o console (F12)
2. Veja se há erros vermelhos
3. Procure a mensagem de erro
4. Tente: `pokeApi.getPokemons(0, 10)` no console
5. Veja se uma Promise é retornada

---

## 🎯 Próximos Passos

Depois de entender esta Pokédex:

1. Tente fazer um projeto similar (lista de qualquer coisa)
2. Explore outras APIs (GitHub, JSONPlaceholder, etc)
3. Aprenda React ou Vue (frameworks modernos)
4. Faça projetos maiores e mais complexos

---

## 💡 Dicas Finais

1. **Entenda antes de copiar**: Leia e compreenda cada linha
2. **Faça anotações**: Escreva o que aprendeu com suas palavras
3. **Pratique**: Tente fazer coisas parecidas do zero
4. **Cometa erros**: Errando se aprende mais rápido
5. **Leia documentação**: Seja sua amiga, não sua inimiga
6. **Debug é normal**: Até profissionais debugam muito código

---

## ✨ Conclusão

Este projeto cobre:

- ✅ Variáveis e tipos
- ✅ Arrays e métodos
- ✅ Objetos e classes
- ✅ Funções e arrow functions
- ✅ DOM manipulation
- ✅ Events e listeners
- ✅ Promises e async
- ✅ fetch API
- ✅ localStorage
- ✅ Filtros e ordenação

Você aprendeu **JavaScript Fundamentals**! 🎉

Bom estudo! 📖💪

---

**Dúvidas?** Leia os comentários no código. Eles explicam tudo!
