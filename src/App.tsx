import { useEffect, useState } from "react";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./sections/HeroSection";
import { PricingSection } from "./sections/PricingSection";
import { TorontoTeaserSection } from "./sections/TorontoTeaserSection";
import { Footer } from "./components/Footer";
import { TalkToUsPage } from "./pages/TalkToUsPage";

function App() {
  const [path, setPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/",
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (path.startsWith("/talktous")) {
    return <TalkToUsPage />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative z-10">
        <Navigation />
        <main>
          <HeroSection />
          <TorontoTeaserSection />
          <PricingSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
