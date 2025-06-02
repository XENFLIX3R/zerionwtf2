import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";

const Features = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: "spring", stiffness: 100 } },
  };

  return (
    <section id="features" className="py-20 section-gradient-alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="w-24 h-1 bg-zerion-purple mx-auto mb-6 rounded-full"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {siteConfig.features.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {siteConfig.features.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {siteConfig.features.items.map((feature, index) => {
            const IconComponent = LucideIcons[feature.icon] || LucideIcons.HelpCircle;
            return (
              <motion.div
                key={index}
                variants={item}
                className="feature-card bg-zerion-black-light p-6 rounded-xl shadow-lg border border-zerion-purple/20 transition-all duration-300 hover:shadow-[0_0_25px_rgba(147,51,234,0.25)] hover:border-zerion-purple/40"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-zerion-purple/10 mr-4">
                    <IconComponent className="w-6 h-6 text-zerion-purple" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-400 mb-4 text-sm">{feature.description}</p>
                {feature.learnMoreLink && (
                  <Button
                    variant="link"
                    className="text-zerion-purple hover:text-zerion-purple-light p-0 h-auto text-sm"
                    onClick={() => {
                      if (feature.learnMoreLink.startsWith("#")) {
                        const targetElement = document.querySelector(feature.learnMoreLink);
                        if (targetElement) {
                          window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                          });
                        }
                      } else {
                        window.open(feature.learnMoreLink, '_blank');
                      }
                    }}
                  >
                    Learn More
                  </Button>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;