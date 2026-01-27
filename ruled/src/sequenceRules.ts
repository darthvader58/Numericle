import type { SequenceRule } from './types';

export const sequenceRules: SequenceRule[] = [
  {
    name: 'squares',
    generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2),
    description: 'n²'
  },
  {
    name: 'squares_plus_one',
    generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 1),
    description: 'n² + 1'
  },
  {
    name: 'cubes',
    generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3),
    description: 'n³'
  },
  {
    name: 'arithmetic_3',
    generate: (len) => Array.from({ length: len }, (_, i) => 3 * (i + 1)),
    description: '3n'
  },
  {
    name: 'arithmetic_5_plus_2',
    generate: (len) => Array.from({ length: len }, (_, i) => 5 * i + 2),
    description: '5n + 2'
  },
  {
    name: 'fibonacci',
    generate: (len) => {
      const fib = [1, 1];
      for (let i = 2; i < len; i++) fib.push(fib[i - 1] + fib[i - 2]);
      return fib.slice(0, len);
    },
    description: 'Fibonacci'
  },
  {
    name: 'powers_of_2',
    generate: (len) => Array.from({ length: len }, (_, i) => 2 ** (i + 1)),
    description: '2ⁿ'
  },
  {
    name: 'triangular',
    generate: (len) => Array.from({ length: len }, (_, i) => ((i + 1) * (i + 2)) / 2),
    description: 'n(n+1)/2'
  },
  {
    name: 'primes',
    generate: (len) => {
      const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
      return primes.slice(0, len);
    },
    description: 'Prime numbers'
  },
  {
    name: 'alternating_sign',
    generate: (len) => Array.from({ length: len }, (_, i) => (i % 2 === 0 ? i + 1 : -(i + 1))),
    description: 'Alternating signs'
  },
  {
    name: 'double_previous',
    generate: (len) => {
      const seq = [1];
      for (let i = 1; i < len; i++) seq.push(seq[i - 1] * 2);
      return seq;
    },
    description: 'Double previous'
  },
  {
    name: 'mod_5',
    generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) % 5),
    description: 'n mod 5'
  },
  {
    name: 'factorial_like',
    generate: (len) => {
      const seq = [1];
      for (let i = 1; i < len; i++) seq.push(seq[i - 1] * (i + 1));
      return seq.slice(0, len);
    },
    description: 'Factorial-like'
  },
  {
    name: 'pentagonal',
    generate: (len) => Array.from({ length: len }, (_, i) => ((i + 1) * (3 * (i + 1) - 1)) / 2),
    description: 'Pentagonal numbers'
  },
  {
    name: 'catalan',
    generate: (len) => {
      const catalan = [1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862];
      return catalan.slice(0, len);
    },
    description: 'Catalan numbers'
  }
];
