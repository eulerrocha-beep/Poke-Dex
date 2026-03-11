# CHANGELOG - Histórico de Mudanças

Aqui estão registradas as principais mudanças feitas no projeto da Pokédex durante o desenvolvimento.

---

# Versão 2.0 (Atual)

Nesta versão foram adicionadas várias funcionalidades novas para melhorar a Pokédex.

## 🔎 Busca por nome

Agora é possível buscar pokémons pelo nome.

* Campo de busca na parte superior da página
* Filtra os pokémons enquanto o usuário digita
* Não diferencia letras maiúsculas ou minúsculas

Arquivo principal:

```
main.js
```

---

## 🎨 Filtro por tipo

Adicionado um filtro para escolher o tipo de pokémon.

Exemplos:

* Fire
* Water
* Grass
* Electric
* etc

O usuário pode escolher um tipo e a lista será filtrada.

Arquivo:

```
index.html
main.js
```

---

## 📊 Ordenação

Agora é possível ordenar os pokémons de três formas:

* Pelo número
* Pelo nome
* Pelo tipo

Isso ajuda a organizar melhor a lista.

Arquivo:

```
main.js
```

---

## ❤️ Sistema de favoritos

Foi adicionado um sistema de favoritos.

Cada pokémon possui um botão de coração.

* 🤍 significa que não é favorito
* ❤️ significa que é favorito

Também existe um botão para mostrar **somente os favoritos**.

Os favoritos ficam salvos no navegador usando **localStorage**.

Arquivo:

```
main.js
```

---

## 📋 Modal de detalhes

Agora ao clicar na imagem de um pokémon abre uma janela com mais informações.

Informações mostradas:

* Nome
* Número
* Tipos
* Altura
* Peso
* Imagem maior

Arquivo:

```
main.js
```

---

## 🌙 Dark Mode

Adicionado modo escuro no site.

O usuário pode alternar entre:

* ☀️ Modo claro
* 🌙 Modo escuro

A preferência fica salva no navegador.

Arquivos:

```
global.css
main.js
```

---

## 📜 Infinite Scroll

Agora os pokémons carregam automaticamente ao descer a página.

Quando o usuário chega perto do final da página novos pokémons são carregados.

Isso evita ficar clicando no botão várias vezes.

Arquivo:

```
main.js
```

---

## ⚠️ Tratamento de erros

Foi adicionado tratamento de erros caso a API falhe.

Se acontecer algum erro:

* aparece uma mensagem na tela
* o botão volta ao normal

Arquivo:

```
main.js
poke-api.js
```

---

## 📱 Responsividade

A Pokédex agora funciona melhor em diferentes telas.

Layout:

* Celular → 1 coluna
* Tablet → 2 colunas
* Desktop → 3 colunas

Arquivo:

```
pokedex.css
```

---

## ⏳ Indicador de carregamento

Enquanto os pokémons estão sendo carregados o botão muda para:

```
Carregando...
```

Isso mostra para o usuário que o sistema está buscando os dados.

Arquivo:

```
main.js
```

---

## 💾 Salvando dados no navegador

Algumas informações ficam salvas no navegador usando **localStorage**:

* tema (claro ou escuro)
* pokémons favoritos

Assim quando a página é recarregada os dados continuam.

Arquivo:

```
main.js
```

---

# Versão 1.0 (Primeira versão)

Esta foi a primeira versão do projeto.

Funcionalidades básicas:

* Listagem de pokémons
* Botão **Load More**
* Grid simples
* Cores diferentes para cada tipo

Problemas que existiam:

* Não tinha busca
* Não tinha filtro
* Não tinha favoritos
* Não tinha dark mode
* Não tinha modal
* Não tinha tratamento de erro

---

# Arquivos principais do projeto

```
index.html
```

Estrutura da página.

```
assets/css/global.css
```

Estilos gerais e dark mode.

```
assets/css/pokedex.css
```

Estilos da lista de pokémons.

```
assets/js/main.js
```

Lógica principal do projeto.

```
assets/js/poke-api.js
```

Responsável por buscar os dados da API.

```
assets/js/pokemon-model.js
```

Modelo do objeto Pokémon.

---

# Próximas melhorias

Ideias para versões futuras:

* adicionar stats do pokémon
* comparador de pokémons
* animações melhores
* efeitos sonoros
* transformar em PWA
* sistema de login

---

# Aprendizados

Durante esse projeto aprendi:

* usar **API**
* trabalhar com **JavaScript**
* manipular **DOM**
* usar **localStorage**
* fazer **filtros e ordenação**
* criar **modais**
* melhorar **responsividade**

---

Projeto feito para estudo e prática de **HTML, CSS e JavaScript**.
