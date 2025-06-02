import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, FileQuestion, MonitorPlay, DollarSign, MessageSquare, Zap } from "lucide-react"; // Added Zap for Features
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Features", href: "#features", icon: <Zap className="w-4 h-4 mr-2" /> },
    { name: "Showcases", href: "#showcases", icon: <MonitorPlay className="w-4 h-4 mr-2" /> },
    { name: "Pricing", href: "#pricing", icon: <DollarSign className="w-4 h-4 mr-2" /> },
    { name: "FAQ", href: "#faq", icon: <FileQuestion className="w-4 h-4 mr-2" /> },
    { name: "Discord", href: siteConfig.discordUrl, icon: <MessageSquare className="w-4 h-4 mr-2" />, external: true },
  ];

  const handleNavClick = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, 
          behavior: 'smooth'
        });
      }
      setIsOpen(false);
    } else if (!href.startsWith("http")) { 
      setIsOpen(false);
    }
  };


  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={(e) => handleNavClick(e, "/")}>
              <img src={siteConfig.logoUrl} alt={`${siteConfig.name} Logo`} className="h-10 w-auto" />
              <span className="ml-2 text-xl font-bold text-white">{siteConfig.name.split('.')[0]}<span className="text-zerion-purple">.{siteConfig.name.split('.')[1]}</span></span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black/95 backdrop-blur-md"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="flex items-center text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;