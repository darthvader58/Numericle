import { icons } from './icons';

export function getGameBoardHTML(maxDigits: number, maxHints: number): string {
  return `
    <main>
      <div id="game-board"></div>
      
      <div id="input-section">
        <div class="input-row">
          ${Array(7).fill(0).map((_, i) => `<input type="text" inputmode="numeric" maxlength="${maxDigits}" class="sequence-input" data-index="${i}" />`).join('')}
        </div>
        <button id="submit-btn">Submit Guess</button>
        <button id="hint-btn" class="hint-btn">
          ${icons.hint}
          Use Hint (${maxHints} left)
        </button>
      </div>
      
      <div id="message"></div>
      
      <div id="stats" style="display: none;">
        <button id="share-btn">Share Result</button>
      </div>
    </main>
  `;
}
