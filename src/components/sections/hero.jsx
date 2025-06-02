import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config";

const Hero = () => {
  return (
    <section className="relative pt-20 pb-16 overflow-hidden hero-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 md:pt-24 md:pb-16">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <img src={siteConfig.logoUrl} alt={`${siteConfig.name} Logo`} className="h-20 w-auto md:h-24 animate-float" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
          >
            <span className="text-white">{siteConfig.hero.title.split(siteConfig.name.split('.')[0])[0]}</span>
            <span className="gradient-text">{siteConfig.name.split('.')[0]}</span>
            <span className="text-white">{siteConfig.hero.title.split(siteConfig.name.split('.')[0])[1]}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            {siteConfig.hero.subtitle}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-2xl text-gray-400 mb-8 text-center"
          >
            {siteConfig.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-zerion-purple hover:bg-zerion-purple-light text-white px-8 py-6 rounded-md font-medium transition-all duration-300 shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:shadow-[0_0_20px_rgba(147,51,234,0.7)]"
              onClick={() => {
                const pricingSection = document.getElementById('pricing');
                if (pricingSection) {
                  window.scrollTo({
                    top: pricingSection.offsetTop - 80,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {siteConfig.hero.primaryButtonText}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-zerion-purple/50 text-white hover:bg-zerion-purple/10 px-8 py-6 rounded-md font-medium transition-all duration-300"
              onClick={() => {
                const featuresSection = document.getElementById('features');
                if (featuresSection) {
                  window.scrollTo({
                    top: featuresSection.offsetTop - 80,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {siteConfig.hero.secondaryButtonText}
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-gray-500 text-sm mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1 bg-zerion-purple rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;