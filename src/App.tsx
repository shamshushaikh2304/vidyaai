import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import Stats from "./components/landing/Stats";
import AITutorDemo from "./components/landing/AITutorDemo";
import Features from "./components/landing/Features";
import Analytics from "./components/landing/Analytics";
import Testimonials from "./components/landing/Testimonials";
import Pricing from "./components/landing/Pricing";
import FinalCTA from "./components/landing/FinalCTA";
import Footer from "./components/landing/Footer";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0A0F] text-white">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <AITutorDemo />
        <Features />
        <Analytics />
        <Testimonials />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
