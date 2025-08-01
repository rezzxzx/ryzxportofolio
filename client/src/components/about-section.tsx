import { motion } from "framer-motion";
import { MapPin, Calendar, Rocket, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PORTFOLIO_CONFIG } from "@/config/constants";

const aboutItems = [
  {
    icon: GraduationCap,
    label: "Status",
    value: PORTFOLIO_CONFIG.personal.status,
    color: "text-green-400",
  },
  {
    icon: MapPin,
    label: "Lokasi",
    value: PORTFOLIO_CONFIG.personal.location,
    color: "text-blue-400",
  },
  {
    icon: Calendar,
    label: "Tanggal Lahir",
    value: PORTFOLIO_CONFIG.personal.birthDate,
    color: "text-purple-400",
  },
  {
    icon: Rocket,
    label: "Passion",
    value: PORTFOLIO_CONFIG.personal.passion,
    color: "text-emerald-400",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 smooth-transition">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">{PORTFOLIO_CONFIG.personal.aboutMe.title}</span>
          </h2>
          <div className="w-20 h-1 gradient-bg mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="glass rounded-2xl p-8 sm:p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <motion.p
                      className="text-lg"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      Saya adalah pelajar dari{" "}
                      <span className="text-blue-400 font-semibold">
                        {PORTFOLIO_CONFIG.personal.location} – Indonesia
                      </span>
                      . Lahir{" "}
                      <span className="text-blue-300 font-semibold">
                        {PORTFOLIO_CONFIG.personal.birthDate}
                      </span>
                      .
                    </motion.p>
                    <motion.p
                      className="text-lg"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      Sejak kecil saya sangat tertarik pada dunia teknologi. Saya ingin terus belajar agar menjadi yang terbaik di bidang{" "}
                      <span className="text-blue-400 font-semibold">teknologi</span> dan{" "}
                      <span className="text-blue-300 font-semibold">artificial intelligence</span>.
                    </motion.p>
                  </div>
                </div>

                <div className="space-y-4">
                  {aboutItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                        viewport={{ once: true }}
                      >
                        <Card className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/50 hover:border-gray-500/50 transition-colors duration-200 hover-scale gpu-accelerated">
                          <CardContent className="p-0">
                            <div className="flex items-center space-x-3 mb-4">
                              <IconComponent className={`${item.color} text-xl`} />
                              <span className="text-gray-300">{item.label}</span>
                            </div>
                            <p className="text-white font-semibold">{item.value}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
