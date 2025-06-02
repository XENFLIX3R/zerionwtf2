import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config";

const FinalCTA = () => {
  return (
    <section className="py-24 bg-zerion-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", stiffness: 90 }}
          className="bg-gradient-to-r from-zerion-purple-dark via-zerion-purple to-zerion-purple-light p-10 md:p-16 rounded-xl shadow-2xl text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to <span className="text-black">Transform</span> Your Experience?
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10">
            Join thousands of satisfied users. Get started with Zerion today and unlock a new level of power and control.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              size="lg"
              className="bg-white text-zerion-purple hover:bg-gray-200 px-10 py-4 rounded-md font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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
              View Pricing Plans
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 px-10 py-4 rounded-md font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={() => {
                window.open(siteConfig.discordUrl, '_blank');
              }}
            >
              Join Discord Community
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;