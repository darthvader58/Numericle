import './style.css';
import { getDailyPuzzleId, generateDailyPuzzle, getRuleDescription, getMaxDigitsForAllSequences } from './puzzleGenerator';
import { checkGuess, isWinningGuess, generateShareText } from './gameLogic';
import { saveGameState, loadGameState, hasPlayedToday } from './storage';
import { signUpWithEmail, signInWithEmail, signInWithGoogle, signOut, getCurrentUser } from './auth';
import { getUserStats, updateStatsAfterGame, submitFeedback } from './database';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { showLandingPage } from './landing';
import { getHeaderHTML } from './components/header';
import { getGameBoardHTML } from './components/gameBoard';
import { getFooterHTML } from './components/footer';
import { getHelpModalHTML, getAuthModalHTML, getStatsModalHTML, getSignInFormHTML, getSignUpFormHTML, getFeedbackModalHTML } from './components/modals';
import { getCountdownHTML, startCountdown } from './components/countdown';
import { icons } from './components/icons';
import type { GameState } from './types';

const MAX_ATTEMPTS = 10;
const MAX_HINTS = 5;
const MAX_DIGITS = getMaxDigitsForAllSequences(); // Fixed width for all puzzles
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
    ${getHeaderHTML()}
    ${getGameBoardHTML(MAX_DIGITS, MAX_HINTS)}
    ${getFooterHTML()}
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
    ${getHelpModalHTML()}
    ${getAuthModalHTML()}
    ${getStatsModalHTML()}
    ${getFeedbackModalHTML()}
  `;
}

function setupEventListeners() {
  const submitBtn = document.querySelector<HTMLButtonElement>('#submit-btn')!;
  const hintBtn = document.querySelector<HTMLButtonElement>('#hint-btn')!;
  const inputs = document.querySelectorAll<HTMLInputElement>('.sequence-input');
  const helpBtn = document.querySelector<HTMLButtonElement>('#help-btn')!;
  const authBtn = document.querySelector<HTMLButtonElement>('#auth-btn')!;
  const supportBtn = document.querySelector<HTMLButtonElement>('#support-btn');
  const homeLink = document.querySelector<HTMLAnchorElement>('#home-link');
  
  submitBtn.addEventListener('click', handleSubmit);
  hintBtn.addEventListener('click', handleHint);
  helpBtn.addEventListener('click', () => openModal('help-modal'));
  authBtn.addEventListener('click', handleAuthClick);
  
  if (supportBtn) {
    supportBtn.addEventListener('click', showFeedbackModal);
  }
  
  if (homeLink) {
    homeLink.addEventListener('click', (e) => {
      e.preventDefault();
      location.reload();
    });
  }
  
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
      
      // Limit to MAX_DIGITS
      if (value.length > MAX_DIGITS) {
        value = value.slice(0, MAX_DIGITS);
      }
      
      input.value = value;
      
      // Auto-advance to next input when MAX_DIGITS are entered
      if (value.length === MAX_DIGITS && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });
    
    // No padding on blur - keep it simple and clear for users
    input.addEventListener('blur', () => {
      // Just validate, don't modify the display
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
  if (currentUser) {
    authBtn.innerHTML = icons.stats;
  } else {
    authBtn.innerHTML = icons.user;
  }
}

function handleAuthClick() {
  if (currentUser) {
    showStatsModal();
  } else {
    showAuthModal();
  }
}

async function showAuthModal() {
  openModal('auth-modal');
  showSignInForm();
}

function showSignInForm() {
  const authContent = document.querySelector<HTMLDivElement>('#auth-content')!;
  authContent.innerHTML = getSignInFormHTML();
  
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
  authContent.innerHTML = getSignUpFormHTML();
  
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
  
  document.getElementById('show-signin')!.addEventListener('click', showSignInForm);
}

async function showStatsModal() {
  const statsContent = document.querySelector<HTMLDivElement>('#stats-content')!;
  
  if (!currentUser) return;
  
  const stats = await getUserStats(currentUser.uid);
  
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
  hintBtn.innerHTML = `
    ${icons.hint}
    Use Hint (${remaining} left)
  `;
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
    
    // Validate it's a valid number (no upper limit now)
    if (value < 0) {
      showMessage('Numbers must be positive', 'error');
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
      ${getCountdownHTML()}
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
      ${getCountdownHTML()}
    `;
  }
  
  // Start the countdown timer
  startCountdown();
  
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

function showFeedbackModal() {
  openModal('feedback-modal');
  
  const feedbackForm = document.getElementById('feedback-form') as HTMLFormElement;
  const feedbackStatus = document.getElementById('feedback-status')!;
  
  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = (document.getElementById('feedback-name') as HTMLInputElement).value;
    const email = (document.getElementById('feedback-email') as HTMLInputElement).value;
    const type = (document.getElementById('feedback-type') as HTMLSelectElement).value;
    const message = (document.getElementById('feedback-message') as HTMLTextAreaElement).value;
    
    try {
      feedbackStatus.innerHTML = '<p style="color: var(--accent);">Submitting...</p>';
      await submitFeedback(name, email, type, message);
      feedbackStatus.innerHTML = '<p style="color: var(--correct);">Thank you! Your feedback has been submitted.</p>';
      feedbackForm.reset();
      
      setTimeout(() => {
        closeModal('feedback-modal');
        feedbackStatus.innerHTML = '';
      }, 2000);
    } catch (error: any) {
      feedbackStatus.innerHTML = `<p style="color: #ff6b6b;">Error: ${error.message}</p>`;
    }
  });
}
