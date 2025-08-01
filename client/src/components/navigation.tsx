import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Music, Disc3, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { PORTFOLIO_CONFIG } from "@/config/constants";

const navItems = PORTFOLIO_CONFIG.navigation;

interface NavigationProps {
  musicPlayerOpen?: boolean;
  setMusicPlayerOpen?: (open: boolean) => void;
}

export default function Navigation({ musicPlayerOpen = false, setMusicPlayerOpen }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    const throttledScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 border-b border-gray-800 transition-all duration-300 ${
        scrolled ? "bg-gray-900/95 backdrop-blur-sm" : "bg-gray-900/80"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex-shrink-0 flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Logo size={32} />
            <span className="text-xl font-bold gradient-text">
              {PORTFOLIO_CONFIG.personal.displayTitle}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item, index) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover-scale gpu-accelerated"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Music Player Button in Desktop Navigation */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setMusicPlayerOpen?.(!musicPlayerOpen)}
                  variant="ghost"
                  size="icon"
                  className={`w-10 h-10 rounded-full border transition-all duration-300 ${
                    musicPlayerOpen 
                      ? 'bg-blue-600/30 hover:bg-blue-600/40 border-blue-500/50 text-blue-400' 
                      : 'bg-gray-800/50 hover:bg-blue-600/20 border-gray-600/50 hover:border-blue-500/50 text-gray-300 hover:text-blue-400'
                  }`}
                >
                  <Disc3 className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile menu buttons */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Music Player Button for Mobile */}
            <Button
              onClick={() => setMusicPlayerOpen?.(!musicPlayerOpen)}
              variant="ghost"
              size="icon"
              className={`w-10 h-10 rounded-full border transition-all duration-300 ${
                musicPlayerOpen 
                  ? 'bg-blue-600/30 hover:bg-blue-600/40 border-blue-500/50 text-blue-400' 
                  : 'bg-gray-800/50 hover:bg-blue-600/20 border-gray-600/50 hover:border-blue-500/50 text-gray-300 hover:text-blue-400'
              }`}
            >
              <Disc3 className="h-5 w-5" />
            </Button>
            
            {/* Hamburger Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden glass"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Navigation Items */}
            <div className="px-2 pt-2 pb-3 space-y-1 overflow-hidden">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white transition-all duration-300"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  {item.label}
                </motion.button>
              ))}
              
              {/* Music Player Button in Mobile Menu */}
              <motion.button
                onClick={() => setMusicPlayerOpen?.(!musicPlayerOpen)}
                className={`block w-full text-left px-3 py-2 transition-all duration-300 ${
                  musicPlayerOpen ? 'text-blue-400' : 'text-gray-300 hover:text-white'
                }`}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <div className="flex items-center space-x-2">
                  <Music className="h-4 w-4" />
                  <span>Music Player</span>
                  {musicPlayerOpen && <div className="w-2 h-2 bg-blue-400 rounded-full ml-auto" />}
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}