# Numericle - Daily Sequence Game

A Wordle-inspired puzzle game where you discover hidden mathematical sequence rules through logical deduction.

## 🎮 How to Play

- Each day features a new hidden sequence of 5 numbers
- You have 10 attempts to guess the sequence
- After each guess, you'll see:
  - 🟩 Green: Number is correct and in the right position
  - 🟨 Yellow: Number exists in the sequence but wrong position
  - ⬜ Gray: Number doesn't exist in the sequence

## 🚀 Development

```bash
npm install
npm run dev
```

## 📦 Production Build

```bash
npm run build
```

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

The game generates a new puzzle daily at 00:00 GMT and tracks attempts per IP address to prevent multiple plays.

## 🧠 Features

- Daily puzzles synchronized globally
- IP-based attempt tracking
- Share results with emoji grid
- 15+ different sequence rules (arithmetic, geometric, Fibonacci, primes, etc.)
- Responsive design for all devices
- Local storage for game state persistence
- Clean, Wordle-inspired UI
