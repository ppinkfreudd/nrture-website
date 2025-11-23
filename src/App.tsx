import { useEffect, useState } from "react";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./sections/HeroSection";
import { ProblemSolutionSection } from "./sections/ProblemSolutionSection";
import { MeetElaraSection } from "./sections/MeetElaraSection";
import { PricingSection } from "./sections/PricingSection";
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
    <div className="min-h-screen w-screen bg-white">
      <div className="relative z-10 w-full overflow-x-hidden">
        <Navigation />
        <main className="w-full overflow-x-hidden">
          <HeroSection />
          <ProblemSolutionSection />
          <MeetElaraSection />
          <PricingSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
