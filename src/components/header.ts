import { icons } from './icons';

export function getHeaderHTML(): string {
  return `
    <header>
      <button class="auth-btn" id="auth-btn">
        ${icons.user}
      </button>
      <div class="logo-container">
        <span class="logo">ℕ</span>
        <h1>Numericle</h1>
      </div>
      <button class="help-btn" id="help-btn" aria-label="How to play">?</button>
    </header>
  `;
}
