import { icons } from './icons';

export function getHeaderHTML(): string {
  return `
    <header>
      <button class="auth-btn" id="auth-btn">
        ${icons.user}
      </button>
      <a href="/" class="logo-container" id="home-link">
        <span class="logo">ℕ</span>
        <h1>umericle</h1>
      </a>
      <button class="help-btn" id="help-btn" aria-label="How to play">?</button>
    </header>
  `;
}
