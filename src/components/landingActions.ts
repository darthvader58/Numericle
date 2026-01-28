export function getLandingActionsHTML(): string {
  return `
    <div class="landing-actions">
      <button id="play-guest" class="landing-primary-btn">Play as Guest</button>
      <button id="show-signin" class="landing-secondary-btn">Sign In</button>
      <button id="show-signup" class="landing-secondary-btn">Create Account</button>
    </div>
  `;
}
