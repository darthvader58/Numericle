export function getFooterHTML(): string {
  return `
    <footer>
      <div class="footer-content">
        <div class="footer-row">
          <button id="support-btn" class="footer-link-btn">Feedback</button>
          <span class="footer-separator">•</span>
          <a href="https://github.com/sponsors/darthvader58" target="_blank" rel="noopener noreferrer" class="footer-link">Sponsor</a>
          <span class="footer-separator">•</span>
          <span class="footer-text">Made with &lt;3 by <a href="https://github.com/darthvader58" target="_blank" rel="noopener noreferrer">Shashwat Raj</a></span>
          <span class="footer-separator">•</span>
          <span class="footer-text">Inspired by <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank" rel="noopener noreferrer">New York Times Wordle</a></span>
          <span class="footer-separator">•</span>
          <span class="footer-text">&copy; ${new Date().getFullYear()} Numericle, All Rights Reserved</span>
        </div>
      </div>
    </footer>
  `;
}

export function getLandingFooterHTML(): string {
  return `
    <footer class="landing-footer">
      <div class="footer-content">
        <div class="footer-row">
          <button id="support-btn" class="footer-link-btn">Feedback</button>
          <span class="footer-separator">•</span>
          <a href="https://github.com/sponsors/darthvader58" target="_blank" rel="noopener noreferrer" class="footer-link">Sponsor</a>
          <span class="footer-separator">•</span>
          <span class="footer-text">Made with &lt;3 by <a href="https://github.com/darthvader58" target="_blank" rel="noopener noreferrer">Shashwat Raj</a></span>
          <span class="footer-separator">•</span>
          <span class="footer-text">Inspired by <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank" rel="noopener noreferrer">New York Times Wordle</a></span>
          <span class="footer-separator">•</span>
          <span class="footer-text">&copy; ${new Date().getFullYear()} Numericle, All Rights Reserved</span>
        </div>
      </div>
    </footer>
  `;
}
