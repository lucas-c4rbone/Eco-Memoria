# Eco Memória — Sons do Pantanal

Jogo educativo no **navegador**: combine **cartas de som** com **cartas de imagem** da fauna do Pantanal. Inclui três níveis de dificuldade, pontuação, timer e texto de curiosidade a cada acerto.

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/GitHub-Pages-222?logo=githubpages&logoColor=white" alt="GitHub Pages">
</p>

<p align="center">
  <!-- Depois do deploy, substitua pelo seu link público -->
  <a href="https://SEU-USUARIO.github.io/SEU-REPOSITORIO/"><strong>Jogar online (demo)</strong></a>
</p>

---

## Destaques

- **Progressão**: Fácil (4 espécies) → Médio (6) → Difícil (8).
- **Feedback**: efeitos sonoros para virar carta, acerto, erro e vitória; destaque visual em acerto/erro.
- **Pontuação**: acertos somam pontos e tempo; sequência de erros aplica penalidade (conforme regras do jogo).
- **Responsivo**: layout adaptado ao celular; aviso para jogar em **paisagem** em telas pequenas.
- **Pré-carregamento**: tela de loading enquanto imagens e áudios são carregados.

## Pré-visualização

> **Dica:** depois que o site estiver no ar, tire um **print da tela do menu**, salve como `docs/preview.png` (ou na raiz) e acrescente aqui:

```markdown
<p align="center">
  <img src="./docs/preview.png" alt="Captura do jogo Eco Memória" width="720">
</p>
```

Isso deixa o repositório bem mais convidativo para bancas e recrutadores.

## Como rodar na sua máquina

É um site **estático**: não precisa npm.

1. Clone o repositório.
2. Abra o arquivo **`index.html`** no navegador  
   *(dois cliques ou “Abrir com…”)**.

Para testar como no servidor da web (opcional):

```bash
cd Eco-Memoria
python3 -m http.server 8080
```

Acesse `http://localhost:8080`.

## Publicar com GitHub Pages

1. Crie um repositório **público** no GitHub (ex.: `eco-memoria-pantanal`).
2. Envie este projeto para o branch **`main`** (primeiro commit / push já resolve).
3. No GitHub: **Settings → Pages**.
4. Em **Source**, escolha **Deploy from a branch**.
5. Branch **`main`**, pasta **`/ (root)`**, salve.

Em até ~1 minuto (às vezes alguns minutos na primeira vez) o site aparece em:

`https://SEU-USUARIO.github.io/NOME-DO-REPO/`

Atualize o link **“Jogar online”** no topo deste README com essa URL.

### Se algo não carregar (áudio / imagem)

- Caminhos no projeto são **relativos** (`assets/...`), compatíveis com GitHub Pages na raiz do repositório.
- **Fullscreen** e **travamento de rotação** dependem do navegador e do aparelho; em alguns dispositivos o sistema ignora ou pede permissão.

## Estrutura do projeto

```text
Eco-Memoria/
├── index.html          # marcação (telas, modais, tabuleiro)
├── style.css           # layout, cartas 3D, HUD, temas por tela
├── script.js           # lógica do jogo (timer, placar, sons, preload)
├── assets/
│   ├── images/         # fotos dos animais, fundos e artes das cartas
│   ├── sounds/         # áudio por animal
│   ├── sfx/            # cliques, flip, erro, vitória…
│   └── fonts/          # tipografias customizadas
└── README.md
```

## Créditos e licença de conteúdo

Projeto desenvolvido para fins **educacionais**.

- Textos da interface estão em **português (pt-BR)**.
- Fotos, sons e fontes: **confirme uso e atribuição** conforme a licença de cada arquivo (principalmente para entrega acadêmica ou portfolio público).

## Autor

**Seu nome** — *breve linha opcional sobre você ou sobre o projeto (bolsa / curso / disciplina).* 

---

*Boa sorte na bolsa.*
