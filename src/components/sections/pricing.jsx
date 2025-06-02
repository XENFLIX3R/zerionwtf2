import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config";

const Pricing = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const plansToDisplay = siteConfig.pricing.plans.slice(0, siteConfig.pricing.maxPlansToShow);
  const gridColsClass = plansToDisplay.length === 1 ? 'md:grid-cols-1 max-w-md mx-auto' :
                        plansToDisplay.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' :
                        plansToDisplay.length === 3 ? 'md:grid-cols-3' : 
                        'md:grid-cols-2 lg:grid-cols-4';


  return (
    <section id="pricing" className="py-20 section-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-24 h-1 bg-zerion-purple mx-auto mb-6 rounded-full" />
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="text-white">Choose Your </span>
            <span className="text-zerion-purple">Zerion</span>
            <span className="text-white"> Experience</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            {siteConfig.pricing.description}
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className={`grid grid-cols-1 ${gridColsClass} gap-8`}
        >
          {plansToDisplay.map((plan, index) => (
            <motion.div
              key={index}
              variants={item}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-zerion-purple text-white text-xs font-semibold px-3 py-1 rounded-tr-xl rounded-bl-xl">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-semibold text-white mb-1">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400 text-sm">{plan.period}</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-zerion-purple mr-2 shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full ${
                  plan.popular
                    ? 'bg-zerion-purple hover:bg-zerion-purple-light text-white'
                    : 'bg-secondary hover:bg-zerion-purple/20 text-white'
                }`}
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;