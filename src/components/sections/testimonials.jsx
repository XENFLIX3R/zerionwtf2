import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { siteConfig } from "@/config";

const Testimonials = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: "spring", stiffness: 100 } },
  };

  return (
    <section id="testimonials" className="py-20 section-gradient">
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
            {siteConfig.testimonials.title}
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {siteConfig.testimonials.items.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={item}
              className="testimonial-card bg-zerion-black-light p-6 rounded-xl shadow-lg border border-zerion-purple/20 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(147,51,234,0.25)] hover:border-zerion-purple/40"
            >
              <div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gray-600" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4">"{testimonial.text}"</p>
              </div>
              <div className="flex items-center mt-auto">
                <div className="w-10 h-10 rounded-full bg-zerion-purple flex items-center justify-center text-white font-semibold mr-3">
                  {testimonial.initial}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;