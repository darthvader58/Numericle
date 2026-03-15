/**
 * Converts a sequence rule description string into a LaTeX formula.
 * Handles all pattern families used in enhancedSequenceRules.ts.
 */
export function descriptionToLatex(description: string): string {
  // Extract the part after the first colon (the formula hint)
  const colonIdx = description.indexOf(':');
  const hint = colonIdx >= 0 ? description.slice(colonIdx + 1).trim() : description.trim();

  // --- Polynomial / Arithmetic patterns ---
  // e.g. "n² + 3n", "2n² + n", "n³ - 2n", "n⁴ + n²", "5n + 2", "7n - 3"
  const polyMatch = hint.match(/^([^(,]+)$/);
  if (polyMatch) {
    const expr = polyMatch[1].trim();
    const latex = exprToLatex(expr);
    if (latex) return `a_n = ${latex}`;
  }

  // --- Geometric: starts at X, [doubles/triples/...] each time ---
  const geomMatch = hint.match(/starts at (\d+),\s*(doubles|triples|quadruples|quintuples|sextuples|septuples|octuples|nonuples|decuples) each time/i);
  if (geomMatch) {
    const start = geomMatch[1];
    const ratioWord = geomMatch[2].toLowerCase();
    const ratioMap: Record<string, string> = {
      doubles: '2', triples: '3', quadruples: '4', quintuples: '5',
      sextuples: '6', septuples: '7', octuples: '8', nonuples: '9', decuples: '10'
    };
    const r = ratioMap[ratioWord];
    if (r) return `a_1 = ${start},\\quad a_n = ${r}\\,a_{n-1}`;
  }

  // --- Powers of X (from X^k): e.g. "Powers of 2 (from 2²): 4, 8, 16..." ---
  const powFromMatch = description.match(/Powers of (\d+) \(from \d+[²³⁴⁵⁶⁷]\)/i);
  if (powFromMatch) {
    const base = powFromMatch[1];
    // Extract the starting exponent from the sequence hint
    const expMatch = hint.match(/^(\d+),/);
    if (expMatch) {
      const firstVal = parseInt(expMatch[1]);
      const b = parseInt(base);
      // find k such that b^k = firstVal
      let k = 1;
      while (Math.pow(b, k) < firstVal && k < 20) k++;
      return `a_n = ${base}^{n + ${k - 1}}`;
    }
    return `a_n = ${base}^n`;
  }

  // --- Powers of X (simple): "Powers of 2: 2, 4, 8..." ---
  const powSimpleMatch = description.match(/^Powers of (\d+):/i);
  if (powSimpleMatch) {
    return `a_n = ${powSimpleMatch[1]}^n`;
  }

  // --- Recursive: a(n) = a(n-1) + a(n-2) + k ---
  const recursiveMatch = hint.match(/a\(n\)\s*=\s*a\(n-1\)\s*\+\s*a\(n-2\)\s*\+\s*(\d+)/i);
  if (recursiveMatch) {
    const k = recursiveMatch[1];
    return k === '0'
      ? `a_n = a_{n-1} + a_{n-2}`
      : `a_n = a_{n-1} + a_{n-2} + ${k}`;
  }

  // --- Modulo patterns: "Modulo X with offset Y" or "Modulo X (offset)" ---
  const modOffsetMatch = hint.match(/[Mm]odulo\s+(\d+)\s+with\s+offset\s+(\d+)/i);
  if (modOffsetMatch) {
    return `a_n = (n \\bmod ${modOffsetMatch[1]}) + ${modOffsetMatch[2]}`;
  }
  const modSimpleMatch = description.match(/[Mm]odulo\s+(\d+)/i);
  if (modSimpleMatch) {
    return `a_n = n \\bmod ${modSimpleMatch[1]}`;
  }

  // --- Quadratic: "n² + Xn + Y" (from quad_ bulk) ---
  const quadBulkMatch = hint.match(/n²\s*\+\s*(\d+)n\s*\+\s*(\d+)/);
  if (quadBulkMatch) {
    return `a_n = n^2 + ${quadBulkMatch[1]}n + ${quadBulkMatch[2]}`;
  }

  // --- Cubic: "n³ + Xn" ---
  const cubicBulkMatch = hint.match(/n³\s*\+\s*(\d+)n$/);
  if (cubicBulkMatch) {
    return `a_n = n^3 + ${cubicBulkMatch[1]}n`;
  }

  // --- Arithmetic: "Xn + Y" (from arith_ bulk) ---
  const arithBulkMatch = hint.match(/^(\d+)n\s*\+\s*(\d+)$/);
  if (arithBulkMatch) {
    return `a_n = ${arithBulkMatch[1]}n + ${arithBulkMatch[2]}`;
  }

  // --- Product: "n(n+1) × X" ---
  const productMatch = hint.match(/n\(n\+1\)\s*[×x]\s*(\d+)/i);
  if (productMatch) {
    return `a_n = ${productMatch[1]}\\,n(n+1)`;
  }

  // --- Harmonic-like: "⌊n(n+1)/X⌋" ---
  const harmonicMatch = hint.match(/⌊n\(n\+1\)\/(\d+)⌋/);
  if (harmonicMatch) {
    return `a_n = \\left\\lfloor \\dfrac{n(n+1)}{${harmonicMatch[1]}} \\right\\rfloor`;
  }

  // --- Exponential: "X^n + n" ---
  const expVarMatch = hint.match(/^(\d+)\^n\s*\+\s*n$/);
  if (expVarMatch) {
    return `a_n = ${expVarMatch[1]}^n + n`;
  }

  // --- Complex: "n² + Xn³ - Y" ---
  const complexMatch = hint.match(/n²\s*\+\s*(\d+)n³\s*-\s*(\d+)/);
  if (complexMatch) {
    return `a_n = n^2 + ${complexMatch[1]}n^3 - ${complexMatch[2]}`;
  }

  // --- Cumulative sum: "Cumulative sum of n^X" ---
  const cumsumMatch = hint.match(/[Cc]umulative sum of n\^(\d+)/);
  if (cumsumMatch) {
    return `a_n = \\sum_{k=1}^{n} k^{${cumsumMatch[1]}}`;
  }

  // --- Difference: "(n+1)^X - n^X" ---
  const diffMatch = hint.match(/\(n\+1\)\^(\d+)\s*-\s*n\^(\d+)/);
  if (diffMatch) {
    return `a_n = (n+1)^{${diffMatch[1]}} - n^{${diffMatch[2]}}`;
  }

  // --- Figurate: "X-gonal Numbers" ---
  const figurateMatch = description.match(/^(\d+)-gonal Numbers/i);
  if (figurateMatch) {
    const s = figurateMatch[1];
    return `a_n = \\dfrac{n\\bigl((${s}-2)n - (${s}-4)\\bigr)}{2}`;
  }

  // --- Alternating: "n² + X and n³ - Y" ---
  const altOpMatch = hint.match(/n²\s*\+\s*(\d+)\s*and\s*n³\s*-\s*(\d+)/);
  if (altOpMatch) {
    return `a_n = \\begin{cases} n^2 + ${altOpMatch[1]} & n \\text{ odd} \\\\ n^3 - ${altOpMatch[2]} & n \\text{ even} \\end{cases}`;
  }

  // --- Digit + digit sum pattern ---
  if (description.includes('digit sum pattern')) {
    return `a_n = n + S(n)`;
  }

  // Fallback: try to convert the hint directly
  const fallback = exprToLatex(hint);
  return fallback ? `a_n = ${fallback}` : hint;
}

/**
 * Converts a plain-text math expression to LaTeX.
 * Handles superscripts (², ³, ⁴...), common operators, and fractions.
 */
function exprToLatex(expr: string): string | null {
  // Normalize unicode superscripts
  const superMap: Record<string, string> = {
    '²': '^2', '³': '^3', '⁴': '^4', '⁵': '^5',
    '⁶': '^6', '⁷': '^7', '⁸': '^8', '⁹': '^9', '¹': '^1'
  };
  let s = expr;
  for (const [uni, tex] of Object.entries(superMap)) {
    s = s.replaceAll(uni, tex);
  }

  // Replace × with \times
  s = s.replace(/×/g, '\\times');

  // Wrap exponents: n^2 → n^{2}, but leave single digits as-is (already valid)
  // Multi-digit exponents need braces
  s = s.replace(/\^(\d{2,})/g, '^{$1}');

  // n^{k} patterns with coefficients: 2n^{3} → 2n^{3} (already fine)
  // Handle implicit multiplication: 2n → 2n (fine in LaTeX)

  // If it looks like a valid math expression, return it
  if (/^[\w\s\+\-\*\/\^\{\}\(\)\\,!]+$/.test(s)) {
    return s.trim();
  }

  return null;
}
