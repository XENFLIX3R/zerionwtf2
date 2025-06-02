import React from "react";
import { siteConfig } from "@/config";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-12 border-t border-zerion-purple/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <img src={siteConfig.logoUrl} alt="Zerion Logo" className="h-10 w-auto" />
              <span className="ml-2 text-xl font-bold text-white">Zerion<span className="text-zerion-purple">.Wtf</span></span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              {siteConfig.footer.description}
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {siteConfig.footer.links.product.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-zerion-purple transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href={siteConfig.discordUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-zerion-purple transition-colors"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {siteConfig.footer.links.legal.map((link, index) => (
                 <li key={index}>
                 <a 
                   href={link.href} 
                   className="text-gray-400 hover:text-zerion-purple transition-colors"
                 >
                   {link.name}
                 </a>
               </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zerion-purple/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a 
              href={siteConfig.discordUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center px-4 py-2 border border-zerion-purple/50 rounded-md text-sm font-medium text-white bg-black hover:bg-zerion-purple/10 transition-colors"
            >
              Join our Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;