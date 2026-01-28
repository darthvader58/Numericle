export function getCountdownHTML(): string {
  return `
    <div class="countdown-container">
      <div class="countdown-label">Next puzzle in:</div>
      <div id="countdown-timer" class="countdown-timer">--:--:--</div>
    </div>
  `;
}

export function startCountdown(): void {
  const timerElement = document.getElementById('countdown-timer');
  if (!timerElement) return;

  function updateCountdown() {
    if (!timerElement) return;
    
    const now = new Date();
    const tomorrow = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0, 0, 0, 0
    ));
    
    const diff = tomorrow.getTime() - now.getTime();
    
    if (diff <= 0) {
      timerElement.textContent = '00:00:00';
      return;
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    timerElement.textContent = 
      `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}
