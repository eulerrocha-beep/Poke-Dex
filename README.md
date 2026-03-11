# 🎮 Pokédex Interativa - Versão Completa

Uma aplicação web **moderna, responsiva e completa** para explorar pokémons da Geração 1, com múltiplas funcionalidades avançadas!

## 🎯 Funcionalidades Principais

✅ **Listagem Dinâmica** - Carrega pokémons da PokeAPI  
✅ **Paginação** - Botão "Load More" com infinite scroll  
✅ **Busca em Tempo Real** - Filtro por nome  
✅ **Filtro por Tipo** - 18 tipos diferentes  
✅ **Ordenação** - Por número, nome ou tipo  
✅ **Favoritos** - Salvar e listar pokémons favoritos  
✅ **Modal de Detalhes** - Clique para ver mais informações  
✅ **Dark Mode** - Tema claro/escuro com localStorage  
✅ **Infinite Scroll** - Carregamento automático  
✅ **Responsivo** - 1, 2 ou 3 colunas conforme tela  
✅ **Tratamento de Erros** - Mensagens amigáveis  
✅ **Persistência** - localStorage para preferências  

---

## 📁 Estrutura do Projeto

```
Poke Dex/
├── index.html                 # HTML com todos os elementos
├── README.md                  # Este arquivo
├── assets/
│   ├── css/
│   │   ├── global.css        # Estilos globais + Dark Mode
│   │   └── pokedex.css       # Estilos Pokédex + Tipos
│   ├── imagens/              
│   └── js/
│       ├── pokemon-model.js   # Classe Pokemon
│       ├── poke-api.js        # Funções para API
│       └── main.js            # Lógica principal
```

---

## 🚀 Como Usar

### 1. **Abrir a Aplicação**
Abra `index.html` em um navegador moderno.

### 2. **Navegar pelos Pokémons**
- **Scroll automático** - Carregamento infinito
- **Clique "Load More"** - Próximos pokémons
- **Clique na imagem** - Ver detalhes no modal

### 3. **Buscar Pokémons**
Digite o nome no campo de busca para filtrar em tempo real.

### 4. **Filtrar por Tipo**
Selecione um tipo no dropdown para ver só pokémons desse tipo.

### 5. **Ordenar Resultados**
- Por # (número)
- Por Nome (alfabético)
- Por Tipo

### 6. **Gerenciar Favoritos**
- Clique no ❤️ para adicionar/remover dos favoritos
- Clique "❤️ Favoritos" para ver só os favoritos

### 7. **Dark Mode**
Clique na 🌙 no canto superior direito para alterar o tema.

---

## 💻 Código - Explicação Detalhada

### **pokemon-model.js** - Modelo de Dados

```javascript
class Pokemon {
    number;    // ID do pokémon
    name;      // Nome
    type;      // Tipo principal
    types[];   // Todos os tipos
    photo;     // URL da imagem
    height;    // Altura
    weight;    // Peso
}
```

Estrutura que define como cada pokémon é armazenado.

---

### **poke-api.js** - API

**`convertPokeApiDetailToPokemon(pokeDetail)`**
- Transforma dados brutos em objeto Pokémon
- Extrai: número, nome, tipos, foto, altura, peso

**`getPokemonDetail(pokemon)`**
- Busca detalhes de UM pokémon
- Retorna Promise com pokémon completo

**`getPokemons(offset, limit)`**
- Busca lista com paginação
- offset: posição de início
- limit: quantos pokémons buscar
- Usa Promise.all() para esperar todas as requisições

---

### **main.js** - Lógica Principal

#### **Variáveis Globais**
```javascript
const maxRecords = 151;        // Total de pokémons
let offset = 0;                // Posição atual
const limit = 10;              // Pokémons por vez
let allPokemons = [];          // Todos carregados
let filteredPokemons = [];     // Após filtros
let showingFavoritesOnly = false;
const savedFavorites = [];     // Do localStorage
```

#### **Funções Principais**

**`loadPokemonItens(offset, limit)`**
- Busca pokémons da API
- Desabilita botão enquanto carrega
- Captura erros com .catch()

**`createPokemonElement(pokemon)`**
- Cria HTML para cada pokémon
- Adiciona botão de favorito
- Adiciona evento de clique

**`applyFiltersAndRender()`**
- Aplica TODOS os filtros
- Busca por nome
- Filtra por tipo
- Ordena
- Re-renderiza lista

**`toggleFavorite(event, pokemonId, pokemonName)`**
- Adiciona/Remove dos favoritos
- Muda ícone ❤️ / 🤍
- Salva em localStorage

**`openModal(pokemonId, pokemonName, pokemonDataEncoded)`**
- Decodifica dados do pokémon
- Preenche modal com informações
- Mostra ao usuário

**`toggleTheme()`**
- Alterna dark-mode
- Salva preferência em localStorage
- Muda ícone do botão

**`toggleFavoritesView()`**
- Filtra só pokémons favoritos
- Muda cor do botão

#### **Events Listeners**

Todos os inputs e botões têm listeners que chamam `applyFiltersAndRender()`:

- searchInput → busca
- typeFilter → filtro por tipo
- sortSelect → ordenação
- favoritesBtn → mostrar favoritos
- themeToggle → dark mode
- loadMoreButton → carregar mais
- modal → fechar ao clicar fora

#### **Infinite Scroll**

```javascript
window.addEventListener('scroll', () => {
    // Se está perto do final E há mais pokémons
    // Clica automaticamente em "Load More"
})
```

---

## 🎨 CSS - Estilos

### **global.css** - Temas e Responsivo

**Variáveis CSS:**
```css
:root {
    --bg-primary: linear-gradient(...);
    --text-primary: #333;
    --card-bg: white;
    ...
}

body.dark-mode {
    --text-primary: #ffffff;
    --card-bg: #16213e;
    ...
}
```

**Responsividade:**
- Mobile: 1 coluna
- Tablet: 2 colunas (600px+)
- Desktop: 3 colunas (992px+)

### **pokedex.css** - Pokédex

**Cards com Hover:**
```css
.pokemon:hover {
    transform: translateY(-8px);        /* Levanta */
    box-shadow: 0 12px 24px rgba(...); /* Sombra */
}
```

**Cores por Tipo:**
```css
.grass { background-color: #77c850; }
.fire { background-color: #ee7f30; }
.water { background-color: #678fee; }
/* ... 15 tipos mais */
```

**Modal:**
- `fadeIn` - Fade in do fundo
- `slideUp` - Slide up do conteúdo

---

## 💾 localStorage

### Tema
```javascript
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
```

### Favoritos
```javascript
const favorites = [1, 4, 7, 25];
localStorage.setItem('favorites', JSON.stringify(favorites));
const saved = JSON.parse(localStorage.getItem('favorites'));
```

---

## 📚 Tecnologias

- **HTML5** - Semântica
- **CSS3** - Grid, Flexbox, Animações
- **JavaScript ES6+** - Modern JS
- **Fetch API** - HTTP requests
- **Promises** - Async operations
- **PokeAPI** - https://pokeapi.co/

---

## 📱 Responsividade

| Dispositivo | Colunas |
|-----------|---------|
| Mobile | 1 |
| Tablet | 2 |
| Desktop | 3 |

---

## ✨ Funcionalidades Implementadas

### v1.0 - Básico
- ✅ Listagem de pokémons
- ✅ Paginação com Load More
- ✅ Exibição com CSS Grid

### v2.0 - Completo (ATUAL)
- ✅ Busca por nome
- ✅ Filtro por tipo
- ✅ Ordenação
- ✅ Favoritos com localStorage
- ✅ Modal de detalhes
- ✅ Dark Mode com localStorage
- ✅ Infinite scroll
- ✅ Tratamento de erros
- ✅ Responsividade melhorada

---

## 🐛 Problemas Comuns

**"Pokémons não carregam"**
- Verifique internet
- Abra F12 → Console
- Procure por erros

**"Dark Mode não salva"**
- Limpe cache (Ctrl+Shift+Delete)
- localStorage pode estar cheio

**"Imagens não aparecem"**
- Conexão com PokeAPI pode estar lenta
- Algumas imagens não existem

---

## 📚 Aprenda Mais

- [MDN Fetch](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)
- [MDN Promises](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN Array.prototype.map](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN localStorage](https://developer.mozilla.org/pt-BR/docs/Web/API/Storage/LocalStorage)
- [PokeAPI](https://pokeapi.co/)

---

## 🎓 Conceitos Aprendidos

✅ Consumir APIs REST  
✅ Manipular DOM dinamicamente  
✅ Promises e async/await  
✅ Array methods (.map, .filter, .sort)  
✅ localStorage para persistência  
✅ CSS Grid e Flexbox  
✅ Dark Mode com CSS variables  
✅ Tratamento de erros  
✅ Event listeners e delegation  
✅ Classes e POO  

---

## 📊 Estatísticas

- **151 Pokémons** carregáveis
- **18 Tipos** diferentes
- **3 Ordenações** possíveis
- **2 Temas** (Light/Dark)
- **1.000+ linhas** de código

---

## 👨‍💻 Desenvolvido com

- 💪 Muito JavaScript
- 🎨 CSS criativo
- 🔥 Pura determinação
- ☕ Muito café

---

**Versão:** 2.0 - Completa ✨

Desenvolvido para aprendizado de JavaScript moderno e best practices! 🚀
