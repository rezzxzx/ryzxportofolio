import { motion } from "framer-motion";
import { PORTFOLIO_CONFIG } from "@/config/constants";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 40, className = "" }: LogoProps) {
  const { letter, colors, animation } = PORTFOLIO_CONFIG.logo;
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="100%" stopColor={colors.secondary} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle with glow */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="rgba(135, 206, 235, 0.1)"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          filter="url(#glow)"
          animate={{ 
            strokeWidth: [2, 3, 2],
            fill: [
              "rgba(135, 206, 235, 0.1)",
              "rgba(135, 206, 235, 0.2)",
              "rgba(135, 206, 235, 0.1)"
            ]
          }}
          transition={{ 
            duration: animation.enabled ? animation.duration : 0,
            repeat: animation.enabled ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
        
        {/* Letter R with auto-repeating animation */}
        <motion.path
          d="M 25 25 L 25 75 M 25 25 L 50 25 Q 65 25 65 40 Q 65 50 50 50 L 25 50 M 45 50 L 65 75"
          stroke="url(#logoGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#glow)"
          animate={animation.enabled ? { 
            pathLength: [0, 1, 1, 0],
            strokeWidth: [4, 5, 4]
          } : {}}
          transition={{ 
            duration: animation.enabled ? animation.duration : 0,
            repeat: animation.enabled ? Infinity : 0,
            ease: "easeInOut",
            times: [0, 0.5, 0.8, 1]
          }}
        />
      </svg>
    </motion.div>
  );
}