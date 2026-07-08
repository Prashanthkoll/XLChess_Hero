import "./Stats.css";
import { motion } from "framer-motion";
import { FaUsers, FaStar, FaChessKnight } from "react-icons/fa";

const stats = [
  {
    icon: <FaChessKnight />,
    number: "24/7",
    title: "Live Practice",
  },
  {
    icon: <FaUsers />,
    number: "10K+",
    title: "Players",
  },
  {
    icon: <FaStar />,
    number: "4.9★",
    title: "User Rating",
  },
];

function Stats() {
  return (
    <div className="stats">
      {stats.map((item, index) => (
        <motion.div
          key={index}
          className="stat-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.2,
            duration: 0.6,
          }}
          whileHover={{
            y: -8,
            scale: 1.05,
          }}
        >
          <div className="stat-icon">
            {item.icon}
          </div>

          <h2>{item.number}</h2>

          <p>{item.title}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default Stats;