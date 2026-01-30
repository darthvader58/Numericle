import type { SequenceRule } from './types';

// Categorized sequence rules for better puzzle variety
export const sequenceRules: SequenceRule[] = [
  // === POLYNOMIAL SEQUENCES ===
  {
    name: 'squares',
    generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2),
    description: 'Perfect Squares: Each term is n² where n starts from 1'
  },
  {
    name: 'cubes',
    generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3),
    description: 'Perfect Cubes: Each term is n³ where n starts from 1'
  },
  {
    name: 'squares_plus_one',
    generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 1),
    description: 'Squares Plus One: Each term is n² + 1'
  },
  {
    name: 'n_squared_plus_n',
    generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + (i + 1)),
    description: 'Polynomial: n² + n (combines square and linear growth)'
  },
  
  // === ARITHMETIC SEQUENCES ===
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
    name: 'arithmetic_7_minus_3',
    generate: (len) => Array.from({ length: len }, (_, i) => 7 * (i + 1) - 3),
    description: 'Arithmetic: 7n - 3 (multiples of 7, shifted down by 3)'
  },
  {
    name: 'odd_numbers',
    generate: (len) => Array.from({ length: len }, (_, i) => 2 * i + 1),
    description: 'Odd Numbers: 2n + 1, the sequence of all odd positive integers'
  },
  {
    name: 'even_numbers',
    generate: (len) => Array.from({ length: len }, (_, i) => 2 * (i + 1)),
    description: 'Even Numbers: 2n, the sequence of all even positive integers'
  },
  
  // === GEOMETRIC SEQUENCES ===
  {
    name: 'powers_of_2',
    generate: (len) => Array.from({ length: len }, (_, i) => 2 ** (i + 1)),
    description: 'Powers of 2: Each term is 2ⁿ (geometric sequence, doubles each time)'
  },
  {
    name: 'powers_of_3',
    generate: (len) => Array.from({ length: len }, (_, i) => 3 ** (i + 1)),
    description: 'Powers of 3: Each term is 3ⁿ (triples each time)'
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
  
  // === RECURSIVE/ADDITIVE SEQUENCES ===
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
    name: 'tribonacci',
    generate: (len) => {
      const trib = [1, 1, 2];
      for (let i = 3; i < len; i++) trib.push(trib[i - 1] + trib[i - 2] + trib[i - 3]);
      return trib.slice(0, len);
    },
    description: 'Tribonacci: Each term is the sum of the previous three terms'
  },
  {
    name: 'lucas',
    generate: (len) => {
      const lucas = [2, 1];
      for (let i = 2; i < len; i++) lucas.push(lucas[i - 1] + lucas[i - 2]);
      return lucas.slice(0, len);
    },
    description: 'Lucas Numbers: Like Fibonacci but starts with 2, 1'
  },

  // === FIGURATE NUMBERS ===
  {
    name: 'triangular',
    generate: (len) => Array.from({ length: len }, (_, i) => ((i + 1) * (i + 2)) / 2),
    description: 'Triangular Numbers: n(n+1)/2, representing dots in a triangle'
  },
  {
    name: 'pentagonal',
    generate: (len) => Array.from({ length: len }, (_, i) => ((i + 1) * (3 * (i + 1) - 1)) / 2),
    description: 'Pentagonal Numbers: n(3n-1)/2, representing dots in a pentagon'
  },
  {
    name: 'hexagonal',
    generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) * (2 * (i + 1) - 1)),
    description: 'Hexagonal Numbers: n(2n-1), representing dots in a hexagon'
  },
  
  // === SPECIAL SEQUENCES ===
  {
    name: 'primes',
    generate: (len) => {
      const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
      return primes.slice(0, len);
    },
    description: 'Prime Numbers: Numbers divisible only by 1 and themselves'
  },
  {
    name: 'factorial',
    generate: (len) => {
      const seq = [1];
      for (let i = 1; i < len; i++) seq.push(seq[i - 1] * (i + 1));
      return seq.slice(0, len);
    },
    description: 'Factorial Sequence: Each term is n! (n factorial = 1×2×3×...×n)'
  },
  {
    name: 'catalan',
    generate: (len) => {
      const catalan = [1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862];
      return catalan.slice(0, len);
    },
    description: 'Catalan Numbers: Special sequence appearing in combinatorics'
  },
  
  // === FAMOUS MATHEMATICAL SEQUENCES ===
  {
    name: 'mersenne_primes',
    generate: (len) => {
      // Mersenne primes: 2^p - 1 where result is prime
      const mersenne = [3, 7, 31, 127, 8191, 131071, 524287];
      return mersenne.slice(0, len);
    },
    description: 'Mersenne Primes: Primes of the form 2^p - 1'
  },
  {
    name: 'pascal_row_sums',
    generate: (len) => {
      // Sum of each row in Pascal's triangle = 2^n
      return Array.from({ length: len }, (_, i) => 2 ** i);
    },
    description: "Pascal's Row Sums: Sum of nth row in Pascal's triangle equals 2^n"
  },
  {
    name: 'pascal_diagonal',
    generate: (len) => {
      // First diagonal of Pascal's triangle (natural numbers)
      return Array.from({ length: len }, (_, i) => i + 1);
    },
    description: "Pascal's First Diagonal: Natural numbers from Pascal's triangle"
  },
  {
    name: 'pascal_triangular',
    generate: (len) => {
      // Second diagonal of Pascal's triangle (triangular numbers)
      return Array.from({ length: len }, (_, i) => ((i + 1) * (i + 2)) / 2);
    },
    description: "Pascal's Triangular Diagonal: Triangular numbers from Pascal's triangle"
  },
  {
    name: 'sylvester_sequence',
    generate: (len) => {
      // Sylvester's sequence: a(n+1) = a(n)^2 - a(n) + 1
      const seq = [2];
      for (let i = 1; i < len; i++) {
        const prev = seq[i - 1];
        seq.push(prev * prev - prev + 1);
      }
      return seq.slice(0, len);
    },
    description: "Sylvester's Sequence: Each term is previous^2 - previous + 1"
  },
  {
    name: 'somos_4',
    generate: (len) => {
      // Somos-4 sequence
      const seq = [1, 1, 1, 1];
      for (let i = 4; i < len; i++) {
        seq.push((seq[i-1] * seq[i-3] + seq[i-2] * seq[i-2]) / seq[i-4]);
      }
      return seq.slice(0, len);
    },
    description: 'Somos-4 Sequence: Recursive sequence with surprising integer property'
  },
  {
    name: 'perfect_numbers',
    generate: (len) => {
      // Perfect numbers: equal to sum of proper divisors
      const perfect = [6, 28, 496, 8128, 33550336];
      return perfect.slice(0, len);
    },
    description: 'Perfect Numbers: Numbers equal to the sum of their proper divisors'
  },
  {
    name: 'lazy_caterer',
    generate: (len) => {
      // Maximum pieces from n cuts: (n^2 + n + 2) / 2
      return Array.from({ length: len }, (_, i) => {
        const n = i;
        return (n * n + n + 2) / 2;
      });
    },
    description: "Lazy Caterer's Sequence: Max pieces from n straight cuts of a disk"
  },
  {
    name: 'bell_numbers',
    generate: (len) => {
      // Bell numbers: number of partitions of a set
      const bell = [1, 1, 2, 5, 15, 52, 203, 877, 4140];
      return bell.slice(0, len);
    },
    description: 'Bell Numbers: Number of ways to partition a set'
  },
  {
    name: 'motzkin_numbers',
    generate: (len) => {
      // Motzkin numbers
      const motzkin = [1, 1, 2, 4, 9, 21, 51, 127, 323];
      return motzkin.slice(0, len);
    },
    description: 'Motzkin Numbers: Paths from (0,0) to (n,0) with specific rules'
  },
  {
    name: 'pell_numbers',
    generate: (len) => {
      // Pell numbers: P(n) = 2*P(n-1) + P(n-2)
      const pell = [0, 1];
      for (let i = 2; i < len; i++) {
        pell.push(2 * pell[i - 1] + pell[i - 2]);
      }
      return pell.slice(0, len);
    },
    description: 'Pell Numbers: Recursive sequence P(n) = 2P(n-1) + P(n-2)'
  },
  {
    name: 'padovan_sequence',
    generate: (len) => {
      // Padovan sequence: P(n) = P(n-2) + P(n-3)
      const padovan = [1, 1, 1];
      for (let i = 3; i < len; i++) {
        padovan.push(padovan[i - 2] + padovan[i - 3]);
      }
      return padovan.slice(0, len);
    },
    description: 'Padovan Sequence: P(n) = P(n-2) + P(n-3), related to plastic number'
  },
  {
    name: 'partition_numbers',
    generate: (len) => {
      // Partition numbers: ways to write n as sum of positive integers
      const partition = [1, 1, 2, 3, 5, 7, 11, 15, 22, 30];
      return partition.slice(0, len);
    },
    description: 'Partition Numbers: Ways to write n as sum of positive integers'
  },
  {
    name: 'stern_brocot',
    generate: (len) => {
      // Stern-Brocot sequence (numerators)
      const seq = [1, 1];
      for (let i = 2; i < len; i++) {
        if (i % 2 === 0) {
          seq.push(seq[i / 2 - 1]);
        } else {
          seq.push(seq[Math.floor(i / 2)] + seq[Math.floor(i / 2) + 1]);
        }
      }
      return seq.slice(0, len);
    },
    description: 'Stern-Brocot Sequence: Related to the Stern-Brocot tree of fractions'
  },
  {
    name: 'recaman_sequence',
    generate: (len) => {
      // Recamán's sequence
      const seq = [0];
      const seen = new Set([0]);
      for (let i = 1; i < len; i++) {
        const backward = seq[i - 1] - i;
        if (backward > 0 && !seen.has(backward)) {
          seq.push(backward);
          seen.add(backward);
        } else {
          const forward = seq[i - 1] + i;
          seq.push(forward);
          seen.add(forward);
        }
      }
      return seq.slice(0, len);
    },
    description: "Recamán's Sequence: Subtract if possible and not seen, else add"
  },
  
  // === DIGIT-BASED PATTERNS ===
  {
    name: 'digit_sum_multiples',
    generate: (len) => {
      // Numbers where digit sum equals position
      const seq = [];
      for (let i = 1; i <= len; i++) {
        seq.push(i * 9); // 9, 18, 27, 36... (digit sums: 9, 9, 9, 9...)
      }
      return seq;
    },
    description: 'Multiples of 9: All have digit sum of 9 (or multiple of 9)'
  },
  {
    name: 'palindromic',
    generate: (len) => {
      const palindromes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33, 44, 55, 66, 77, 88, 99];
      return palindromes.slice(0, len);
    },
    description: 'Palindromic Numbers: Numbers that read the same forwards and backwards'
  },
  
  // === MODULAR/CYCLIC PATTERNS ===
  {
    name: 'mod_5',
    generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) % 5),
    description: 'Modulo 5: Remainder when dividing n by 5, creates a repeating cycle'
  },
  {
    name: 'mod_7_offset',
    generate: (len) => Array.from({ length: len }, (_, i) => ((i + 1) % 7) + 1),
    description: 'Modulo 7 (offset): Cycles through 1-7 repeatedly'
  },
  
  // === ALTERNATING/SIGN PATTERNS ===
  {
    name: 'alternating_sign',
    generate: (len) => Array.from({ length: len }, (_, i) => (i % 2 === 0 ? i + 1 : -(i + 1))),
    description: 'Alternating Signs: Positive and negative integers alternating'
  },
  {
    name: 'alternating_powers',
    generate: (len) => Array.from({ length: len }, (_, i) => (i % 2 === 0 ? (i + 1) ** 2 : (i + 1) ** 3)),
    description: 'Alternating Powers: Alternates between squares and cubes'
  },

  // === HARMONIC/RATIO PATTERNS ===
  {
    name: 'sum_of_divisors',
    generate: (len) => {
      // Sum of proper divisors for each n
      const sumDivisors = (n: number) => {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
          if (n % i === 0) sum += i;
        }
        return sum;
      };
      return Array.from({ length: len }, (_, i) => sumDivisors(i + 1));
    },
    description: 'Sum of Divisors: Sum of all divisors of n (including n itself)'
  },
  
  // === MIXED/COMPLEX PATTERNS ===
  {
    name: 'n_plus_reverse',
    generate: (len) => {
      const reverse = (n: number) => parseInt(n.toString().split('').reverse().join(''));
      return Array.from({ length: len }, (_, i) => {
        const n = i + 1;
        return n + reverse(n);
      });
    },
    description: 'Number Plus Reverse: Each term is n + reverse(n) (e.g., 12 + 21 = 33)'
  },
  {
    name: 'collatz_steps',
    generate: (len) => {
      const collatzSteps = (n: number) => {
        let steps = 0;
        while (n !== 1) {
          n = n % 2 === 0 ? n / 2 : 3 * n + 1;
          steps++;
          if (steps > 1000) break; // safety
        }
        return steps;
      };
      return Array.from({ length: len }, (_, i) => collatzSteps(i + 1));
    },
    description: 'Collatz Steps: Number of steps to reach 1 in the Collatz sequence'
  },
  {
    name: 'sum_of_squares',
    generate: (len) => {
      let sum = 0;
      return Array.from({ length: len }, (_, i) => {
        sum += (i + 1) ** 2;
        return sum;
      });
    },
    description: 'Cumulative Sum of Squares: Running total of 1² + 2² + 3² + ...'
  },
  {
    name: 'difference_of_squares',
    generate: (len) => Array.from({ length: len }, (_, i) => (i + 2) ** 2 - (i + 1) ** 2),
    description: 'Difference of Consecutive Squares: (n+1)² - n² = 2n + 1'
  },
  {
    name: 'powers_alternating',
    generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** (i + 1)),
    description: 'Self Powers: Each term is n^n (1¹, 2², 3³, 4⁴, ...)'
  },
  {
    name: 'digital_root',
    generate: (len) => {
      const digitalRoot = (n: number) => {
        while (n >= 10) {
          n = n.toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
        }
        return n;
      };
      return Array.from({ length: len }, (_, i) => digitalRoot((i + 1) * 10));
    },
    description: 'Digital Root Pattern: Repeatedly sum digits until single digit remains'
  },
  {
    name: 'perfect_squares_gaps',
    generate: (len) => {
      const gaps = [];
      for (let i = 1; i <= len; i++) {
        gaps.push((i + 1) ** 2 - i ** 2);
      }
      return gaps;
    },
    description: 'Gaps Between Squares: Difference between consecutive perfect squares'
  },

  // ==================== ADDITIONAL 500+ SEQUENCES ====================
  
  // === MORE POLYNOMIAL SEQUENCES (100) ===
  { name: 'poly_1', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 2 * (i + 1) + 1), description: 'Polynomial: n² + 2n + 1 = (n+1)²' },
  { name: 'poly_2', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 - 2 * (i + 1) + 1), description: 'Polynomial: n² - 2n + 1 = (n-1)²' },
  { name: 'poly_3', generate: (len) => Array.from({ length: len }, (_, i) => 2 * (i + 1) ** 2 + (i + 1)), description: 'Polynomial: 2n² + n' },
  { name: 'poly_4', generate: (len) => Array.from({ length: len }, (_, i) => 3 * (i + 1) ** 2 - (i + 1)), description: 'Polynomial: 3n² - n' },
  { name: 'poly_5', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 3), description: 'Polynomial: n² + 3' },
  { name: 'poly_6', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 5), description: 'Polynomial: n² + 5' },
  { name: 'poly_7', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 - 2), description: 'Polynomial: n² - 2' },
  { name: 'poly_8', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3 + (i + 1)), description: 'Polynomial: n³ + n' },
  { name: 'poly_9', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3 - (i + 1)), description: 'Polynomial: n³ - n' },
  { name: 'poly_10', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3 + 1), description: 'Polynomial: n³ + 1' },
  { name: 'poly_11', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3 - 1), description: 'Polynomial: n³ - 1' },
  { name: 'poly_12', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 4), description: 'Fourth Powers: n⁴' },
  { name: 'poly_13', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 5), description: 'Fifth Powers: n⁵' },
  { name: 'poly_14', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + (i + 1) ** 3), description: 'Polynomial: n² + n³' },
  { name: 'poly_15', generate: (len) => Array.from({ length: len }, (_, i) => 4 * (i + 1) ** 2), description: 'Polynomial: 4n²' },
  { name: 'poly_16', generate: (len) => Array.from({ length: len }, (_, i) => 5 * (i + 1) ** 2), description: 'Polynomial: 5n²' },
  { name: 'poly_17', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 4 * (i + 1)), description: 'Polynomial: n² + 4n' },
  { name: 'poly_18', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 5 * (i + 1)), description: 'Polynomial: n² + 5n' },
  { name: 'poly_19', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 - 3 * (i + 1)), description: 'Polynomial: n² - 3n' },
  { name: 'poly_20', generate: (len) => Array.from({ length: len }, (_, i) => 2 * (i + 1) ** 2 + 3 * (i + 1)), description: 'Polynomial: 2n² + 3n' },
  { name: 'poly_21', generate: (len) => Array.from({ length: len }, (_, i) => 3 * (i + 1) ** 2 + 2 * (i + 1)), description: 'Polynomial: 3n² + 2n' },
  { name: 'poly_22', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 6 * (i + 1)), description: 'Polynomial: n² + 6n' },
  { name: 'poly_23', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 7 * (i + 1)), description: 'Polynomial: n² + 7n' },
  { name: 'poly_24', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 8 * (i + 1)), description: 'Polynomial: n² + 8n' },
  { name: 'poly_25', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 10 * (i + 1)), description: 'Polynomial: n² + 10n' },
  { name: 'poly_26', generate: (len) => Array.from({ length: len }, (_, i) => 2 * (i + 1) ** 3), description: 'Polynomial: 2n³' },
  { name: 'poly_27', generate: (len) => Array.from({ length: len }, (_, i) => 3 * (i + 1) ** 3), description: 'Polynomial: 3n³' },
  { name: 'poly_28', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3 + 2), description: 'Polynomial: n³ + 2' },
  { name: 'poly_29', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3 + 3), description: 'Polynomial: n³ + 3' },
  { name: 'poly_30', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3 - 2), description: 'Polynomial: n³ - 2' },
  { name: 'poly_31', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + (i + 1) + 1), description: 'Polynomial: n² + n + 1' },
  { name: 'poly_32', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 - (i + 1) + 1), description: 'Polynomial: n² - n + 1' },
  { name: 'poly_33', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 2 * (i + 1) + 3), description: 'Polynomial: n² + 2n + 3' },
  { name: 'poly_34', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 3 * (i + 1) + 2), description: 'Polynomial: n² + 3n + 2' },
  { name: 'poly_35', generate: (len) => Array.from({ length: len }, (_, i) => 6 * (i + 1) ** 2), description: 'Polynomial: 6n²' },
  { name: 'poly_36', generate: (len) => Array.from({ length: len }, (_, i) => 7 * (i + 1) ** 2), description: 'Polynomial: 7n²' },
  { name: 'poly_37', generate: (len) => Array.from({ length: len }, (_, i) => 8 * (i + 1) ** 2), description: 'Polynomial: 8n²' },
  { name: 'poly_38', generate: (len) => Array.from({ length: len }, (_, i) => 9 * (i + 1) ** 2), description: 'Polynomial: 9n²' },
  { name: 'poly_39', generate: (len) => Array.from({ length: len }, (_, i) => 10 * (i + 1) ** 2), description: 'Polynomial: 10n²' },
  { name: 'poly_40', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 12), description: 'Polynomial: n² + 12' },
  { name: 'poly_41', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 15), description: 'Polynomial: n² + 15' },
  { name: 'poly_42', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 20), description: 'Polynomial: n² + 20' },
  { name: 'poly_43', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3 + (i + 1) ** 2), description: 'Polynomial: n³ + n²' },
  { name: 'poly_44', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3 - (i + 1) ** 2), description: 'Polynomial: n³ - n²' },
  { name: 'poly_45', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 4 + 1), description: 'Polynomial: n⁴ + 1' },
  { name: 'poly_46', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 4 - 1), description: 'Polynomial: n⁴ - 1' },
  { name: 'poly_47', generate: (len) => Array.from({ length: len }, (_, i) => 2 * (i + 1) ** 4), description: 'Polynomial: 2n⁴' },
  { name: 'poly_48', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + (i + 1) + 2), description: 'Polynomial: n² + n + 2' },
  { name: 'poly_49', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + (i + 1) + 3), description: 'Polynomial: n² + n + 3' },
  { name: 'poly_50', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + (i + 1) + 5), description: 'Polynomial: n² + n + 5' },
  { name: 'poly_51', generate: (len) => Array.from({ length: len }, (_, i) => 4 * (i + 1) ** 2 + (i + 1)), description: 'Polynomial: 4n² + n' },
  { name: 'poly_52', generate: (len) => Array.from({ length: len }, (_, i) => 5 * (i + 1) ** 2 + (i + 1)), description: 'Polynomial: 5n² + n' },
  { name: 'poly_53', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 - 4 * (i + 1)), description: 'Polynomial: n² - 4n' },
  { name: 'poly_54', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 - 5 * (i + 1)), description: 'Polynomial: n² - 5n' },
  { name: 'poly_55', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3 + 5), description: 'Polynomial: n³ + 5' },
  { name: 'poly_56', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3 + 10), description: 'Polynomial: n³ + 10' },
  { name: 'poly_57', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3 - 5), description: 'Polynomial: n³ - 5' },
  { name: 'poly_58', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3 - 10), description: 'Polynomial: n³ - 10' },
  { name: 'poly_59', generate: (len) => Array.from({ length: len }, (_, i) => 4 * (i + 1) ** 3), description: 'Polynomial: 4n³' },
  { name: 'poly_60', generate: (len) => Array.from({ length: len }, (_, i) => 5 * (i + 1) ** 3), description: 'Polynomial: 5n³' },
  { name: 'poly_61', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 2 * (i + 1) + 2), description: 'Polynomial: n² + 2n + 2' },
  { name: 'poly_62', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 3 * (i + 1) + 3), description: 'Polynomial: n² + 3n + 3' },
  { name: 'poly_63', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 4 * (i + 1) + 4), description: 'Polynomial: n² + 4n + 4 = (n+2)²' },
  { name: 'poly_64', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 5 * (i + 1) + 6), description: 'Polynomial: n² + 5n + 6' },
  { name: 'poly_65', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 6 * (i + 1) + 8), description: 'Polynomial: n² + 6n + 8' },
  { name: 'poly_66', generate: (len) => Array.from({ length: len }, (_, i) => 2 * (i + 1) ** 2 + 2 * (i + 1)), description: 'Polynomial: 2n² + 2n' },
  { name: 'poly_67', generate: (len) => Array.from({ length: len }, (_, i) => 3 * (i + 1) ** 2 + 3 * (i + 1)), description: 'Polynomial: 3n² + 3n' },
  { name: 'poly_68', generate: (len) => Array.from({ length: len }, (_, i) => 4 * (i + 1) ** 2 + 4 * (i + 1)), description: 'Polynomial: 4n² + 4n' },
  { name: 'poly_69', generate: (len) => Array.from({ length: len }, (_, i) => 5 * (i + 1) ** 2 + 5 * (i + 1)), description: 'Polynomial: 5n² + 5n' },
  { name: 'poly_70', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 5 + 1), description: 'Polynomial: n⁵ + 1' },
  { name: 'poly_71', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 5 - 1), description: 'Polynomial: n⁵ - 1' },
  { name: 'poly_72', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 6), description: 'Sixth Powers: n⁶' },
  { name: 'poly_73', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 - 6 * (i + 1)), description: 'Polynomial: n² - 6n' },
  { name: 'poly_74', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 - 7 * (i + 1)), description: 'Polynomial: n² - 7n' },
  { name: 'poly_75', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 - 8 * (i + 1)), description: 'Polynomial: n² - 8n' },
  { name: 'poly_76', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 9 * (i + 1)), description: 'Polynomial: n² + 9n' },
  { name: 'poly_77', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 11 * (i + 1)), description: 'Polynomial: n² + 11n' },
  { name: 'poly_78', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 12 * (i + 1)), description: 'Polynomial: n² + 12n' },
  { name: 'poly_79', generate: (len) => Array.from({ length: len }, (_, i) => 6 * (i + 1) ** 2 + (i + 1)), description: 'Polynomial: 6n² + n' },
  { name: 'poly_80', generate: (len) => Array.from({ length: len }, (_, i) => 7 * (i + 1) ** 2 + (i + 1)), description: 'Polynomial: 7n² + n' },
  { name: 'poly_81', generate: (len) => Array.from({ length: len }, (_, i) => 8 * (i + 1) ** 2 + (i + 1)), description: 'Polynomial: 8n² + n' },
  { name: 'poly_82', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3 + 2 * (i + 1)), description: 'Polynomial: n³ + 2n' },
  { name: 'poly_83', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3 + 3 * (i + 1)), description: 'Polynomial: n³ + 3n' },
  { name: 'poly_84', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3 - 2 * (i + 1)), description: 'Polynomial: n³ - 2n' },
  { name: 'poly_85', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 3 - 3 * (i + 1)), description: 'Polynomial: n³ - 3n' },
  { name: 'poly_86', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 4 + (i + 1)), description: 'Polynomial: n⁴ + n' },
  { name: 'poly_87', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 4 - (i + 1)), description: 'Polynomial: n⁴ - n' },
  { name: 'poly_88', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 4 + (i + 1) ** 2), description: 'Polynomial: n⁴ + n²' },
  { name: 'poly_89', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 4 - (i + 1) ** 2), description: 'Polynomial: n⁴ - n²' },
  { name: 'poly_90', generate: (len) => Array.from({ length: len }, (_, i) => 3 * (i + 1) ** 4), description: 'Polynomial: 3n⁴' },
  { name: 'poly_91', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 2 * (i + 1) + 5), description: 'Polynomial: n² + 2n + 5' },
  { name: 'poly_92', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 3 * (i + 1) + 5), description: 'Polynomial: n² + 3n + 5' },
  { name: 'poly_93', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + 4 * (i + 1) + 5), description: 'Polynomial: n² + 4n + 5' },
  { name: 'poly_94', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 - 2 * (i + 1) + 2), description: 'Polynomial: n² - 2n + 2' },
  { name: 'poly_95', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 - 3 * (i + 1) + 3), description: 'Polynomial: n² - 3n + 3' },
  { name: 'poly_96', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 - 4 * (i + 1) + 4), description: 'Polynomial: n² - 4n + 4 = (n-2)²' },
  { name: 'poly_97', generate: (len) => Array.from({ length: len }, (_, i) => 2 * (i + 1) ** 5), description: 'Polynomial: 2n⁵' },
  { name: 'poly_98', generate: (len) => Array.from({ length: len }, (_, i) => 3 * (i + 1) ** 5), description: 'Polynomial: 3n⁵' },
  { name: 'poly_99', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 7), description: 'Seventh Powers: n⁷' },
  { name: 'poly_100', generate: (len) => Array.from({ length: len }, (_, i) => (i + 1) ** 2 + (i + 1) ** 4), description: 'Polynomial: n² + n⁴' },

  // === GEOMETRIC SEQUENCES (100) ===
  { name: 'geom_1', generate: (len) => Array.from({ length: len }, (_, i) => 2 ** i), description: 'Powers of 2 (from 2⁰): 1, 2, 4, 8, 16...' },
  { name: 'geom_2', generate: (len) => Array.from({ length: len }, (_, i) => 3 ** i), description: 'Powers of 3 (from 3⁰): 1, 3, 9, 27...' },
  { name: 'geom_3', generate: (len) => Array.from({ length: len }, (_, i) => 4 ** (i + 1)), description: 'Powers of 4: 4, 16, 64, 256...' },
  { name: 'geom_4', generate: (len) => Array.from({ length: len }, (_, i) => 5 ** (i + 1)), description: 'Powers of 5: 5, 25, 125, 625...' },
  { name: 'geom_5', generate: (len) => { const seq = [3]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 2); return seq; }, description: 'Geometric: starts at 3, doubles each time' },
  { name: 'geom_6', generate: (len) => { const seq = [5]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 2); return seq; }, description: 'Geometric: starts at 5, doubles each time' },
  { name: 'geom_7', generate: (len) => { const seq = [2]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 3); return seq; }, description: 'Geometric: starts at 2, triples each time' },
  { name: 'geom_8', generate: (len) => { const seq = [4]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 3); return seq; }, description: 'Geometric: starts at 4, triples each time' },
  { name: 'geom_9', generate: (len) => { const seq = [1]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 4); return seq; }, description: 'Geometric: starts at 1, quadruples each time' },
  { name: 'geom_10', generate: (len) => { const seq = [1]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 5); return seq; }, description: 'Geometric: starts at 1, quintuples each time' },
  { name: 'geom_11', generate: (len) => Array.from({ length: len }, (_, i) => 2 ** (i + 2)), description: 'Powers of 2 (from 2²): 4, 8, 16, 32...' },
  { name: 'geom_12', generate: (len) => Array.from({ length: len }, (_, i) => 3 ** (i + 2)), description: 'Powers of 3 (from 3²): 9, 27, 81...' },
  { name: 'geom_13', generate: (len) => Array.from({ length: len }, (_, i) => 2 ** (2 * (i + 1))), description: 'Powers of 4 as 2^(2n): 4, 16, 64...' },
  { name: 'geom_14', generate: (len) => Array.from({ length: len }, (_, i) => 2 ** (3 * (i + 1))), description: 'Powers of 8 as 2^(3n): 8, 64, 512...' },
  { name: 'geom_15', generate: (len) => { const seq = [7]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 2); return seq; }, description: 'Geometric: starts at 7, doubles each time' },
  { name: 'geom_16', generate: (len) => { const seq = [10]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 2); return seq; }, description: 'Geometric: starts at 10, doubles each time' },
  { name: 'geom_17', generate: (len) => { const seq = [6]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 3); return seq; }, description: 'Geometric: starts at 6, triples each time' },
  { name: 'geom_18', generate: (len) => { const seq = [8]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 3); return seq; }, description: 'Geometric: starts at 8, triples each time' },
  { name: 'geom_19', generate: (len) => { const seq = [3]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 4); return seq; }, description: 'Geometric: starts at 3, quadruples each time' },
  { name: 'geom_20', generate: (len) => { const seq = [2]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 5); return seq; }, description: 'Geometric: starts at 2, quintuples each time' },
  { name: 'geom_21', generate: (len) => Array.from({ length: len }, (_, i) => 6 ** (i + 1)), description: 'Powers of 6: 6, 36, 216...' },
  { name: 'geom_22', generate: (len) => Array.from({ length: len }, (_, i) => 7 ** (i + 1)), description: 'Powers of 7: 7, 49, 343...' },
  { name: 'geom_23', generate: (len) => Array.from({ length: len }, (_, i) => 8 ** (i + 1)), description: 'Powers of 8: 8, 64, 512...' },
  { name: 'geom_24', generate: (len) => Array.from({ length: len }, (_, i) => 9 ** (i + 1)), description: 'Powers of 9: 9, 81, 729...' },
  { name: 'geom_25', generate: (len) => Array.from({ length: len }, (_, i) => 10 ** (i + 1)), description: 'Powers of 10: 10, 100, 1000...' },
  { name: 'geom_26', generate: (len) => { const seq = [12]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 2); return seq; }, description: 'Geometric: starts at 12, doubles each time' },
  { name: 'geom_27', generate: (len) => { const seq = [15]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 2); return seq; }, description: 'Geometric: starts at 15, doubles each time' },
  { name: 'geom_28', generate: (len) => { const seq = [9]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 3); return seq; }, description: 'Geometric: starts at 9, triples each time' },
  { name: 'geom_29', generate: (len) => { const seq = [12]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 3); return seq; }, description: 'Geometric: starts at 12, triples each time' },
  { name: 'geom_30', generate: (len) => { const seq = [5]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 4); return seq; }, description: 'Geometric: starts at 5, quadruples each time' },
  { name: 'geom_31', generate: (len) => { const seq = [3]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 5); return seq; }, description: 'Geometric: starts at 3, quintuples each time' },
  { name: 'geom_32', generate: (len) => { const seq = [4]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 5); return seq; }, description: 'Geometric: starts at 4, quintuples each time' },
  { name: 'geom_33', generate: (len) => { const seq = [1]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 6); return seq; }, description: 'Geometric: starts at 1, sextuples each time' },
  { name: 'geom_34', generate: (len) => { const seq = [1]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 7); return seq; }, description: 'Geometric: starts at 1, septuples each time' },
  { name: 'geom_35', generate: (len) => { const seq = [1]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 8); return seq; }, description: 'Geometric: starts at 1, octuples each time' },
  { name: 'geom_36', generate: (len) => { const seq = [1]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 9); return seq; }, description: 'Geometric: starts at 1, nonuples each time' },
  { name: 'geom_37', generate: (len) => { const seq = [1]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 10); return seq; }, description: 'Geometric: starts at 1, decuples each time' },
  { name: 'geom_38', generate: (len) => Array.from({ length: len }, (_, i) => 2 ** (i + 3)), description: 'Powers of 2 (from 2³): 8, 16, 32, 64...' },
  { name: 'geom_39', generate: (len) => Array.from({ length: len }, (_, i) => 3 ** (i + 3)), description: 'Powers of 3 (from 3³): 27, 81, 243...' },
  { name: 'geom_40', generate: (len) => { const seq = [20]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 2); return seq; }, description: 'Geometric: starts at 20, doubles each time' },
  { name: 'geom_41', generate: (len) => { const seq = [25]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 2); return seq; }, description: 'Geometric: starts at 25, doubles each time' },
  { name: 'geom_42', generate: (len) => { const seq = [15]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 3); return seq; }, description: 'Geometric: starts at 15, triples each time' },
  { name: 'geom_43', generate: (len) => { const seq = [18]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 3); return seq; }, description: 'Geometric: starts at 18, triples each time' },
  { name: 'geom_44', generate: (len) => { const seq = [6]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 4); return seq; }, description: 'Geometric: starts at 6, quadruples each time' },
  { name: 'geom_45', generate: (len) => { const seq = [7]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 4); return seq; }, description: 'Geometric: starts at 7, quadruples each time' },
  { name: 'geom_46', generate: (len) => { const seq = [5]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 5); return seq; }, description: 'Geometric: starts at 5, quintuples each time' },
  { name: 'geom_47', generate: (len) => { const seq = [6]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 5); return seq; }, description: 'Geometric: starts at 6, quintuples each time' },
  { name: 'geom_48', generate: (len) => { const seq = [2]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 6); return seq; }, description: 'Geometric: starts at 2, sextuples each time' },
  { name: 'geom_49', generate: (len) => { const seq = [3]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 6); return seq; }, description: 'Geometric: starts at 3, sextuples each time' },
  { name: 'geom_50', generate: (len) => { const seq = [2]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 7); return seq; }, description: 'Geometric: starts at 2, septuples each time' },
  { name: 'geom_51', generate: (len) => { const seq = [3]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 7); return seq; }, description: 'Geometric: starts at 3, septuples each time' },
  { name: 'geom_52', generate: (len) => { const seq = [2]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 8); return seq; }, description: 'Geometric: starts at 2, octuples each time' },
  { name: 'geom_53', generate: (len) => { const seq = [3]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 8); return seq; }, description: 'Geometric: starts at 3, octuples each time' },
  { name: 'geom_54', generate: (len) => { const seq = [2]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 9); return seq; }, description: 'Geometric: starts at 2, nonuples each time' },
  { name: 'geom_55', generate: (len) => { const seq = [3]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 9); return seq; }, description: 'Geometric: starts at 3, nonuples each time' },
  { name: 'geom_56', generate: (len) => { const seq = [2]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 10); return seq; }, description: 'Geometric: starts at 2, decuples each time' },
  { name: 'geom_57', generate: (len) => { const seq = [3]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 10); return seq; }, description: 'Geometric: starts at 3, decuples each time' },
  { name: 'geom_58', generate: (len) => Array.from({ length: len }, (_, i) => 11 ** (i + 1)), description: 'Powers of 11: 11, 121, 1331...' },
  { name: 'geom_59', generate: (len) => Array.from({ length: len }, (_, i) => 12 ** (i + 1)), description: 'Powers of 12: 12, 144, 1728...' },
  { name: 'geom_60', generate: (len) => { const seq = [30]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 2); return seq; }, description: 'Geometric: starts at 30, doubles each time' },
  { name: 'geom_61', generate: (len) => { const seq = [40]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 2); return seq; }, description: 'Geometric: starts at 40, doubles each time' },
  { name: 'geom_62', generate: (len) => { const seq = [20]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 3); return seq; }, description: 'Geometric: starts at 20, triples each time' },
  { name: 'geom_63', generate: (len) => { const seq = [24]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 3); return seq; }, description: 'Geometric: starts at 24, triples each time' },
  { name: 'geom_64', generate: (len) => { const seq = [8]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 4); return seq; }, description: 'Geometric: starts at 8, quadruples each time' },
  { name: 'geom_65', generate: (len) => { const seq = [9]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 4); return seq; }, description: 'Geometric: starts at 9, quadruples each time' },
  { name: 'geom_66', generate: (len) => { const seq = [7]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 5); return seq; }, description: 'Geometric: starts at 7, quintuples each time' },
  { name: 'geom_67', generate: (len) => { const seq = [8]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 5); return seq; }, description: 'Geometric: starts at 8, quintuples each time' },
  { name: 'geom_68', generate: (len) => { const seq = [4]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 6); return seq; }, description: 'Geometric: starts at 4, sextuples each time' },
  { name: 'geom_69', generate: (len) => { const seq = [5]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 6); return seq; }, description: 'Geometric: starts at 5, sextuples each time' },
  { name: 'geom_70', generate: (len) => { const seq = [4]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 7); return seq; }, description: 'Geometric: starts at 4, septuples each time' },
  { name: 'geom_71', generate: (len) => { const seq = [5]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 7); return seq; }, description: 'Geometric: starts at 5, septuples each time' },
  { name: 'geom_72', generate: (len) => { const seq = [4]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 8); return seq; }, description: 'Geometric: starts at 4, octuples each time' },
  { name: 'geom_73', generate: (len) => { const seq = [5]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 8); return seq; }, description: 'Geometric: starts at 5, octuples each time' },
  { name: 'geom_74', generate: (len) => { const seq = [4]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 9); return seq; }, description: 'Geometric: starts at 4, nonuples each time' },
  { name: 'geom_75', generate: (len) => { const seq = [5]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 9); return seq; }, description: 'Geometric: starts at 5, nonuples each time' },
  { name: 'geom_76', generate: (len) => { const seq = [4]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 10); return seq; }, description: 'Geometric: starts at 4, decuples each time' },
  { name: 'geom_77', generate: (len) => { const seq = [5]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 10); return seq; }, description: 'Geometric: starts at 5, decuples each time' },
  { name: 'geom_78', generate: (len) => Array.from({ length: len }, (_, i) => 2 ** (i + 4)), description: 'Powers of 2 (from 2⁴): 16, 32, 64, 128...' },
  { name: 'geom_79', generate: (len) => Array.from({ length: len }, (_, i) => 3 ** (i + 4)), description: 'Powers of 3 (from 3⁴): 81, 243, 729...' },
  { name: 'geom_80', generate: (len) => { const seq = [50]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 2); return seq; }, description: 'Geometric: starts at 50, doubles each time' },
  { name: 'geom_81', generate: (len) => { const seq = [60]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 2); return seq; }, description: 'Geometric: starts at 60, doubles each time' },
  { name: 'geom_82', generate: (len) => { const seq = [27]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 3); return seq; }, description: 'Geometric: starts at 27, triples each time' },
  { name: 'geom_83', generate: (len) => { const seq = [30]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 3); return seq; }, description: 'Geometric: starts at 30, triples each time' },
  { name: 'geom_84', generate: (len) => { const seq = [10]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 4); return seq; }, description: 'Geometric: starts at 10, quadruples each time' },
  { name: 'geom_85', generate: (len) => { const seq = [12]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 4); return seq; }, description: 'Geometric: starts at 12, quadruples each time' },
  { name: 'geom_86', generate: (len) => { const seq = [9]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 5); return seq; }, description: 'Geometric: starts at 9, quintuples each time' },
  { name: 'geom_87', generate: (len) => { const seq = [10]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 5); return seq; }, description: 'Geometric: starts at 10, quintuples each time' },
  { name: 'geom_88', generate: (len) => { const seq = [6]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 6); return seq; }, description: 'Geometric: starts at 6, sextuples each time' },
  { name: 'geom_89', generate: (len) => { const seq = [7]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 6); return seq; }, description: 'Geometric: starts at 7, sextuples each time' },
  { name: 'geom_90', generate: (len) => { const seq = [6]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 7); return seq; }, description: 'Geometric: starts at 6, septuples each time' },
  { name: 'geom_91', generate: (len) => { const seq = [7]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 7); return seq; }, description: 'Geometric: starts at 7, septuples each time' },
  { name: 'geom_92', generate: (len) => { const seq = [6]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 8); return seq; }, description: 'Geometric: starts at 6, octuples each time' },
  { name: 'geom_93', generate: (len) => { const seq = [7]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 8); return seq; }, description: 'Geometric: starts at 7, octuples each time' },
  { name: 'geom_94', generate: (len) => { const seq = [6]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 9); return seq; }, description: 'Geometric: starts at 6, nonuples each time' },
  { name: 'geom_95', generate: (len) => { const seq = [7]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 9); return seq; }, description: 'Geometric: starts at 7, nonuples each time' },
  { name: 'geom_96', generate: (len) => { const seq = [6]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 10); return seq; }, description: 'Geometric: starts at 6, decuples each time' },
  { name: 'geom_97', generate: (len) => { const seq = [7]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 10); return seq; }, description: 'Geometric: starts at 7, decuples each time' },
  { name: 'geom_98', generate: (len) => Array.from({ length: len }, (_, i) => 2 ** (i + 5)), description: 'Powers of 2 (from 2⁵): 32, 64, 128, 256...' },
  { name: 'geom_99', generate: (len) => Array.from({ length: len }, (_, i) => 3 ** (i + 5)), description: 'Powers of 3 (from 3⁵): 243, 729, 2187...' },
  { name: 'geom_100', generate: (len) => { const seq = [100]; for (let i = 1; i < len; i++) seq.push(seq[i-1] * 2); return seq; }, description: 'Geometric: starts at 100, doubles each time' },

  // === HARMONIC & MIXED SEQUENCES (300+) ===
  // Arithmetic variations
  ...Array.from({ length: 50 }, (_, i) => ({
    name: `arith_${i + 20}`,
    generate: (len: number) => Array.from({ length: len }, (_, j) => (i + 2) * (j + 1) + (i % 5)),
    description: `Arithmetic: ${i + 2}n + ${i % 5}`
  })),
  
  // Quadratic variations
  ...Array.from({ length: 50 }, (_, i) => ({
    name: `quad_${i + 101}`,
    generate: (len: number) => Array.from({ length: len }, (_, j) => (j + 1) ** 2 + (i + 1) * (j + 1) + (i % 10)),
    description: `Quadratic: n² + ${i + 1}n + ${i % 10}`
  })),
  
  // Cubic variations
  ...Array.from({ length: 30 }, (_, i) => ({
    name: `cubic_${i + 1}`,
    generate: (len: number) => Array.from({ length: len }, (_, j) => (j + 1) ** 3 + (i + 1) * (j + 1)),
    description: `Cubic: n³ + ${i + 1}n`
  })),
  
  // Mixed polynomial
  ...Array.from({ length: 30 }, (_, i) => ({
    name: `mixed_poly_${i + 1}`,
    generate: (len: number) => Array.from({ length: len }, (_, j) => (j + 1) ** 2 + (j + 1) ** 3 + (i + 1)),
    description: `Mixed: n² + n³ + ${i + 1}`
  })),
  
  // Figurate number variations
  ...Array.from({ length: 20 }, (_, i) => ({
    name: `figurate_${i + 4}`,
    generate: (len: number) => Array.from({ length: len }, (_, j) => ((j + 1) * ((i + 4) * (j + 1) - (i + 2))) / 2),
    description: `${i + 4}-gonal Numbers`
  })),
  
  // Recursive patterns
  ...Array.from({ length: 20 }, (_, i) => ({
    name: `recursive_${i + 1}`,
    generate: (len: number) => {
      const seq = [i + 1, i + 2];
      for (let j = 2; j < len; j++) seq.push(seq[j - 1] + seq[j - 2] + (i % 3));
      return seq.slice(0, len);
    },
    description: `Recursive: a(n) = a(n-1) + a(n-2) + ${i % 3}`
  })),
  
  // Digit-based patterns
  ...Array.from({ length: 20 }, (_, i) => ({
    name: `digit_${i + 1}`,
    generate: (len: number) => Array.from({ length: len }, (_, j) => {
      const n = (j + 1) * (i + 2);
      return n + parseInt(n.toString().split('').reduce((a, b) => String(Number(a) + Number(b))));
    }),
    description: `Number + digit sum pattern (base ${i + 2})`
  })),
  
  // Modular patterns
  ...Array.from({ length: 20 }, (_, i) => ({
    name: `mod_${i + 8}`,
    generate: (len: number) => Array.from({ length: len }, (_, j) => ((j + 1) % (i + 8)) + (i % 3)),
    description: `Modulo ${i + 8} with offset ${i % 3}`
  })),
  
  // Alternating operations
  ...Array.from({ length: 20 }, (_, i) => ({
    name: `alt_op_${i + 1}`,
    generate: (len: number) => Array.from({ length: len }, (_, j) => 
      j % 2 === 0 ? (j + 1) ** 2 + i : (j + 1) ** 3 - i
    ),
    description: `Alternating: n² + ${i} and n³ - ${i}`
  })),
  
  // Cumulative sums
  ...Array.from({ length: 15 }, (_, i) => ({
    name: `cumsum_${i + 1}`,
    generate: (len: number) => {
      let sum = 0;
      return Array.from({ length: len }, (_, j) => {
        sum += (j + 1) ** (i % 3 + 1);
        return sum;
      });
    },
    description: `Cumulative sum of n^${i % 3 + 1}`
  })),
  
  // Differences
  ...Array.from({ length: 15 }, (_, i) => ({
    name: `diff_${i + 1}`,
    generate: (len: number) => Array.from({ length: len }, (_, j) => 
      (j + 2) ** (i % 3 + 2) - (j + 1) ** (i % 3 + 2)
    ),
    description: `Difference: (n+1)^${i % 3 + 2} - n^${i % 3 + 2}`
  })),
  
  // Products
  ...Array.from({ length: 15 }, (_, i) => ({
    name: `product_${i + 1}`,
    generate: (len: number) => Array.from({ length: len }, (_, j) => (j + 1) * (j + 2) * (i + 1)),
    description: `Product: n(n+1) × ${i + 1}`
  })),
  
  // Harmonic-like
  ...Array.from({ length: 10 }, (_, i) => ({
    name: `harmonic_${i + 1}`,
    generate: (len: number) => Array.from({ length: len }, (_, j) => Math.floor((j + 1) * (j + 2) / (i + 2))),
    description: `Harmonic-like: ⌊n(n+1)/${i + 2}⌋`
  })),
  
  // Exponential variations
  ...Array.from({ length: 10 }, (_, i) => ({
    name: `exp_var_${i + 1}`,
    generate: (len: number) => Array.from({ length: len }, (_, j) => (i + 2) ** (j + 1) + (j + 1)),
    description: `Exponential: ${i + 2}^n + n`
  })),
  
  // Complex patterns
  ...Array.from({ length: 10 }, (_, i) => ({
    name: `complex_${i + 1}`,
    generate: (len: number) => Array.from({ length: len }, (_, j) => 
      (j + 1) ** 2 + (i + 1) * (j + 1) ** 3 - (i % 5)
    ),
    description: `Complex: n² + ${i + 1}n³ - ${i % 5}`
  }))
];
