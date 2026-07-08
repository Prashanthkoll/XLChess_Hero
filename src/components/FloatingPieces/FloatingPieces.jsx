import "./FloatingPieces.css";
import { motion } from "framer-motion";

const pieces = [
  "♔","♕","♖","♗","♘","♙",
  "♚","♛","♜","♝","♞","♟"
];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function FloatingPieces() {
  const totalPieces = 35;

  return (
    <div className="floating-container">
      {Array.from({ length: totalPieces }).map((_, i) => {

        const direction = Math.random() > 0.5 ? "up" : "down";

        const left = random(0, 100);

        const duration = random(18, 35);

        // Bigger pieces
        const size = random(50, 110);

        const rotate = random(-360, 360);

        const piece =
          pieces[Math.floor(Math.random() * pieces.length)];

        return (
          <motion.div
            key={i}
            className="floating-piece"
            initial={{
              y: direction === "up"
                ? window.innerHeight + 100
                : -150,

              opacity: random(0.08, 0.18),

              rotate: 0
            }}
            animate={{
              y: direction === "up"
                ? -200
                : window.innerHeight + 200,

              x: [0, -40, 40, -20, 20, 0],

              rotate,

              opacity: [0.12, 0.18, 0.12]
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${left}%`,
              fontSize: `${size}px`
            }}
          >
            {piece}
          </motion.div>
        );
      })}
    </div>
  );
}

export default FloatingPieces;