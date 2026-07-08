import "./AnalysisSection.css";
import { FaBrain, FaChartLine, FaBolt } from "react-icons/fa";
import { motion } from "framer-motion";
function AnalysisSection() {
  return (
    <motion.section
    className="analysis-section"
    id="analysis"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: .7 }}
>

      <div className="analysis-left">

        <span className="section-badge">
          AI Powered
        </span>

        <h2>
          Analyze Every Move Like a Grandmaster
        </h2>

        <p>
          Receive instant feedback, understand mistakes,
          discover stronger continuations, and improve your
          game with powerful AI assistance.
        </p>

        <div className="analysis-list">

          <div>
            <FaBrain />
            <span>Engine Evaluation</span>
          </div>

          <div>
            <FaChartLine />
            <span>Performance Insights</span>
          </div>

          <div>
            <FaBolt />
            <span>Instant Suggestions</span>
          </div>

        </div>

      </div>

      <div className="analysis-right">

        <div className="analysis-preview">

          <div className="eval-bar">
            <div className="eval-fill"></div>
          </div>

          <h3>Engine Evaluation</h3>

          <h1>+1.8</h1>

          <p>White has a slight advantage.</p>

        </div>

      </div>

    </motion.section>
  );
}

export default AnalysisSection;