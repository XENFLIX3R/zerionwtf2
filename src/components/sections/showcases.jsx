import React, { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config";
import { Youtube, Play, ExternalLink, Pause, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoPlayer = ({ video, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const togglePlay = () => {
    const iframe = document.querySelector(`#video-${video.id}`);
    if (iframe) {
      const message = isPlaying ? '{"event":"command","func":"pauseVideo","args":""}' : '{"event":"command","func":"playVideo","args":""}';
      iframe.contentWindow.postMessage(message, '*');
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-3xl w-full bg-zerion-black-dark rounded-xl overflow-hidden border border-zerion-purple/30 shadow-[0_0_30px_rgba(147,51,234,0.2)]"
        onClick={e => e.stopPropagation()}
      >
        <div className="aspect-video relative group">
          <iframe
            id={`video-${video.id}`}
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.id}?enablejsapi=1&controls=0&modestbranding=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-full bg-zerion-purple/20 hover:bg-zerion-purple/40 text-white border border-zerion-purple/30"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <span className="text-white text-sm font-medium">{video.title}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-zerion-purple/20 hover:bg-zerion-purple/40 text-white text-sm border border-zerion-purple/30 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Watch on YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Showcases = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  
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
    <section id="showcases" className="py-20 section-gradient-alt">
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
            {siteConfig.showcases.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {siteConfig.showcases.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {siteConfig.showcases.videos.map((video) => (
            <motion.div
              key={video.id}
              variants={item}
              className="showcase-card bg-zerion-black-light rounded-xl overflow-hidden shadow-xl border border-zerion-purple/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:border-zerion-purple/50 cursor-pointer group"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="aspect-video relative">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-zerion-purple/20 border border-zerion-purple/50 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{video.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedVideo && (
        <VideoPlayer video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </section>
  );
};

export default Showcases;