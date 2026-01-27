export function getFooterHTML(): string {
  return `
    <footer>
      <div class="footer-content">
        <p class="footer-made-by">
          Made with &lt;3 by <a href="https://github.com/darthvader58" target="_blank" rel="noopener noreferrer">Shashwat Raj</a>
        </p>
        <p class="footer-inspired">Inspired by <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank" rel="noopener noreferrer">New York Times' Wordle</a></p>
        <p class="footer-copyright">&copy; ${new Date().getFullYear()} Numericle. All rights reserved.</p>
      </div>
    </footer>
  `;
}

export function getLandingFooterHTML(): string {
  return `
    <footer class="landing-footer">
      <div class="footer-content">
        <p class="footer-made-by">
          Made with &lt;3 by <a href="https://github.com/darthvader58" target="_blank" rel="noopener noreferrer">Shashwat Raj</a>
        </p>
        <p class="footer-inspired">Inspired by <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank" rel="noopener noreferrer">New York Times' Wordle</a></p>
        <p class="footer-copyright">&copy; ${new Date().getFullYear()} Numericle. All rights reserved.</p>
      </div>
    </footer>
  `;
}
