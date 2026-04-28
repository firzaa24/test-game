document.addEventListener('DOMContentLoaded', () => {
  const gameArea = document.getElementById('gameArea');
  const scoreDisplay = document.getElementById('score');
  const levelDisplay = document.getElementById('level');
  const timerDisplay = document.getElementById('timer');

  let score = 0;
  let level = 1;
  let timer;
  let timeLeft = 5;

  function clamp(value) {
    return Math.max(0, Math.min(255, value));
  }

  function getGridSize() {
    return Math.min(2 + level, 8);
  }

  function generateColors() {
    const baseR = Math.floor(Math.random() * 200);
    const baseG = Math.floor(Math.random() * 200);
    const baseB = Math.floor(Math.random() * 200);

    const diff = Math.max(3, 40 - level * 3);

    return {
      normal: `rgb(${baseR}, ${baseG}, ${baseB})`,
      different: `rgb(${clamp(baseR + diff)}, ${clamp(baseG + diff)}, ${clamp(baseB + diff)})`
    };
  }

  function startTimer() {
    clearInterval(timer);
    timeLeft = Math.max(2, 6 - Math.floor(level / 2));
    timerDisplay.textContent = timeLeft;

    timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timer);
        alert('Time Up! Game Over');
        resetGame();
      }
    }, 1000);
  }

  function createBoard() {
    gameArea.innerHTML = '';

    const size = getGridSize();
    gameArea.style.gridTemplateColumns = `repeat(${size}, 60px)`;

    const totalTiles = size * size;
    const { normal, different } = generateColors();
    const differentIndex = Math.floor(Math.random() * totalTiles);

    for (let i = 0; i < totalTiles; i++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.style.backgroundColor = (i === differentIndex) ? different : normal;

      tile.addEventListener('click', () => {
        if (i === differentIndex) {
          score++;
          level++;
          updateUI();
          createBoard();
          startTimer();
        } else {
          alert('Wrong! Game Over');
          resetGame();
        }
      });

      gameArea.appendChild(tile);
    }
  }

  function updateUI() {
    scoreDisplay.textContent = score;
    levelDisplay.textContent = level;
  }

  function resetGame() {
    score = 0;
    level = 1;
    updateUI();
    createBoard();
    startTimer();
  }

  updateUI();
  createBoard();
  startTimer();
});
