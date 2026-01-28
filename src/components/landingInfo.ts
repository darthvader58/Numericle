import { icons } from './icons';

export function getLandingInfoHTML(): string {
  return `
    <div class="landing-info">
      <div class="landing-info-item">
        ${icons.question}
        <p>Guess the 7-number sequence in 10 guesses</p>
      </div>
      <div class="landing-info-item">
        ${icons.pen}
        <p>Discover mathematical patterns and rules</p>
      </div>
    </div>
  `;
}
