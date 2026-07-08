import "./Features.css";
import { FaRobot, FaGraduationCap, FaTrophy, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
const features = [
  {
    icon: <FaRobot />,
    title: "AI Analysis",
    text: "Analyze every move with powerful AI insights."
  },
  {
    icon: <FaGraduationCap />,
    title: "Interactive Lessons",
    text: "Learn through structured lessons and puzzles."
  },
  {
    icon: <FaTrophy />,
    title: "Play Tournaments",
    text: "Host tournaments and challenge your community."
  },
  {
    icon: <FaUsers />,
    title: "Creator Community",
    text: "Build your own chess audience and grow together."
  }
];

function Features() {
  return (
    <motion.section
    className="features"
    id="features"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: .7 }}
>

      <h2>Everything You Need</h2>

      <p className="section-text">
        Powerful tools designed for players, coaches and creators.
      </p>

      <div className="features-grid">

        {features.map((item, index) => (

          <div className="feature-card" key={index}>

            <div className="feature-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.text}</p>

          </div>

        ))}

      </div>

    </motion.section>
  );
}

export default Features;