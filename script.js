// listas de arquivos para a tela de carregamento
const imageAssets = [
  "assets/images/onca.jpg",
  "assets/images/arara.jpg",
  "assets/images/jacare.jpg",
  "assets/images/tuiuiu.jpg",
  "assets/images/capivara.jpg",
  "assets/images/anta.jpg",
  "assets/images/ariranha.jpg",
  "assets/images/tamandua.jpg",
  "assets/images/frenteCard.png",
  "assets/images/costaCard.png",
  "assets/images/background.png",
  "assets/images/backgroundCard.png"
];

const audioAssets = [
  "assets/sounds/onca.mp3",
  "assets/sounds/arara.mp3",
  "assets/sounds/jacare.mp3",
  "assets/sounds/tuiuiu.mp3",
  "assets/sounds/capivara.mp3",
  "assets/sounds/anta.mp3",
  "assets/sounds/ariranha.mp3",
  "assets/sounds/tamandua.mp3",
  "assets/sfx/flip.mp3",
  "assets/sfx/match.mp3",
  "assets/sfx/wrong.mp3",
  "assets/sfx/win.mp3",
  "assets/sfx/click.mp3"
];

// variáveis do jogo
let score = 0;
let matches = 0;
let timer = null;
let timeLeft = 0;
let timerStarted = false;
let errors = 0;
let currentDifficulty = "";

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let cards = [];

// alguns elementos que eu uso direto
const board = document.getElementById("game-board");
const elMenu = document.getElementById("menu");
const elGameScreen = document.getElementById("game-screen");
const elTimer = document.getElementById("timer");
const elScore = document.getElementById("score");
const elInfo = document.getElementById("info");
const elResultModal = document.getElementById("result-modal");
const elRulesModal = document.getElementById("rules-modal");
const elNextButton = document.getElementById("next-button");

const sounds = {
  onca: new Audio("assets/sounds/onca.mp3"),
  arara: new Audio("assets/sounds/arara.mp3"),
  jacare: new Audio("assets/sounds/jacare.mp3"),
  tuiuiu: new Audio("assets/sounds/tuiuiu.mp3"),
  anta: new Audio("assets/sounds/anta.mp3"),
  capivara: new Audio("assets/sounds/capivara.mp3"),
  tamandua: new Audio("assets/sounds/tamandua.mp3"),
  ariranha: new Audio("assets/sounds/ariranha.mp3")
};

let s;
for (s in sounds) {
  sounds[s].volume = 0.3;
}

const sfx = {
  flip: new Audio("assets/sfx/flip.mp3"),
  match: new Audio("assets/sfx/match.mp3"),
  wrong: new Audio("assets/sfx/wrong.mp3"),
  win: new Audio("assets/sfx/win.mp3"),
  click: new Audio("assets/sfx/click.mp3")
};

for (s in sfx) {
  sfx[s].volume = 0.4;
}

const animals = [
  "onca",
  "arara",
  "jacare",
  "tuiuiu",
  "capivara",
  "tamandua",
  "anta",
  "ariranha"
];

const difficulties = {
  facil: 4,
  medio: 6,
  dificil: 8
};

const difficultyTime = {
  facil: 60,
  medio: 90,
  dificil: 120
};

const curiosidades = {
  onca: "A onça-pintada é o maior felino das Américas.",
  arara: "A arara-azul pode viver mais de 50 anos.",
  tuiuiu: "O tuiuiú é a ave símbolo do Pantanal.",
  jacare: "O jacaré possui mordida extremamente poderosa.",
  capivara: "A capivara é o maior roedor do mundo.",
  tamandua: "O tamanduá possui língua comprida.",
  anta: "A anta é o maior mamífero terrestre da América do Sul.",
  ariranha: "A ariranha vive em grupos."
};

function playSfx(sound) {
  sound.currentTime = 0;
  sound.play();
}

// muda fundo conforme nível (usei else if porque fica mais claro)
function setBodyBgForDifficulty(difficulty) {
  document.body.classList.remove("easy-bg", "medium-bg", "hard-bg");
  if (difficulty === "facil") {
    document.body.classList.add("easy-bg");
  } else if (difficulty === "medio") {
    document.body.classList.add("medium-bg");
  } else if (difficulty === "dificil") {
    document.body.classList.add("hard-bg");
  }
}

function startGame(difficulty) {
  playSfx(sfx.click);

  enableLandscape();

  currentDifficulty = difficulty;
  setBodyBgForDifficulty(difficulty);

  timerStarted = false;

  // precisa disso porque se reiniciar rapido pode ficar timer antigo rodando
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }

  errors = 0;
  score = 0;
  matches = 0;
  updateScore();

  firstCard = null;
  secondCard = null;
  lockBoard = false;

  elMenu.classList.add("hidden");
  elGameScreen.classList.remove("hidden");

  const quantity = difficulties[difficulty];
  generateCards(quantity);
  shuffle(cards);
  createBoard();

  board.className = "";
  board.classList.add(difficulty + "-board");

  timeLeft = difficultyTime[difficulty];
  elTimer.innerText = String(timeLeft);

  closeModal();
}

function generateCards(quantity) {
  cards = [];

  let copiaAnimais = animals.slice();
  shuffle(copiaAnimais);

  let i;
  let escolhidos = [];
  for (i = 0; i < quantity; i++) {
    escolhidos.push(copiaAnimais[i]);
  }

  for (i = 0; i < escolhidos.length; i++) {
    const nomeAnimal = escolhidos[i];
    cards.push({ animal: nomeAnimal, tipo: "imagem" });
    cards.push({ animal: nomeAnimal, tipo: "som" });
  }
}

// embaralhar estilo Fisher-Yates mas com variavel temp porque eu prefiro ler assim
function shuffle(array) {
  let i = array.length - 1;
  while (i > 0) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    i = i - 1;
  }
}

function openRules() {
  playSfx(sfx.click);
  elRulesModal.classList.remove("hidden");
}

function closeRules() {
  playSfx(sfx.click);
  elRulesModal.classList.add("hidden");
}

function createBoard() {
  board.innerHTML = "";

  let k;
  for (k = 0; k < cards.length; k++) {
    const dadosCarta = cards[k];

    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML =
      '<div class="card-inner">' +
      '<div class="card-front"></div>' +
      '<div class="card-back"></div>' +
      "</div>";

    div.addEventListener("click", function () {
      handleClick(div, dadosCarta);
    });

    board.appendChild(div);
  }

  init3DEffect();
}

// efeito 3d no mouse (no celular o css ja desliga)
function init3DEffect() {
  const allCards = document.querySelectorAll(".card");
  let c;
  for (c = 0; c < allCards.length; c++) {
    const card = allCards[c];

    card.addEventListener("mousemove", function (e) {
      if (window.innerWidth <= 768) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = (x - centerX) / 18;
      const rotateX = -(y - centerY) / 18;

      card.style.transform =
        "rotateX(" +
        rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg) translateY(-6px) scale(1.03)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform =
        "rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
    });
  }
}

function handleClick(element, card) {
  if (timerStarted === false) {
    startTimer();
    timerStarted = true;
  }

  if (element.classList.contains("matched")) {
    return;
  }
  if (lockBoard === true) {
    return;
  }

  // nao deixa clicar de novo na mesma carta da primeira jogada
  if (firstCard !== null && element === firstCard.element) {
    return;
  }

  revealCard(element, card);

  if (firstCard === null) {
    firstCard = { element: element, card: card };
    return;
  }

  secondCard = { element: element, card: card };
  lockBoard = true;
  checkMatch();
}

function revealCard(element, card) {
  element.classList.add("flipped");
  playSfx(sfx.flip);

  const back = element.querySelector(".card-back");

  if (card.tipo === "imagem") {
    const img = document.createElement("img");
    img.src = "assets/images/" + card.animal + ".jpg";
    if (card.animal === "tamandua") {
      img.classList.add("tamandua-img");
    }
    back.innerHTML = "";
    back.appendChild(img);
  } else {
    stopAllSounds();
    const audio = sounds[card.animal];
    audio.currentTime = 0;
    audio.play();
    back.innerHTML = '<div class="sound-card">🔊</div>';
  }
}

function checkMatch() {
  const a1 = firstCard.card.animal;
  const a2 = secondCard.card.animal;
  const t1 = firstCard.card.tipo;
  const t2 = secondCard.card.tipo;

  const isMatch = a1 === a2 && t1 !== t2;

  if (isMatch) {
    playSfx(sfx.match);
    score = score + 100;
    timeLeft = timeLeft + 5;
    elTimer.innerText = String(timeLeft);
    updateScore();
    matches = matches + 1;

    firstCard.element.classList.add("correct");
    secondCard.element.classList.add("correct");
    firstCard.element.classList.add("matched");
    secondCard.element.classList.add("matched");

    showInfo(firstCard.card.animal);

    const totalMatchesNeeded = difficulties[currentDifficulty];
    if (matches === totalMatchesNeeded) {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
      playSfx(sfx.win);

      const baseScore = score;
      const bonus = timeLeft;
      const total = baseScore + bonus;
      score = total;
      updateScore();

      window.setTimeout(function () {
        const mostrarProximo = currentDifficulty !== "dificil";
        showResult(
          "Parabéns! Você venceu!",
          baseScore,
          bonus,
          total,
          mostrarProximo
        );
      }, 500);
    }

    resetTurn();
  } else {
    playSfx(sfx.wrong);
    score = score - 10;
    if (score < 0) {
      score = 0;
    }
    updateScore();

    firstCard.element.classList.add("wrong");
    secondCard.element.classList.add("wrong");

    errors = errors + 1;
    if (errors > 1) {
      timeLeft = timeLeft - 3;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
      elTimer.innerText = String(timeLeft);
    }

    window.setTimeout(function () {
      hideCard(firstCard.element);
      hideCard(secondCard.element);
      firstCard.element.classList.remove("wrong");
      secondCard.element.classList.remove("wrong");
      resetTurn();
    }, 1000);
  }
}

function hideCard(element) {
  element.classList.remove("flipped");
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function updateScore() {
  elScore.innerText = String(score);
}

function showInfo(animal) {
  let texto = curiosidades[animal];
  if (texto === undefined) {
    texto = "";
  }
  elInfo.innerText = texto;
}

function startTimer() {
  elTimer.innerText = String(timeLeft);

  timer = window.setInterval(function () {
    timeLeft = timeLeft - 1;
    elTimer.innerText = String(timeLeft);

    if (timeLeft <= 0) {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
      showResult("Tempo esgotado!", score, 0, score, false);
    }
  }, 1000);
}

function showResult(title, baseScore, bonus, total, showNext) {
  if (showNext === undefined) {
    showNext = true;
  }

  elResultModal.classList.remove("hidden");
  elGameScreen.classList.add("game-blurred");

  document.getElementById("result-title").innerText = title;
  document.getElementById("result-base-score").innerText =
    "Pontuação: " + baseScore;
  document.getElementById("result-bonus").innerText =
    "Bônus de tempo: " + bonus;
  document.getElementById("result-total").innerText = "Total: " + total;

  if (showNext) {
    elNextButton.style.display = "block";
  } else {
    elNextButton.style.display = "none";
  }
}

function closeModal() {
  elResultModal.classList.add("hidden");
  elGameScreen.classList.remove("game-blurred");
}

function restartGame() {
  playSfx(sfx.click);
  closeModal();
  startGame(currentDifficulty);
}

function goToMenu() {
  playSfx(sfx.click);
  closeModal();

  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }

  elGameScreen.classList.add("hidden");
  elMenu.classList.remove("hidden");
}

function nextDifficulty() {
  playSfx(sfx.click);
  closeModal();

  if (currentDifficulty === "facil") {
    startGame("medio");
    return;
  }
  if (currentDifficulty === "medio") {
    startGame("dificil");
  }
}

function stopAllSounds() {
  let key;
  for (key in sounds) {
    sounds[key].pause();
    sounds[key].currentTime = 0;
  }
}

// tenta fullscreen + landscape (nem sempre funciona no iphone etc)
async function enableLandscape() {
  try {
    if (document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen();
    }
    if (screen.orientation && screen.orientation.lock) {
      await screen.orientation.lock("landscape");
    }
  } catch (err) {
    console.log("fullscreen/orientation falhou:", err);
  }
}

async function preloadAssets() {
  const lista = [];
  let i;
  for (i = 0; i < imageAssets.length; i++) {
    lista.push(imageAssets[i]);
  }
  for (i = 0; i < audioAssets.length; i++) {
    lista.push(audioAssets[i]);
  }

  let loaded = 0;

  function marcaUm() {
    loaded = loaded + 1;
    const percent = Math.floor((loaded / lista.length) * 100);
    document.getElementById("loading-fill").style.width = percent + "%";
    document.getElementById("loading-percent").innerText = percent + "%";
  }

  const promises = [];
  let p;

  for (p = 0; p < lista.length; p++) {
    const src = lista[p];

    const umaPromise = new Promise(function (resolve) {
      function terminar() {
        marcaUm();
        resolve();
      }

      if (
        src.endsWith(".png") ||
        src.endsWith(".jpg") ||
        src.endsWith(".jpeg")
      ) {
        const img = new Image();
        img.onload = terminar;
        img.onerror = terminar;
        img.src = src;
      } else {
        const audio = new Audio();
        audio.onloadeddata = terminar;
        audio.onerror = terminar;
        audio.src = src;
      }
    });

    promises.push(umaPromise);
  }

  await Promise.all(promises);

  window.setTimeout(function () {
    document.getElementById("loading-screen").style.display = "none";
  }, 400);
}

preloadAssets();
