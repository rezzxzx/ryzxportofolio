import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Brain, Github, Code2, FileCode, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { PORTFOLIO_CONFIG } from "@/config/constants";

// Map skill names to icons
const skillIcons = {
  "HTML & CSS": FileCode,
  "JavaScript": Code2,
  "React": Code2,
  "Python": Brain,
  "UI/UX Design": Zap,
  "Git & GitHub": Github,
} as const;

const skills = PORTFOLIO_CONFIG.skills.map(skill => ({
  name: skill.name,
  percentage: skill.level,
  icon: skillIcons[skill.name as keyof typeof skillIcons] || Code2,
  color: skill.color,
  iconColor: skill.color.includes('orange') ? 'text-orange-400' :
             skill.color.includes('yellow') ? 'text-yellow-400' :
             skill.color.includes('blue') ? 'text-blue-400' :
             skill.color.includes('green') ? 'text-green-400' :
             skill.color.includes('purple') ? 'text-purple-400' :
             skill.color.includes('gray') ? 'text-gray-400' : 'text-blue-400'
}));

export default function SkillsSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30 smooth-transition">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Keahlian Saya</span>
          </h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-8">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="glass rounded-xl p-6 hover:border-slate-600/50 transition-colors duration-200 group hover-scale gpu-accelerated">
                  <CardContent className="p-0">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-3">
                        <IconComponent className={`${skill.iconColor} text-xl group-hover:scale-110 transition-transform duration-300`} />
                        <span className="text-lg font-semibold text-white">
                          {skill.name}
                        </span>
                      </div>
                      <span className={`${skill.iconColor} font-bold text-lg`}>
                        {skill.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full skill-progress-bar`}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.percentage}%` } : { width: 0 }}
                        transition={{
                          delay: index * 0.2,
                          duration: 2,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
