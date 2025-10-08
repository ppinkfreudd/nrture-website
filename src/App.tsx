import { Navigation } from "./components/Navigation";
import { HeroSection } from "./sections/HeroSection";
import { WorldMapSection } from "./sections/WorldMapSection";
import { PricingSection } from "./sections/PricingSection";
import { TorontoTeaserSection } from "./sections/TorontoTeaserSection";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <PricingSection />
        <TorontoTeaserSection />
      </main>
      <Footer />
      <WorldMapSection />
    </div>
  );
}

export default App;
