import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config";
import { User, Terminal, Gamepad2, Search, Play } from "lucide-react";

const Experience = () => {
  return (
    <section id="experience" className="py-20 section-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-white mb-4"
        >
          {siteConfig.experience.title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-gray-400 mb-16 max-w-xl mx-auto"
        >
          Take control with our intuitive interface. Manage your profile, explore games, and execute scripts with ease.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto bg-black/60 rounded-xl overflow-hidden border border-zerion-purple/20 shadow-[0_0_40px_rgba(147,51,234,0.15)] backdrop-blur-sm"
        >
          <Tabs defaultValue="dashboard" className="w-full">
            <div className="border-b border-zerion-purple/20 bg-black/70">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-3 rounded-none p-0 h-auto">
                <TabsTrigger 
                  value="dashboard" 
                  className="py-3 data-[state=active]:bg-zerion-purple/20 data-[state=active]:text-zerion-purple rounded-none border-r border-zerion-purple/20 flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" /> Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="executor" 
                  className="py-3 data-[state=active]:bg-zerion-purple/20 data-[state=active]:text-zerion-purple rounded-none border-r border-zerion-purple/20 flex items-center justify-center gap-2"
                >
                  <Terminal className="w-4 h-4" /> Executor
                </TabsTrigger>
                <TabsTrigger 
                  value="games" 
                  className="py-3 data-[state=active]:bg-zerion-purple/20 data-[state=active]:text-zerion-purple rounded-none flex items-center justify-center gap-2"
                >
                  <Gamepad2 className="w-4 h-4" /> Games
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="dashboard" className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-secondary p-4 rounded-lg border border-zerion-purple/10">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Roblox Username</h3>
                  <Input 
                    type="text" 
                    placeholder={siteConfig.experience.robloxUsernamePlaceholder} 
                    className="bg-zerion-black-dark border-zerion-purple/20"
                  />
                </div>
                <div className="bg-secondary p-4 rounded-lg border border-zerion-purple/10">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">User ID</h3>
                  <Input 
                    type="text" 
                    readOnly 
                    value={siteConfig.experience.userIdPlaceholder} 
                    className="bg-zerion-black-dark border-zerion-purple/20 cursor-not-allowed"
                  />
                </div>
                <div className="bg-secondary p-4 rounded-lg border border-zerion-purple/10">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Current Plan</h3>
                  <p className="text-lg font-semibold text-zerion-purple">Premium</p>
                </div>
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">Recent Activity</h4>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center bg-secondary p-3 rounded-md text-sm">
                    <p className="text-gray-300">Logged in from new device</p>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="executor" className="p-0 m-0">
              <div className="code-editor min-h-[300px] flex flex-col">
                <div className="code-editor-header px-4 pt-3 pb-1">
                  <span className="text-xs text-gray-400">Lua Editor</span>
                </div>
                <div className="flex-grow code-editor-content p-4 bg-zerion-black-dark rounded-b-lg">
                  <textarea 
                    className="w-full h-full bg-transparent text-gray-300 resize-none focus:outline-none font-mono text-sm"
                    defaultValue={siteConfig.experience.codeExample}
                  />
                </div>
                <div className="p-4 border-t border-zerion-purple/20">
                  <Button className="w-full bg-zerion-purple hover:bg-zerion-purple-light text-white transition-colors flex items-center gap-2">
                    <Play className="w-4 h-4" /> Execute Script
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="games" className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <Input 
                  type="text" 
                  placeholder="Search for games..." 
                  className="bg-zerion-black-dark border-zerion-purple/20 flex-grow"
                />
                <Button variant="ghost" size="icon" className="ml-2 text-gray-400 hover:text-zerion-purple">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[
                  "Cosmic Adventure", "Pixel Warriors", "Neon Racers", "Block Fortress",
                  "Galaxy Explorers", "Dungeon Crawlers", "Stealth Ops", "Magic Academy"
                ].map((gameName, item) => (
                  <div 
                    key={item} 
                    className="aspect-[3/4] bg-secondary rounded-lg flex flex-col items-center justify-end p-3 hover:bg-zerion-purple/20 transition-colors cursor-pointer border border-zerion-purple/10 card-glow"
                  >
                    <img  alt={`Game art for ${gameName}`} className="w-full h-3/4 object-cover rounded-md mb-2 opacity-80 hover:opacity-100 transition-opacity" src="https://images.unsplash.com/photo-1690900581369-1fb952ddb5f6" />
                    <p className="text-xs text-center text-white font-medium truncate w-full">{gameName}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;