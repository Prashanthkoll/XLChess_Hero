import "./ChessBoard.css";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useEffect, useMemo, useState } from "react";
import { evergreenMoves } from "../../constants/evergreenGame";

function ChessBoard() {
  const { positions, moves } = useMemo(() => {
    const game = new Chess();
    const allPositions = [game.fen()];
    const allMoves = [null]; // no move behind the starting position

    for (const move of evergreenMoves) {
      const result = game.move(move);

      if (!result) {
        console.error("Invalid move:", move);
        break;
      }

      allPositions.push(game.fen());
      allMoves.push(result);
    }

    return { positions: allPositions, moves: allMoves };
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= positions.length - 1 ? 0 : prev + 1
      );
    }, 1800);

    return () => clearInterval(interval);
  }, [positions]);

  const lastMove = moves[currentIndex];

  const squareStyles = lastMove
    ? {
        [lastMove.from]: {
          backgroundColor: "rgba(250, 206, 8, 0.45)",
          animation: "squareFade 0.9s ease",
        },
        [lastMove.to]: {
          backgroundColor: "rgba(13, 6, 218, 0.45)",
          animation: "squareFade 0.9s ease",
        },
      }
    : {};

  return (
    <div className="board-card">
      <div className="board-header">
        <div className="game-info">
          <span className="featured-badge">Featured Game</span>
          <h3>The Evergreen Game</h3>
          <p>Anderssen vs Dufresne • 1852</p>
        </div>

        <div className="live-status-container">
          <div className="live-status">
            <span className="live-dot"></span>
            <span>Autoplay in Progress...</span>
          </div>
        </div>
      </div>

      <div className="board-wrapper">
        <div className="board-inner">
          <Chessboard
            options={{
              id: "xl-board",
              position: positions[currentIndex],
              boardOrientation: "black",
              animationDurationInMs: 800,
              allowDragging: false,
              squareStyles,
            }}
          />
        </div>
      </div>

      <div className="board-footer">
        <div>
          <span>Current Move</span>
          <h3>{lastMove ? lastMove.san : "Start"}</h3>
        </div>
      </div>
    </div>
  );
}

export default ChessBoard;
