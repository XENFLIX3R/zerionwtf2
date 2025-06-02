import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config";
import * as LucideIcons from "lucide-react";

const Support = () => {
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="support" className="py-20 section-gradient">
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
            {siteConfig.support.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {siteConfig.support.description}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {siteConfig.support.categories.map((category, index) => {
            const IconComponent = LucideIcons[category.icon] || LucideIcons.HelpCircle;
            return (
              <motion.div
                key={index}
                variants={item}
                className="support-card bg-zerion-black-light p-6 rounded-xl shadow-lg border border-zerion-purple/20 text-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.2)] hover:border-zerion-purple/30"
              >
                <div className="p-4 inline-block rounded-full bg-zerion-purple/10 mb-4">
                  <IconComponent className="w-8 h-8 text-zerion-purple" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                <p className="text-gray-400 text-sm">{category.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Support;