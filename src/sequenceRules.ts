import type { SequenceRule } from './types';

export const sequenceRules: SequenceRule[] = [
  {
    name: 'squares',
    generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2),
    description: 'Perfect Squares: Each term is n² where n starts from 1'
  },
  {
    name: 'squares_plus_one',
    generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 1),
    description: 'Squares Plus One: Each term is n² + 1'
  },
  {
    name: 'cubes',
    generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3),
    description: 'Perfect Cubes: Each term is n³ where n starts from 1'
  },
  {
    name: 'arithmetic_3',
    generate: (len) => Array.from({ length: len }, (_, i) => 3 * (i + 1)),
    description: 'Multiples of 3: Each term is 3n (arithmetic sequence with difference 3)'
  },
  {
    name: 'arithmetic_5_plus_2',
    generate: (len) => Array.from({ length: len }, (_, i) => 5 * i + 2),
    description: 'Arithmetic Sequence: Starts at 2, increases by 5 each time (5n + 2)'
  },
  {
    name: 'fibonacci',
    generate: (len) => {
      const fib = [1, 1];
      for (let i = 2; i < len; i++) fib.push(fib[i - 1] + fib[i - 2]);
      return fib.slice(0, len);
    },
    description: 'Fibonacci Sequence: Each term is the sum of the previous two terms'
  },
  {
    name: 'powers_of_2',
    generate: (len) => Array.from({ length: len }, (_, i) => 2 ** (i + 1)),
    description: 'Powers of 2: Each term is 2ⁿ (geometric sequence, doubles each time)'
  },
  {
    name: 'triangular',
    generate: (len) => Array.from({ length: len }, (_, i) => ((i + 1) * (i + 2)) / 2),
    description: 'Triangular Numbers: Each term is n(n+1)/2, representing dots in a triangle'
  },
  {
    name: 'primes',
    generate: (len) => {
      const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
      return primes.slice(0, len);
    },
    description: 'Prime Numbers: Numbers divisible only by 1 and themselves'
  },
  {
    name: 'alternating_sign',
    generate: (len) => Array.from({ length: len }, (_, i) => (i % 2 === 0 ? i + 1 : -(i + 1))),
    description: 'Alternating Signs: Positive and negative integers alternating'
  },
  {
    name: 'double_previous',
    generate: (len) => {
      const seq = [1];
      for (let i = 1; i < len; i++) seq.push(seq[i - 1] * 2);
      return seq;
    },
    description: 'Doubling Sequence: Each term is double the previous term (starts at 1)'
  },
  {
    name: 'mod_5',
    generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) % 5),
    description: 'Modulo 5: Remainder when dividing n by 5, creates a repeating cycle'
  },
  {
    name: 'factorial_like',
    generate: (len) => {
      const seq = [1];
      for (let i = 1; i < len; i++) seq.push(seq[i - 1] * (i + 1));
      return seq.slice(0, len);
    },
    description: 'Factorial Sequence: Each term is n! (n factorial = 1×2×3×...×n)'
  },
  {
    name: 'pentagonal',
    generate: (len) => Array.from({ length: len }, (_, i) => ((i + 1) * (3 * (i + 1) - 1)) / 2),
    description: 'Pentagonal Numbers: Formula n(3n-1)/2, representing dots in a pentagon'
  },
  {
    name: 'catalan',
    generate: (len) => {
      const catalan = [1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862];
      return catalan.slice(0, len);
    },
    description: 'Catalan Numbers: Special sequence appearing in combinatorics'
  }
];
