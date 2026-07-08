import Background from "./components/Background/Background";
import Home from "./pages/Home";
import Features from "./sections/Features/Features";
import AnalysisSection from "./sections/AnalysisSection/AnalysisSection";
import Community from "./sections/Community/Community";
import Pricing from "./sections/Pricing/Pricing";
import Footer from "./components/Footer/Footer";
import PlayChess from "./components/PlayChess/PlayChess";

function App() {
  return (
    <>
      <Background />
      <main className="app-main">
        <Home />
        <PlayChess />
        <Features />
        <AnalysisSection />
        <Community />
        <Pricing />
        <Footer />
      </main>
    </>
  );
}

export default App;