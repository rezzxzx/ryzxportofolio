import { motion } from "framer-motion";
import { ExternalLink, Github, Code, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PORTFOLIO_CONFIG } from "@/config/constants";

// Icon mapping for projects
const iconMap = {
  Code,
  Globe,
  Github,
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 smooth-transition">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Project Saya</span>
          </h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full" />
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Berikut adalah beberapa project yang telah saya kerjakan menggunakan berbagai teknologi modern
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PORTFOLIO_CONFIG.projects.map((project, index) => {
            const IconComponent = iconMap[project.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="glass rounded-xl overflow-hidden group hover:border-blue-500/50 transition-colors duration-200 hover-scale gpu-accelerated">
                  <CardContent className="p-0">
                    {/* Project Header */}
                    <div className={`p-6 bg-gradient-to-r ${project.color} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="relative z-10 flex items-center justify-between">
                        <IconComponent className="text-white text-2xl" />
                        <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                          {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technology Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded border border-gray-600/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Button */}
                      <motion.div
                        className="pt-4"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          className="w-full gradient-bg text-white font-semibold hover:shadow-lg transition-all duration-300"
                          onClick={() => window.open(project.projectUrl, '_blank')}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Lihat Project
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* View All Projects Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className="gradient-bg text-white font-semibold px-8 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => window.open(PORTFOLIO_CONFIG.socialLinks.githubPortfolio, '_blank')}
          >
            <Github className="mr-2 h-5 w-5" />
            Lihat Semua Project di GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
}