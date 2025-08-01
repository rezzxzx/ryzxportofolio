import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import FloatingMusicPlayer from "@/components/floating-music-player";
import ClickSparkles from "@/components/click-sparkles";

export default function Home() {
  const [musicPlayerOpen, setMusicPlayerOpen] = useState(false);

  return (
    <motion.div 
      className="min-h-screen bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navigation 
        musicPlayerOpen={musicPlayerOpen}
        setMusicPlayerOpen={setMusicPlayerOpen}
      />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      <FloatingMusicPlayer 
        isOpen={musicPlayerOpen}
        onToggle={() => setMusicPlayerOpen(!musicPlayerOpen)}
      />
      <ClickSparkles />
    </motion.div>
  );
}
