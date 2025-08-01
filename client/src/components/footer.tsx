import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { PORTFOLIO_CONFIG } from "@/config/constants";

export default function Footer() {
  return (
    <motion.footer
      className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          className="text-gray-400 flex items-center justify-center gap-2"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {PORTFOLIO_CONFIG.footer.text}
          {PORTFOLIO_CONFIG.footer.showHeartIcon && (
            <>
              {" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Heart className="text-blue-400 h-4 w-4 fill-current" />
              </motion.span>
            </>
          )}
        </motion.p>
      </div>
    </motion.footer>
  );
}
