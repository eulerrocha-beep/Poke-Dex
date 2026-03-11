# 📝 Guia - HTML e CSS da Pokédex

## Para Programadores Iniciantes

---

## 📄 Entendendo o index.html

### Estrutura Básica

```html
<!DOCTYPE html>
<!-- Declara que é HTML5 -->

<html lang="pt-BR">
<!-- Raiz da página, idioma português -->

<head>
    <!-- Informações sobre a página (não aparece visualmente) -->
    
    <meta charset="UTF-8">
    <!-- Encoding dos caracteres (acentos, ç, etc) -->
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Configuração responsiva (funciona em mobile) -->
    
    <title>Pokédex</title>
    <!-- Título que aparece na aba do navegador -->
    
    <link rel="stylesheet" href="assets/css/global.css">
    <!-- Carrega o arquivo CSS global -->
</head>

<body>
    <!-- Corpo da página (conteúdo visível) -->
</body>
</html>
```

### Elementos Principais

#### 1. Botão de Tema (Dark Mode)

```html
<button 
    class="theme-toggle"
    id="themeToggle"
    title="Alternar tema"
    aria-label="Alternar tema">
    🌙
</button>
```

**Explicação:**
- `class="theme-toggle"` → classe CSS para estilo
- `id="themeToggle"` → ID único para JavaScript acessar
- `title="..."` → texto que aparece ao passar mouse
- `aria-label="..."` → para acessibilidade (leitores de tela)

#### 2. Header (Cabeçalho)

```html
<header class="header">
    <h1>Pokédex</h1>
</header>
```

**Explicação:**
- `<header>` → elemento semântico (melhor que `<div>`)
- `<h1>` → heading 1 (maior importância)
- Usamos apenas 1 `<h1>` por página

#### 3. Controles (Filtros)

```html
<div class="controls-container">
    <!-- Busca por nome -->
    <input 
        type="text" 
        id="searchInput" 
        placeholder="Buscar pokémon...">
    
    <!-- Filtro por tipo -->
    <select id="typeFilter">
        <option value="">Todos os tipos</option>
        <option value="grass">Grass</option>
        <!-- ... mais tipos ... -->
    </select>
    
    <!-- Ordenação -->
    <select id="sortSelect">
        <option value="number">Nº Pokédex</option>
        <option value="name">Nome A-Z</option>
        <option value="type">Tipo</option>
    </select>
    
    <!-- Botão de favoritos -->
    <button id="favoritesBtn">❤️ Favoritos</button>
    
    <!-- Botão Load More -->
    <button id="loadMoreButton">Load More</button>
</div>
```

**Explicação:**
- `<input type="text">` → campo de entrada de texto
- `<select>` → dropdown (lista de opções)
- `<option>` → cada opção do select
- `placeholder` → texto cinza que desaparece ao digitar

#### 4. Lista de Pokémons

```html
<ol id="pokemonList">
    <!-- Aqui JavaScript insere os <li> dos pokémons -->
    <!-- Exemplo de um pokémon (criado por JavaScript):
    
    <li class="pokemon grass" data-pokemon-id="1">
        <button class="favorite-btn" onclick="toggleFavorite(event, 1)">
            🤍
        </button>
        <span class="number">#001</span>
        <span class="name">Bulbasaur</span>
        <div class="detail">
            <ol class="types">
                <li class="type grass">Grass</li>
            </ol>
            <img src="..." alt="Bulbasaur">
        </div>
    </li>
    
    -->
</ol>
```

**Explicação:**
- `<ol>` → ordered list (lista com números)
- `data-pokemon-id="1"` → atributo customizado para guardar ID
- `onclick="toggleFavorite(...)"` → executa função ao clicar
- JavaScript preenche essa lista com `.innerHTML`

#### 5. Modal (Detalhes do Pokémon)

```html
<div id="pokemonModal" class="modal">
    <!-- Fundo do modal -->
    <div class="modal-content">
        <!-- Conteúdo do modal -->
        
        <button id="modalClose" class="modal-close">✕</button>
        <!-- Botão X para fechar -->
        
        <h2 id="modalTitle">Nome</h2>
        <span id="modalNumber">#001</span>
        
        <img id="modalImage" src="" alt="">
        
        <p>Tipos: <span id="modalTypes">Grass</span></p>
        <p>Altura: <span id="modalHeight">0.7 m</span></p>
        <p>Peso: <span id="modalWeight">6.9 kg</span></p>
    </div>
</div>
```

**Explicação:**
- Modal é uma "janela" sobreposta
- `.modal` (fundo) + `.modal-content` (conteúdo)
- IDs para JavaScript preencher dados
- JavaScript adiciona/remove classe `show` para aparecer

---

## 🎨 Entendendo o CSS

### Arquivo: global.css

Este arquivo contém estilos globais que valem para toda a página.

#### 1. CSS Variables (Variáveis CSS)

```css
:root {
    /* Cores base - claro */
    --bg-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --text-primary: #333;
    --card-bg: #fff;
    
    /* Cores de tipos (determinadas pelo JavaScript) */
    --type-grass: #78c850;
    --type-fire: #f08030;
    --type-water: #6890f0;
    /* ... mais tipos ... */
}

body.dark-mode {
    /* Cores escuras */
    --bg-primary: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    --text-primary: #fff;
    --card-bg: #2d2d3d;
}
```

**Explicação:**
- `--nome: valor` → define uma variável CSS
- `:root` → raiz da página (vale em tudo)
- `var(--nome)` → usa a variável
- `body.dark-mode` → quando a classe é adicionada, essas variáveis valem

#### 2. Resetando Estilos Padrão

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

**Explicação:**
- `*` → seleciona TUDO
- `margin: 0` → remove espaço externo
- `padding: 0` → remove espaço interno
- `box-sizing: border-box` → inclui border na largura

#### 3. Body e Responsividade

```css
body {
    background: var(--bg-primary);
    color: var(--text-primary);
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    transition: all 0.3s ease;
}

@media (max-width: 768px) {
    body {
        font-size: 14px;
    }
}
```

**Explicação:**
- `background` → cor/gradiente de fundo
- `color` → cor do texto
- `font-family` → tipo de letra (Poppins é a padrão do projeto)
- `transition` → animação suave (0.3s)
- `@media` → para telas menores (mobile)

#### 4. Botão de Tema

```css
.theme-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--card-bg);
    border: 2px solid var(--text-primary);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    font-size: 24px;
    transition: 0.3s;
}

.theme-toggle:hover {
    transform: scale(1.1);
    /* Fica 10% maior ao passar mouse */
}
```

**Explicação:**
- `position: fixed` → fica no mesmo lugar ao scroll
- `top: 20px; right: 20px;` → posição (20px do topo, 20px da direita)
- `border-radius: 50%` → faz um círculo perfeito
- `cursor: pointer` → muda cursor para mão
- `:hover` → estilo quando passa mouse

### Arquivo: pokedex.css

Este arquivo contém estilos específicos dos pokémons.

#### 1. Grid Responsivo

```css
.pokemons {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    list-style: none;
}

@media (max-width: 768px) {
    .pokemons {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }
}

@media (max-width: 480px) {
    .pokemons {
        grid-template-columns: 1fr;
        gap: 10px;
    }
}
```

**Explicação:**
- `display: grid` → layout em grade (linhas e colunas)
- `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))` →
  - `repeat()` → repete o padrão
  - `auto-fill` → quantas colunas couberem
  - `minmax(200px, 1fr)` → mínimo 200px, máximo 1 fração disponível
- `gap: 20px` → espaço entre itens
- `@media` → responsividade para diferentes tamanhos de tela

#### 2. Cartão de Pokémon

```css
.pokemon {
    background: var(--card-bg);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
}

.pokemon:hover {
    transform: translateY(-8px);
    /* Sobe 8px ao passar mouse */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
```

**Explicação:**
- `flex-direction: column` → itens em coluna (vertical)
- `align-items: center` → centraliza horizontalmente
- `box-shadow` → sombra sob o cartão (0 4px 12px = profundidade)
- `transform: translateY(-8px)` → move para cima
- `:hover` → efeito ao passar mouse

#### 3. Cores dos Tipos

```css
.type.grass {
    background: var(--type-grass);
}

.type.fire {
    background: var(--type-fire);
}

/* ... etc ... */
```

**Explicação:**
- Cada tipo tem sua cor
- `<li class="type grass">Grass</li>` → pega a classe `.type.grass`
- Cor é aplicada pelo CSS

#### 4. Modal (Janela de Detalhes)

```css
.modal {
    display: none;
    /* Começa escondido */
    
    position: fixed;
    /* Fica fixo na tela */
    
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    /* Fundo semi-transparente */
    
    justify-content: center;
    align-items: center;
    z-index: 1000;
    /* Fica acima de tudo */
}

.modal.show {
    display: flex;
    /* Aparece */
    
    animation: fadeIn 0.3s ease;
    /* Anima aparição */
}

.modal-content {
    background: var(--card-bg);
    border-radius: 16px;
    padding: 30px;
    max-width: 400px;
    animation: slideUp 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        transform: translateY(50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
```

**Explicação:**
- `display: none` → escondido
- `.modal.show` → quando JavaScript adiciona classe "show", aparece
- `position: fixed` → fica no lugar ao scroll
- `z-index: 1000` → fica acima de tudo
- `@keyframes` → define animação (frames)
- `animation` → aplica animação (fadeIn 0.3s)

#### 5. Botão de Favorito

```css
.favorite-btn {
    background: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
    transition: 0.2s;
}

.favorite-btn:hover {
    transform: scale(1.2);
}

.favorite-btn.active {
    /* Quando está favoritado */
    transform: scale(1.1);
    animation: heartBeat 0.6s ease;
}

@keyframes heartBeat {
    0% { transform: scale(1); }
    14% { transform: scale(1.3); }
    28% { transform: scale(1); }
    42% { transform: scale(1.3); }
    70% { transform: scale(1); }
}
```

**Explicação:**
- `background: transparent` → botão transparente
- `border: none` → sem borda
- `.active` → classe adicionada por JavaScript ao favitar
- `@keyframes heartBeat` → animação tipo batida de coração

---

## 🔄 Fluxo: HTML → CSS → JavaScript

### Exemplo Prático: Carregando um Pokémon

#### 1. HTML fornece a estrutura

```html
<ol id="pokemonList"></ol>
```

Vazia no início.

#### 2. JavaScript cria elementos

```javascript
// Em main.js
const html = `
    <li class="pokemon grass">
        <button class="favorite-btn" onclick="toggleFavorite(event, 1)">
            🤍
        </button>
        <span class="number">#001</span>
        <span class="name">Bulbasaur</span>
        <img src="..." alt="Bulbasaur">
    </li>
`;

pokemonList.innerHTML += html;
```

#### 3. CSS aplica estilo

```css
.pokemon {
    /* Cartão com sombra */
    background: var(--card-bg);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.pokemon.grass {
    /* Cor especial para tipo grass */
    border-top: 4px solid #78c850;
}
```

Resultado: Pokémon aparece na tela com estilo bonito! 🎨

---

## 💡 Dicas para Modificar

### Mudar Cores Globais

Edite `assets/css/global.css`:

```css
:root {
    --bg-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* Mude para qualquer cor ou gradiente */
}
```

### Mudar Layout (Grid)

Edite `assets/css/pokedex.css`:

```css
.pokemons {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    /* Mude minmax(200px, 1fr) para outro tamanho */
}
```

### Mudar Animações

Edite as `@keyframes` em `pokedex.css`:

```css
@keyframes slideUp {
    from {
        transform: translateY(100px);
        /* Mude 100px para outro valor */
    }
}
```

### Mudar Fonte

Edite `assets/css/global.css`:

```css
body {
    font-family: 'Arial', sans-serif;
    /* Mude 'Poppins' para outra fonte */
}
```

---

## 📱 Responsividade

O projeto usa `@media queries` para funcionar em diferentes telas:

```css
/* Desktop (padrão) */
.pokemons {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

/* Tablet (até 768px) */
@media (max-width: 768px) {
    .pokemons {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Mobile (até 480px) */
@media (max-width: 480px) {
    .pokemons {
        grid-template-columns: 1fr;
    }
}
```

**Significado:**
- Desktop: 3-4 colunas (auto-fill)
- Tablet: 2 colunas
- Mobile: 1 coluna (tela inteira)

---

## ✨ Resumo

| Arquivo | Responsabilidade |
|---------|------------------|
| `index.html` | Estrutura e elementos |
| `global.css` | Estilos globais e tema |
| `pokedex.css` | Estilos de pokémons |
| `main.js` | Lógica e interatividade |

**Fluxo:** HTML (estrutura) → CSS (visual) → JavaScript (interação)

Bom estudo! 🎨📚

