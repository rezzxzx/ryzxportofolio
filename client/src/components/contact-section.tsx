import { motion } from "framer-motion";
import { Instagram, Github, Mail, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PORTFOLIO_CONFIG } from "@/config/constants";

const socialLinks = [
  {
    name: "Instagram",
    username: "@xvrezz_",
    url: PORTFOLIO_CONFIG.socialLinks.instagram,
    icon: Instagram,
    color: "from-pink-500 to-purple-600",
  },
  {
    name: "GitHub",
    username: "rezzxzx",
    url: PORTFOLIO_CONFIG.socialLinks.github,
    icon: Github,
    color: "from-gray-600 to-gray-700",
  },
  {
    name: "Email",
    username: PORTFOLIO_CONFIG.socialLinks.email,
    url: `mailto:${PORTFOLIO_CONFIG.socialLinks.email}`,
    icon: Mail,
    color: "from-blue-500 to-blue-600",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 smooth-transition">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Mari Terhubung</span>
          </h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full" />
        </motion.div>

        <div className="flex justify-center items-center gap-8 mb-12">
          {socialLinks.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target={link.name !== "Email" ? "_blank" : undefined}
                rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                className={`group transition-all duration-300 hover:transform hover:scale-110`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${link.color} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <IconComponent className="text-white text-xl" />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Motivational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="text-center glass rounded-2xl p-8 border border-gray-700/50">
            <CardContent className="p-0">
              <motion.div
                className="mb-4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Quote className="text-3xl text-blue-400 opacity-50 mx-auto" />
              </motion.div>
              <motion.p
                className="text-xl sm:text-2xl text-gray-300 font-light italic leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                "Masa depan milik mereka yang percaya pada keindahan mimpi mereka, dan saya yakin dengan belajar terus-menerus, saya dapat menciptakan dampak positif melalui teknologi."
              </motion.p>
              <motion.div
                className="mt-4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Quote className="text-3xl text-blue-300 opacity-50 mx-auto rotate-180" />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
