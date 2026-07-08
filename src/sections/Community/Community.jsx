import "./Community.css";
import { FaUsers, FaDiscord, FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";
function Community() {
  return (
    <motion.section
    className="community"
    id="community"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: .7 }}
>

      <div className="community-content">

        <span className="section-badge">
          Join The Community
        </span>

        <h2>
          Learn. Play. Grow Together.
        </h2>

        <p>
          Connect with chess creators, join tournaments,
          participate in discussions, and improve alongside
          thousands of passionate players.
        </p>

        <div className="community-cards">

          <div className="community-card">
            <FaUsers />
            <h3>10K+ Players</h3>
            <p>Growing every day.</p>
          </div>

          <div className="community-card">
            <FaDiscord />
            <h3>Live Discussions</h3>
            <p>Chat with players worldwide.</p>
          </div>

          <div className="community-card">
            <FaTrophy />
            <h3>Weekly Events</h3>
            <p>Compete and win rewards.</p>
          </div>

        </div>

      </div>

    </motion.section>
  );
}

export default Community;