import { icons } from './icons';

export function getHelpModalHTML(): string {
  return `
    <div id="help-modal" class="modal">
      <div class="modal-content">
        <button class="close-btn" data-modal="help-modal">&times;</button>
        <h2>How to Play</h2>
        <p>Guess the hidden sequence in 10 tries. Each guess must be 7 numbers.</p>
        
        <p>After each guess, the color of the tiles will change to show how close your guess was:</p>
        
        <h3>Examples</h3>
        <div class="example-row">
          ${[2, 5, 10, 17, 26, 37, 50].map((n, i) => 
            `<div class="example-cell ${i === 0 ? 'correct' : ''}">${n}</div>`
          ).join('')}
        </div>
        <p><strong style="color: #6AAA64;">Green:</strong> <strong>2</strong> is in the sequence and in the correct position.</p>
        
        <div class="example-row">
          ${[1, 4, 9, 16, 25, 36, 49].map((n, i) => 
            `<div class="example-cell ${i === 2 ? 'present' : ''}">${n}</div>`
          ).join('')}
        </div>
        <p><strong style="color: #C9B458;">Yellow:</strong> <strong>9</strong> is in the sequence but in the wrong position.</p>
        
        <div class="example-row">
          ${[3, 7, 11, 15, 19, 23, 27].map((n) => 
            `<div class="example-cell">${n}</div>`
          ).join('')}
        </div>
        <p><strong>No color change:</strong> <strong>7</strong> is not in the sequence at all.</p>
        
        <h3>Tips</h3>
        <p>• You're discovering the <em>rule</em> that generates the sequence</p>
        <p>• Think: arithmetic, geometric, polynomials, primes, Fibonacci...</p>
        <p>• Use hints (5 per game) to reveal a number</p>
        <p>• New puzzle daily at midnight GMT</p>
        <p>• Sign in to track stats and compete on leaderboard!</p>
      </div>
    </div>
  `;
}

export function getAuthModalHTML(): string {
  return `
    <div id="auth-modal" class="modal">
      <div class="modal-content">
        <button class="close-btn" data-modal="auth-modal">&times;</button>
        <div id="auth-content"></div>
      </div>
    </div>
  `;
}

export function getSignInFormHTML(): string {
  return `
    <h2>Sign In</h2>
    <form id="signin-form" class="auth-form">
      <input type="email" id="signin-email" placeholder="Email" required />
      <input type="password" id="signin-password" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
    <div class="auth-divider">or</div>
    <button id="google-signin" class="google-btn">
      ${icons.google}
      Sign in with Google
    </button>
    <div class="auth-divider">Don't have an account?</div>
    <button id="show-signup">Create Account</button>
  `;
}

export function getSignUpFormHTML(): string {
  return `
    <h2>Create Account</h2>
    <form id="signup-form" class="auth-form">
      <input type="text" id="signup-username" placeholder="Username" required />
      <input type="email" id="signup-email" placeholder="Email" required />
      <input type="password" id="signup-password" placeholder="Password (min 6 chars)" required minlength="6" />
      <button type="submit">Create Account</button>
    </form>
    <div class="auth-divider">or</div>
    <button id="google-signup" class="google-btn">
      ${icons.google}
      Sign up with Google
    </button>
    <div class="auth-divider">Already have an account?</div>
    <button id="show-signin">Sign In</button>
  `;
}

export function getStatsModalHTML(): string {
  return `
    <div id="stats-modal" class="modal">
      <div class="modal-content">
        <button class="close-btn" data-modal="stats-modal">&times;</button>
        <h2>Statistics</h2>
        <div id="user-stats"></div>
        <h3>Leaderboard</h3>
        <div id="leaderboard"></div>
      </div>
    </div>
  `;
}
