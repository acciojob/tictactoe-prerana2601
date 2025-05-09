//your JS code here. If required.
const submitBtn = document.getElementById('submit');
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const form = document.getElementById('player-form');
const gameSection = document.getElementById('game');
const board = document.getElementById('board');
const message = document.querySelector('.message');

let currentPlayer = 'X';
let players = {};
let boardState = Array(9).fill('');

submitBtn.addEventListener('click', () => {
  const p1 = player1Input.value.trim();
  const p2 = player2Input.value.trim();
  if (!p1 || !p2) {
    alert("Please enter both player names.");
    return;
  }

  players = {
    X: p1,
    O: p2
  };

  form.classList.add('hidden');
  gameSection.classList.remove('hidden');
  message.textContent = `${players[currentPlayer]}, you're up`;

  // Initialize board
  board.innerHTML = '';
  boardState = Array(9).fill('');
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = (i + 1).toString();
    cell.addEventListener('click', handleMove, { once: true });
    board.appendChild(cell);
  }
});

function handleMove(e) {
  const cell = e.target;
  const index = parseInt(cell.id) - 1;
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    message.textContent = `${players[currentPlayer]}, congratulations you won!`;
    Array.from(board.children).forEach(cell => cell.removeEventListener('click', handleMove));
    return;
  }

  if (boardState.every(cell => cell !== '')) {
    message.textContent = "It's a draw!";
    return;
  }

  // Switch turns
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `${players[currentPlayer]}, you're up`;
}

function checkWin(player) {
  const winCombinations = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];
  return winCombinations.some(combination =>
    combination.every(index => boardState[index] === player)
  );
}
