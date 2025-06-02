import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import Showcases from "@/components/sections/showcases"; 
import Support from "@/components/sections/support";
import FAQ from "@/components/sections/faq";
import Pricing from "@/components/sections/pricing";
import Testimonials from "@/components/sections/testimonials";
import RefundPolicy from "@/components/pages/RefundPolicy";
import PrivacyPolicy from "@/components/pages/PrivacyPolicy";
import TermsOfService from "@/components/pages/TermsOfService";
import SoftwareProtection from "@/components/pages/SoftwareProtection";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const MainLayout = () => {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <Features />
        <Showcases />
        <Testimonials /> 
        <Support />
        <FAQ />
        <Pricing />
      </motion.main>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <div className="min-h-screen bg-black text-white">
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/software-protection" element={<SoftwareProtection />} />
          </Routes>
          <Toaster />
        </div>
      </AnimatePresence>
    </Router>
  );
};

export default App;