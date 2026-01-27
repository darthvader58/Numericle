import { signInWithEmail, signInWithGoogle, signUpWithEmail } from './auth';

export function showLandingPage(onStart: () => void): void {
  const app = document.querySelector<HTMLDivElement>('#app')!;
  
  app.innerHTML = `
    <div class="landing-page">
      <div class="landing-content">
        <div class="landing-header">
          <span class="landing-logo">ℕ</span>
          <h1 class="landing-title">Numericle</h1>
          <p class="landing-subtitle">Discover the hidden sequence rule</p>
        </div>
        
        <div class="landing-actions">
          <button id="play-guest" class="primary-btn">Play as Guest</button>
          <button id="show-signin" class="secondary-btn">Sign In</button>
          <button id="show-signup" class="secondary-btn">Create Account</button>
        </div>
        
        <div class="landing-info">
          <div class="info-item">
            <svg class="info-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <circle cx="12" cy="17" r="0.5" fill="currentColor"></circle>
            </svg>
            <p>Guess the 7-number sequence in 10 guesses</p>
          </div>
          <div class="info-item">
            <svg class="info-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
              <path d="M2 2l7.586 7.586"></path>
              <circle cx="11" cy="11" r="2"></circle>
            </svg>
            <p>Discover mathematical patterns and rules</p>
          </div>
        </div>
      </div>
    </div>
    
    <div id="auth-modal" class="modal">
      <div class="modal-content">
        <button class="close-btn" id="close-auth">&times;</button>
        <div id="auth-content"></div>
      </div>
    </div>
  `;
  
  document.getElementById('play-guest')!.addEventListener('click', () => {
    onStart();
  });
  
  document.getElementById('show-signin')!.addEventListener('click', () => {
    showSignInModal(onStart);
  });
  
  document.getElementById('show-signup')!.addEventListener('click', () => {
    showSignUpModal(onStart);
  });
}

function showSignInModal(onStart: () => void): void {
  const authContent = document.querySelector<HTMLDivElement>('#auth-content')!;
  const modal = document.getElementById('auth-modal')!;
  
  authContent.innerHTML = `
    <h2>Sign In</h2>
    <form id="signin-form" class="auth-form">
      <input type="email" id="signin-email" placeholder="Email" required />
      <input type="password" id="signin-password" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
    <div class="auth-divider">or</div>
    <button id="google-signin" class="google-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
      Sign in with Google
    </button>
    <div class="auth-divider">
      <a href="#" id="switch-signup">Don't have an account? Create one</a>
    </div>
  `;
  
  modal.classList.add('active');
  
  document.getElementById('close-auth')!.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
  
  document.getElementById('signin-form')!.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('signin-email') as HTMLInputElement).value;
    const password = (document.getElementById('signin-password') as HTMLInputElement).value;
    
    try {
      await signInWithEmail(email, password);
      modal.classList.remove('active');
      onStart();
    } catch (error: any) {
      alert(error.message);
    }
  });
  
  document.getElementById('google-signin')!.addEventListener('click', async () => {
    try {
      await signInWithGoogle();
      modal.classList.remove('active');
      onStart();
    } catch (error: any) {
      alert(error.message);
    }
  });
  
  document.getElementById('switch-signup')!.addEventListener('click', (e) => {
    e.preventDefault();
    showSignUpModal(onStart);
  });
}

function showSignUpModal(onStart: () => void): void {
  const authContent = document.querySelector<HTMLDivElement>('#auth-content')!;
  const modal = document.getElementById('auth-modal')!;
  
  authContent.innerHTML = `
    <h2>Create Account</h2>
    <form id="signup-form" class="auth-form">
      <input type="text" id="signup-username" placeholder="Username" required />
      <input type="email" id="signup-email" placeholder="Email" required />
      <input type="password" id="signup-password" placeholder="Password (min 6 chars)" required minlength="6" />
      <button type="submit">Create Account</button>
    </form>
    <div class="auth-divider">or</div>
    <button id="google-signup" class="google-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
      Sign up with Google
    </button>
    <div class="auth-divider">
      <a href="#" id="switch-signin">Already have an account? Sign in</a>
    </div>
  `;
  
  modal.classList.add('active');
  
  document.getElementById('close-auth')!.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
  
  document.getElementById('signup-form')!.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = (document.getElementById('signup-username') as HTMLInputElement).value;
    const email = (document.getElementById('signup-email') as HTMLInputElement).value;
    const password = (document.getElementById('signup-password') as HTMLInputElement).value;
    
    try {
      await signUpWithEmail(email, password, username);
      modal.classList.remove('active');
      onStart();
    } catch (error: any) {
      alert(error.message);
    }
  });
  
  document.getElementById('google-signup')!.addEventListener('click', async () => {
    try {
      await signInWithGoogle();
      modal.classList.remove('active');
      onStart();
    } catch (error: any) {
      alert(error.message);
    }
  });
  
  document.getElementById('switch-signin')!.addEventListener('click', (e) => {
    e.preventDefault();
    showSignInModal(onStart);
  });
}
