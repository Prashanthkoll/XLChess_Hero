import "./Hero.css";
import { motion } from "framer-motion";

import Button from "../../components/Button/Button";
import Stats from "../../components/Stats/Stats";
import ChessBoard from "../../components/ChessBoard/ChessBoard";

function Hero() {
  return (
    <motion.section
      className="hero"
      aria-labelledby="hero-title"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* LEFT CONTENT */}
      <motion.div
        className="hero-left"
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="badge">🚀 Creator owned chess platform</div>

        <h1 id="hero-title">
          Launch a modern
          <span> creator-first chess experience.</span>
        </h1>

        <p>
          Build premium chess products with AI coaching,
          live analysis, creator tools, and a polished player-first design.
        </p>

        <div className="hero-actions">
          <Button>Start Free</Button>
          <Button variant="secondary">Watch Demo</Button>
        </div>

        <div className="hero-chips">
          <span>AI analysis</span>
          <span>Interactive lessons</span>
          <span>Creator tools</span>
        </div>
      </motion.div>

      {/* RIGHT CONTENT */}
      <motion.div
        className="hero-right"
        initial={{ opacity: 0, x: 80, rotate: 3 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <ChessBoard />
      </motion.div>

      {/* BOTTOM CONTENT */}
      <div className="hero-bottom">
        <Stats />
      </div>
    </motion.section>
  );
}

export default Hero;
