import "./Background.css";
import FloatingPieces from "../FloatingPieces/FloatingPieces";

function Background() {
  return (
    <div className="background">

      <div className="gradient"></div>

      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="orb orb3"></div>

      <FloatingPieces />

    </div>
  );
}

export default Background;