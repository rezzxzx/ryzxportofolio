import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_CONFIG } from "@/config/constants";

// Get typing phrases from configuration
const TYPING_PHRASES = PORTFOLIO_CONFIG.typingAnimation;

const ANIMATION_DELAYS = {
  profileImage: 0.2,
  nameHeading: 0.4,
  typingEffect: 0.8,
  callToAction: 1.2
};

const TYPING_SPEEDS = {
  typing: 100,
  deleting: 50,
  pauseAfterComplete: 2000,
  pauseAfterDelete: 500
};

export default function HeroSection() {
  const [typingText, setTypingText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Using configuration constant
  const phrases = TYPING_PHRASES;

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? TYPING_SPEEDS.deleting : TYPING_SPEEDS.typing;
    const pauseTime = isDeleting ? TYPING_SPEEDS.pauseAfterDelete : TYPING_SPEEDS.pauseAfterComplete;

    const timeout = setTimeout(() => {
      if (!isDeleting && typingText === currentPhrase) {
        // Pause before deleting
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && typingText === "") {
        // Move to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else if (isDeleting) {
        // Delete character
        setTypingText(currentPhrase.substring(0, typingText.length - 1));
      } else {
        // Add character
        setTypingText(currentPhrase.substring(0, typingText.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typingText, currentPhraseIndex, isDeleting, phrases]);

  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden smooth-transition">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${PORTFOLIO_CONFIG.personal.backgroundImage}')` }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gray-900/70" />
        {/* Static gradient overlay for performance */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-gray-900/50" />
        
        {/* Optimized floating particles - reduced count */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full gpu-accelerated"
            animate={{
              y: [-15, -25, -15],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "linear"
            }}
            style={{
              left: `${25 + i * 25}%`,
              top: `${30 + (i % 2) * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Image with Enhanced Animation */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ scale: 0, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: ANIMATION_DELAYS.profileImage, duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <div className="relative">
              <img
                src={PORTFOLIO_CONFIG.personal.profileImage}
                alt={`${PORTFOLIO_CONFIG.personal.fullName} Profile Picture`}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-blue-400/40 shadow-2xl object-cover object-center hover-scale gpu-accelerated"
                loading="eager"
                decoding="async"
                width="160"
                height="160"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/10 to-blue-600/20" />
            </div>
          </motion.div>

          {/* Name with Glow Effect */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 relative"
            initial={{ y: 50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ 
              delay: ANIMATION_DELAYS.nameHeading, 
              duration: 1.2,
              type: "spring",
              stiffness: 100 
            }}
          >
            <motion.span 
              className="gradient-text glow-text relative inline-block"
              animate={{ 
                filter: [
                  "drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))",
                  "drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))",
                  "drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))"
                ]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {PORTFOLIO_CONFIG.personal.fullName}
            </motion.span>
          </motion.h1>

          {/* Typing Effect */}
          <motion.div
            className="text-xl sm:text-2xl text-gray-300 mb-8 h-16 flex items-center justify-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: ANIMATION_DELAYS.typingEffect, duration: 0.8 }}
          >
            <span className="font-mono font-semibold tracking-wide">
              {typingText}
              <motion.span
                className="inline-block w-0.5 h-6 bg-blue-400 ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </span>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: ANIMATION_DELAYS.callToAction, duration: 0.8 }}
          >
            <Button
              onClick={scrollToAbout}
              className="gradient-bg text-white font-semibold px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              size="lg"
            >
              <span>More About Me!</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
