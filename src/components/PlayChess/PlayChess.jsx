import "./PlayChess.css";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useEffect, useRef, useState } from "react";
import { getBestMove, evaluatePosition } from "../../services/chessEngine";

const DIFFICULTY_LABELS = {
  1: "Beginner",
  2: "Easy",
  3: "Intermediate",
  4: "Hard",
  5: "Expert",
};

function PlayChess() {
  const gameRef = useRef(new Chess());

  const [fen, setFen] = useState(gameRef.current.fen());
  const [started, setStarted] = useState(false);
  const [playerColor, setPlayerColor] = useState("w");
  const [difficulty, setDifficulty] = useState(3);
  const [isThinking, setIsThinking] = useState(false);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState("");
  const [evalScore, setEvalScore] = useState(0);
  const [lastMove, setLastMove] = useState(null);

  const aiColor = playerColor === "w" ? "b" : "w";

  const refreshStatus = (game) => {
    if (game.isCheckmate()) {
      setStatus(`Checkmate — ${game.turn() === "w" ? "Black" : "White"} wins`);
    } else if (game.isStalemate()) {
      setStatus("Stalemate — Draw");
    } else if (game.isDraw()) {
      setStatus("Draw");
    } else if (game.isCheck()) {
      setStatus(`${game.turn() === "w" ? "White" : "Black"} is in check`);
    } else {
      setStatus(`${game.turn() === "w" ? "White" : "Black"} to move`);
    }
  };

  const syncState = () => {
    const game = gameRef.current;
    setFen(game.fen());
    setHistory(game.history({ verbose: true }));
    setEvalScore(evaluatePosition(game.fen()));
    refreshStatus(game);
  };

  const makeAIMove = () => {
    const game = gameRef.current;
    if (game.isGameOver()) return;

    setIsThinking(true);

    // Small delay so the move doesn't feel instant/robotic
    setTimeout(() => {
      const move = getBestMove(game.fen(), difficulty);
      if (move) {
        const result = game.move(move.san);
        setLastMove(result);
      }
      setIsThinking(false);
      syncState();
    }, 400);
  };

  useEffect(() => {
    const game = gameRef.current;
    if (started && !game.isGameOver() && game.turn() === aiColor) {
      makeAIMove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, fen]);

  const startGame = () => {
    gameRef.current = new Chess();
    setLastMove(null);
    setStarted(true);
    syncState();
  };

  const resetGame = () => {
    gameRef.current = new Chess();
    setLastMove(null);
    setStarted(false);
    syncState();
  };

  const undoMove = () => {
    const game = gameRef.current;
    if (isThinking || game.history().length === 0) return;

    // Undo the AI's reply plus your move, so it's your turn again
    // at the same point you moved from.
    game.undo();
    if (game.turn() !== playerColor && game.history().length > 0) {
      game.undo();
    }

    setLastMove(null);
    syncState();
  };

  const onPieceDrop = ({ sourceSquare, targetSquare }) => {
    const game = gameRef.current;

    if (isThinking || game.turn() !== playerColor || game.isGameOver()) {
      return false;
    }

    const result = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (!result) return false;

    setLastMove(result);
    syncState();
    return true;
  };

  const squareStyles = lastMove
    ? {
        [lastMove.from]: {
          backgroundColor: "rgba(248, 184, 78, 0.4)",
        },
        [lastMove.to]: {
          backgroundColor: "rgba(115, 215, 255, 0.4)",
        },
      }
    : {};

  // Convert centipawn score into a 0-100 fill for the eval bar (White favored = higher)
  const clampedScore = Math.max(-1000, Math.min(1000, evalScore));
  const evalPercent = 50 + clampedScore / 20;

  const movePairs = history.reduce((rows, move, i) => {
    if (i % 2 === 0) rows.push([move]);
    else rows[rows.length - 1].push(move);
    return rows;
  }, []);

  const canUndo = !isThinking && history.length > 0;

  if (!started) {
    return (
      <div className="play-card">
        <h3>Play vs Computer</h3>
        <p className="play-subtitle">Choose your side and difficulty to begin.</p>

        <div className="setup-group">
          <span className="setup-label">Play as</span>
          <div className="option-row">
            <button
              type="button"
              className={`option-btn ${playerColor === "w" ? "active" : ""}`}
              onClick={() => setPlayerColor("w")}
            >
              White
            </button>
            <button
              type="button"
              className={`option-btn ${playerColor === "b" ? "active" : ""}`}
              onClick={() => setPlayerColor("b")}
            >
              Black
            </button>
          </div>
        </div>

        <div className="setup-group">
          <span className="setup-label">Difficulty</span>
          <div className="option-row">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                type="button"
                key={level}
                className={`option-btn level-btn ${difficulty === level ? "active" : ""}`}
                onClick={() => setDifficulty(level)}
              >
                {level}
              </button>
            ))}
          </div>
          <span className="difficulty-label">{DIFFICULTY_LABELS[difficulty]}</span>
        </div>

        <button type="button" className="play-btn" onClick={startGame}>
          Play
        </button>
      </div>
    );
  }

  return (
    <div className="play-card">
      <div className="play-header">
        <div>
          <h3>Play vs Computer</h3>
          <p className="play-subtitle">
            You: {playerColor === "w" ? "White" : "Black"} • {DIFFICULTY_LABELS[difficulty]}
          </p>
        </div>
        <div className="header-actions">
          <button type="button" className="back-btn" onClick={undoMove} disabled={!canUndo}>
            ↶ Back
          </button>
          <button type="button" className="new-game-btn" onClick={resetGame}>
            New Game
          </button>
        </div>
      </div>

      <div className="play-body">
        <div className="board-column">
          <Chessboard
            options={{
              id: "play-board",
              position: fen,
              boardOrientation: playerColor === "w" ? "white" : "black",
              onPieceDrop,
              allowDragging: !isThinking && gameRef.current.turn() === playerColor,
              squareStyles,
              animationDurationInMs: 250,
            }}
          />
          <div className="status-row">
            <span className={`status-text ${isThinking ? "thinking" : ""}`}>
              {isThinking ? "Computer is thinking…" : status}
            </span>
          </div>
        </div>

        <div className="analysis-column">
          <div className="eval-bar-wrapper">
            <span className="eval-label">Evaluation</span>
            <div className="eval-bar">
              <div className="eval-fill" style={{ height: `${evalPercent}%` }} />
            </div>
            <span className="eval-score">
              {evalScore > 0 ? "+" : ""}
              {(evalScore / 100).toFixed(1)}
            </span>
          </div>

          <div className="move-history">
            <span className="setup-label">Moves</span>
            <ol className="history-list">
              {movePairs.map((pair, i) => (
                <li key={i}>
                  <span className="move-number">{i + 1}.</span>
                  <span>{pair[0]?.san}</span>
                  <span>{pair[1]?.san || ""}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayChess;
