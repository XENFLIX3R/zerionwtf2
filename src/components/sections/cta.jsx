import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config";

const CTA = () => {
  return (
    <section className="py-20 bg-zerion-purple-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          {siteConfig.cta.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-300 max-w-xl mx-auto mb-8"
        >
          {siteConfig.cta.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            size="lg"
            className="bg-white text-zerion-purple hover:bg-gray-200 px-8 py-3 rounded-md font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
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
            {siteConfig.cta.buttonText}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;