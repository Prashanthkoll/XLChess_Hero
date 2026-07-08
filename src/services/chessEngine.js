import { Chess } from "chess.js";

// Base material values
const PIECE_VALUES = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 };

// Search depth per difficulty level (1 = weakest, 5 = strongest)
const DEPTH_BY_LEVEL = { 1: 1, 2: 1, 3: 2, 4: 3, 5: 3 };

// Chance of the AI deliberately picking a slightly worse move,
// so low levels feel human/beatable rather than robotic
const BLUNDER_CHANCE_BY_LEVEL = { 1: 0.7, 2: 0.4, 3: 0.15, 4: 0.05, 5: 0 };

function orderMoves(moves) {
  // Search captures first (rough MVV-LVA) — makes alpha-beta pruning much more effective
  return [...moves].sort((a, b) => {
    const aCap = a.captured ? PIECE_VALUES[a.captured] : 0;
    const bCap = b.captured ? PIECE_VALUES[b.captured] : 0;
    return bCap - aCap;
  });
}

function evaluateBoard(game) {
  if (game.isCheckmate()) {
    // The side to move is checkmated, so the other side scores +Infinity
    return game.turn() === "w" ? -Infinity : Infinity;
  }
  if (game.isDraw() || game.isStalemate() || game.isThreefoldRepetition()) {
    return 0;
  }

  const board = game.board();
  let score = 0;

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const piece = board[rank][file];
      if (!piece) continue;

      let value = PIECE_VALUES[piece.type];

      // Small bonus for central control / piece activity
      const centerDistance = Math.abs(3.5 - rank) + Math.abs(3.5 - file);
      value += (7 - centerDistance) * 2;

      // Small bonus for pawns advancing toward promotion
      if (piece.type === "p") {
        value += piece.color === "w" ? (7 - rank) * 4 : rank * 4;
      }

      score += piece.color === "w" ? value : -value;
    }
  }

  return score;
}

function minimax(game, depth, alpha, beta, maximizing) {
  if (depth === 0 || game.isGameOver()) {
    return evaluateBoard(game);
  }

  const moves = orderMoves(game.moves({ verbose: true }));

  if (maximizing) {
    let best = -Infinity;
    for (const move of moves) {
      game.move(move);
      best = Math.max(best, minimax(game, depth - 1, alpha, beta, false));
      game.undo();
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  }

  let best = Infinity;
  for (const move of moves) {
    game.move(move);
    best = Math.min(best, minimax(game, depth - 1, alpha, beta, true));
    game.undo();
    beta = Math.min(beta, best);
    if (beta <= alpha) break;
  }
  return best;
}

/**
 * Returns the AI's chosen move (a chess.js verbose move object) for the given
 * FEN and difficulty level (1-5). Returns null if there are no legal moves.
 */
export function getBestMove(fen, difficulty) {
  const game = new Chess(fen);
  const moves = orderMoves(game.moves({ verbose: true }));
  if (moves.length === 0) return null;

  const depth = DEPTH_BY_LEVEL[difficulty] ?? 2;
  const blunderChance = BLUNDER_CHANCE_BY_LEVEL[difficulty] ?? 0.15;
  const maximizing = game.turn() === "w";

  // Score every candidate move at the configured depth
  const scored = moves.map((move) => {
    game.move(move);
    const score = minimax(game, depth - 1, -Infinity, Infinity, !maximizing);
    game.undo();
    return { move, score };
  });

  scored.sort((a, b) => (maximizing ? b.score - a.score : a.score - b.score));

  // Occasionally choose from the next-best moves instead of the top one,
  // scaled by difficulty, so weaker levels make realistic mistakes
  if (Math.random() < blunderChance && scored.length > 1) {
    const pool = scored.slice(0, Math.min(4, scored.length));
    return pool[Math.floor(Math.random() * pool.length)].move;
  }

  return scored[0].move;
}

/** Static evaluation of a position, in centipawns, positive favors White. */
export function evaluatePosition(fen) {
  const game = new Chess(fen);
  const score = evaluateBoard(game);
  if (!Number.isFinite(score)) return score > 0 ? 2000 : -2000;
  return score;
}