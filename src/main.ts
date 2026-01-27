import './style.css';
import { getDailyPuzzleId, generateDailyPuzzle, getRuleDescription } from './puzzleGenerator';
import { checkGuess, isWinningGuess, generateShareText } from './gameLogic';
import { saveGameState, loadGameState, hasPlayedToday } from './storage';
import { signUpWithEmail, signInWithEmail, signInWithGoogle, signOut, getCurrentUser } from './auth';
import { getUserStats, updateStatsAfterGame, getLeaderboard } from './database';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { showLandingPage } from './landing';
import type { GameState } from './types';

const MAX_ATTEMPTS = 10;
const MAX_HINTS = 1;
let currentPuzzle = generateDailyPuzzle(getDailyPuzzleId());
let gameState: GameState;
let currentUser = getCurrentUser();

// Check if user has already started playing today
const puzzleId = getDailyPuzzleId();
const hasStarted = hasPlayedToday(puzzleId);

if (!hasStarted) {
  // Show landing page
  showLandingPage(() => {
    initGame();
  });
} else {
  // Go directly to game
  initGame();
}

function initGame() {
  const app = document.querySelector<HTMLDivElement>('#app')!;
  
  app.innerHTML = `
    <header>
      <button class="auth-btn" id="auth-btn">👤</button>
      <div class="logo-container">
        <span class="logo">ℕ</span>
        <h1>Numericle</h1>
      </div>
      <button class="help-btn" id="help-btn" aria-label="How to play">?</button>
    </header>
    
    <main>
      <div id="game-board"></div>
      
      <div id="input-section">
        <div class="input-row">
          ${Array(7).fill(0).map((_, i) => `<input type="text" inputmode="numeric" maxlength="2" class="sequence-input" data-index="${i}" />`).join('')}
        </div>
        <button id="submit-btn">Submit Guess</button>
        <button id="hint-btn" class="hint-btn">💡 Use Hint (${MAX_HINTS} left)</button>
      </div>
      
      <div id="message"></div>
      
      <div id="stats" style="display: none;">
        <button id="share-btn">Share Result</button>
      </div>
    </main>
    
    ${getModalsHTML()}
  `;

  const puzzleId = getDailyPuzzleId();
  
  if (hasPlayedToday(puzzleId)) {
    gameState = loadGameState()!;
    renderBoard();
    updateHintButton();
    if (gameState.isComplete) {
      endGame();
    }
  } else {
    gameState = {
      attempts: [],
      results: [],
      isComplete: false,
      isWon: false,
      dailyPuzzleId: puzzleId,
      hintsUsed: 0,
      revealedIndices: []
    };
  }

  setupEventListeners();
  setupAuthListener();
}

function getModalsHTML(): string {
  return `
    <div id="help-modal" class="modal">
      <div class="modal-content">
        <button class="close-btn" data-modal="help-modal">&times;</button>
        <h2>How to Play</h2>
        <p>Guess the hidden sequence in ${MAX_ATTEMPTS} tries. Each guess must be 7 numbers.</p>
        
        <p>After each guess, the color of the tiles will change to show how close your guess was:</p>
        
        <h3>Examples</h3>
        <div class="example-row">
          ${[2, 5, 10, 17, 26, 37, 50].map((n, i) => 
            `<div class="example-cell ${i === 0 ? 'correct' : ''}">${n}</div>`
          ).join('')}
        </div>
        <p><strong>2</strong> is in the sequence and in the correct position.</p>
        
        <div class="example-row">
          ${[1, 4, 9, 16, 25, 36, 49].map((n, i) => 
            `<div class="example-cell ${i === 2 ? 'present' : ''}">${n}</div>`
          ).join('')}
        </div>
        <p><strong>9</strong> is in the sequence but in the wrong position.</p>
        
        <div class="example-row">
          ${[3, 7, 11, 15, 19, 23, 27].map((n, i) => 
            `<div class="example-cell ${i === 1 ? 'absent' : ''}">${n}</div>`
          ).join('')}
        </div>
        <p><strong>7</strong> is not in the sequence.</p>
        
        <h3>Tips</h3>
        <p>• You're discovering the <em>rule</em> that generates the sequence</p>
        <p>• Think: arithmetic, geometric, polynomials, primes, Fibonacci...</p>
        <p>• Use hints (${MAX_HINTS} per game) to reveal a number</p>
        <p>• New puzzle daily at midnight GMT</p>
        <p>• Sign in to track stats and compete on leaderboard!</p>
      </div>
    </div>
    
    <div id="auth-modal" class="modal">
      <div class="modal-content">
        <button class="close-btn" data-modal="auth-modal">&times;</button>
        <div id="auth-content"></div>
      </div>
    </div>
    
    <div id="stats-modal" class="modal">
      <div class="modal-content">
        <button class="close-btn" data-modal="stats-modal">&times;</button>
        <div id="stats-content"></div>
      </div>
    </div>
  `;
}

function setupEventListeners() {
  const submitBtn = document.querySelector<HTMLButtonElement>('#submit-btn')!;
  const hintBtn = document.querySelector<HTMLButtonElement>('#hint-btn')!;
  const inputs = document.querySelectorAll<HTMLInputElement>('.sequence-input');
  const helpBtn = document.querySelector<HTMLButtonElement>('#help-btn')!;
  const authBtn = document.querySelector<HTMLButtonElement>('#auth-btn')!;
  
  submitBtn.addEventListener('click', handleSubmit);
  hintBtn.addEventListener('click', handleHint);
  helpBtn.addEventListener('click', () => openModal('help-modal'));
  authBtn.addEventListener('click', handleAuthClick);
  
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modalId = (e.target as HTMLElement).dataset.modal;
      if (modalId) closeModal(modalId);
    });
  });
  
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });
  
  inputs.forEach((input, index) => {
    // Handle keyboard navigation
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        } else {
          handleSubmit();
        }
      } else if (e.key === 'Backspace' && input.value === '' && index > 0) {
        // Move to previous input on backspace if current is empty
        inputs[index - 1].focus();
      }
    });
    
    // Handle input changes
    input.addEventListener('input', () => {
      let value = input.value.replace(/\D/g, ''); // Remove non-digits
      
      // Limit to 2 digits
      if (value.length > 2) {
        value = value.slice(0, 2);
      }
      
      input.value = value;
      
      // Auto-advance to next input when 2 digits are entered
      if (value.length === 2 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });
    
    // Format on blur (when leaving the input)
    input.addEventListener('blur', () => {
      if (input.value.length === 1) {
        input.value = '0' + input.value;
      }
    });
  });

  const shareBtn = document.querySelector<HTMLButtonElement>('#share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', handleShare);
  }
}

function setupAuthListener() {
  if (!auth) return;
  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    updateAuthButton();
  });
}

function updateAuthButton() {
  const authBtn = document.querySelector<HTMLButtonElement>('#auth-btn')!;
  authBtn.textContent = currentUser ? '📊' : '👤';
}

function handleAuthClick() {
  if (currentUser) {
    showStatsModal();
  } else {
    showAuthModal();
  }
}

async function showAuthModal() {
  const authContent = document.querySelector<HTMLDivElement>('#auth-content')!;
  authContent.innerHTML = `
    <h2>Sign In</h2>
    <form id="signin-form" class="auth-form">
      <input type="email" id="signin-email" placeholder="Email" required />
      <input type="password" id="signin-password" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
    <div class="auth-divider">or</div>
    <button id="google-signin" class="google-btn">
      <span>🔐</span> Sign in with Google
    </button>
    <div class="auth-divider">Don't have an account?</div>
    <button id="show-signup">Create Account</button>
  `;
  
  openModal('auth-modal');
  
  document.getElementById('signin-form')!.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('signin-email') as HTMLInputElement).value;
    const password = (document.getElementById('signin-password') as HTMLInputElement).value;
    
    try {
      await signInWithEmail(email, password);
      closeModal('auth-modal');
      showMessage('Signed in successfully!', 'success');
    } catch (error: any) {
      showMessage(error.message, 'error');
    }
  });
  
  document.getElementById('google-signin')!.addEventListener('click', async () => {
    try {
      await signInWithGoogle();
      closeModal('auth-modal');
      showMessage('Signed in successfully!', 'success');
    } catch (error: any) {
      showMessage(error.message, 'error');
    }
  });
  
  document.getElementById('show-signup')!.addEventListener('click', showSignUpForm);
}

function showSignUpForm() {
  const authContent = document.querySelector<HTMLDivElement>('#auth-content')!;
  authContent.innerHTML = `
    <h2>Create Account</h2>
    <form id="signup-form" class="auth-form">
      <input type="text" id="signup-username" placeholder="Username" required />
      <input type="email" id="signup-email" placeholder="Email" required />
      <input type="password" id="signup-password" placeholder="Password (min 6 chars)" required minlength="6" />
      <button type="submit">Create Account</button>
    </form>
    <div class="auth-divider">or</div>
    <button id="google-signup" class="google-btn">
      <span>🔐</span> Sign up with Google
    </button>
    <div class="auth-divider">Already have an account?</div>
    <button id="show-signin">Sign In</button>
  `;
  
  document.getElementById('signup-form')!.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = (document.getElementById('signup-username') as HTMLInputElement).value;
    const email = (document.getElementById('signup-email') as HTMLInputElement).value;
    const password = (document.getElementById('signup-password') as HTMLInputElement).value;
    
    try {
      await signUpWithEmail(email, password, username);
      closeModal('auth-modal');
      showMessage('Account created successfully!', 'success');
    } catch (error: any) {
      showMessage(error.message, 'error');
    }
  });
  
  document.getElementById('google-signup')!.addEventListener('click', async () => {
    try {
      await signInWithGoogle();
      closeModal('auth-modal');
      showMessage('Account created successfully!', 'success');
    } catch (error: any) {
      showMessage(error.message, 'error');
    }
  });
  
  document.getElementById('show-signin')!.addEventListener('click', showAuthModal);
}

async function showStatsModal() {
  const statsContent = document.querySelector<HTMLDivElement>('#stats-content')!;
  
  if (!currentUser) return;
  
  const stats = await getUserStats(currentUser.uid);
  const leaderboard = await getLeaderboard();
  
  if (!stats) return;
  
  const winRate = stats.gamesPlayed > 0 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0;
  
  statsContent.innerHTML = `
    <h2>Your Stats</h2>
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-value">${stats.gamesPlayed}</div>
        <div class="stat-label">Played</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">${winRate}%</div>
        <div class="stat-label">Win Rate</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">${stats.currentStreak}</div>
        <div class="stat-label">Current Streak</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">${stats.maxStreak}</div>
        <div class="stat-label">Max Streak</div>
      </div>
    </div>
    
    <h3>Leaderboard</h3>
    <ul class="leaderboard-list">
      ${leaderboard.map((entry, index) => `
        <li class="leaderboard-item">
          <div class="user-info">
            <span class="rank">#${index + 1}</span>
            <span>${entry.username}</span>
          </div>
          <div>
            <strong>${entry.gamesWon}</strong> wins
            <span style="color: var(--key-bg); margin-left: 8px;">🔥 ${entry.currentStreak}</span>
          </div>
        </li>
      `).join('')}
    </ul>
    
    <button id="signout-btn" style="margin-top: 20px;">Sign Out</button>
  `;
  
  openModal('stats-modal');
  
  document.getElementById('signout-btn')!.addEventListener('click', async () => {
    await signOut();
    closeModal('stats-modal');
    showMessage('Signed out successfully', 'info');
  });
}

function openModal(modalId: string) {
  document.getElementById(modalId)?.classList.add('active');
}

function closeModal(modalId: string) {
  document.getElementById(modalId)?.classList.remove('active');
}

function handleHint() {
  if (gameState.isComplete || gameState.hintsUsed >= MAX_HINTS) return;
  
  const availableIndices = Array.from({ length: 7 }, (_, i) => i)
    .filter(i => !gameState.revealedIndices.includes(i));
  
  if (availableIndices.length === 0) return;
  
  const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  gameState.revealedIndices.push(randomIndex);
  gameState.hintsUsed++;
  
  saveGameState(gameState);
  renderBoard();
  updateHintButton();
  showMessage(`Hint: Position ${randomIndex + 1} is ${currentPuzzle.sequence[randomIndex]}`, 'info');
}

function updateHintButton() {
  const hintBtn = document.querySelector<HTMLButtonElement>('#hint-btn')!;
  const remaining = MAX_HINTS - gameState.hintsUsed;
  hintBtn.textContent = `💡 Use Hint (${remaining} left)`;
  hintBtn.disabled = gameState.isComplete || remaining === 0;
}

function handleSubmit() {
  if (gameState.isComplete) return;

  const inputs = document.querySelectorAll<HTMLInputElement>('.sequence-input');
  const guess: number[] = [];
  
  for (const input of inputs) {
    // Format single digit as 0x before validation
    if (input.value.length === 1) {
      input.value = '0' + input.value;
    }
    
    const value = parseInt(input.value);
    if (isNaN(value) || input.value === '') {
      showMessage('Please fill all fields with numbers', 'error');
      return;
    }
    
    // Validate it's a 1 or 2 digit number (0-99)
    if (value < 0 || value > 99) {
      showMessage('Numbers must be between 0 and 99', 'error');
      return;
    }
    
    guess.push(value);
  }

  const results = checkGuess(guess, currentPuzzle.sequence);
  gameState.results.push(results);
  gameState.attempts.push(...guess);

  if (isWinningGuess(results)) {
    gameState.isWon = true;
    gameState.isComplete = true;
  } else if (gameState.results.length >= MAX_ATTEMPTS) {
    gameState.isComplete = true;
  }

  saveGameState(gameState);
  renderBoard();
  clearInputs();

  if (gameState.isComplete) {
    endGame();
  }
}

function renderBoard() {
  const board = document.querySelector<HTMLDivElement>('#game-board')!;
  board.innerHTML = '';

  // Render revealed hints as a row
  if (gameState.revealedIndices.length > 0) {
    const hintRow = document.createElement('div');
    hintRow.className = 'guess-row';
    
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('div');
      if (gameState.revealedIndices.includes(j)) {
        cell.className = 'cell revealed';
        cell.textContent = currentPuzzle.sequence[j].toString();
      } else {
        cell.className = 'cell';
        cell.textContent = '';
      }
      hintRow.appendChild(cell);
    }
    
    board.appendChild(hintRow);
  }

  // Render guesses
  for (let i = 0; i < gameState.results.length; i++) {
    const row = document.createElement('div');
    row.className = 'guess-row';
    
    const guessValues = gameState.attempts.slice(i * 7, (i + 1) * 7);
    const results = gameState.results[i];
    
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('div');
      cell.className = `cell ${results[j]}`;
      cell.textContent = guessValues[j].toString();
      row.appendChild(cell);
    }
    
    board.appendChild(row);
  }
}

function clearInputs() {
  const inputs = document.querySelectorAll<HTMLInputElement>('.sequence-input');
  inputs.forEach(input => input.value = '');
  inputs[0].focus();
}

function showMessage(text: string, type: 'error' | 'success' | 'info' = 'info') {
  const message = document.querySelector<HTMLDivElement>('#message')!;
  message.textContent = text;
  message.className = type;
}

async function endGame() {
  const inputSection = document.querySelector<HTMLDivElement>('#input-section')!;
  const stats = document.querySelector<HTMLDivElement>('#stats')!;
  const message = document.querySelector<HTMLDivElement>('#message')!;
  
  inputSection.style.display = 'none';
  stats.style.display = 'block';

  const ruleDescription = getRuleDescription(currentPuzzle.rule);
  
  if (gameState.isWon) {
    message.innerHTML = `
      <div class="success">
        You discovered the sequence in ${gameState.results.length} ${gameState.results.length === 1 ? 'guess' : 'guesses'}!
      </div>
      <div class="solution-info">
        <div class="solution-sequence">
          <strong>Solution:</strong> ${currentPuzzle.sequence.join(', ')}
        </div>
        <div class="solution-rule">
          <strong>Rule:</strong> ${ruleDescription}
        </div>
      </div>
    `;
  } else {
    message.innerHTML = `
      <div class="info">
        Better luck next time!
      </div>
      <div class="solution-info">
        <div class="solution-sequence">
          <strong>Solution:</strong> ${currentPuzzle.sequence.join(', ')}
        </div>
        <div class="solution-rule">
          <strong>Rule:</strong> ${ruleDescription}
        </div>
      </div>
    `;
  }
  
  // Update Firebase stats if user is logged in
  if (currentUser) {
    try {
      await updateStatsAfterGame(currentUser.uid, gameState);
    } catch (error) {
      console.error('Failed to update stats:', error);
    }
  }
}

function handleShare() {
  const shareText = generateShareText(gameState.results, gameState.dailyPuzzleId, gameState.isWon);
  navigator.clipboard.writeText(shareText).then(() => {
    showMessage('Copied to clipboard!', 'success');
  }).catch(() => {
    showMessage('Failed to copy', 'error');
  });
}
