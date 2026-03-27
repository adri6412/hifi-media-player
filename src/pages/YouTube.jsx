import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Youtube, ExternalLink, AlertCircle } from 'lucide-react';

/**
 * YouTube integration screen
 * Embeds YouTube web interface
 */
const YouTube = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const youtubeUrl = 'https://www.youtube.com';

  useEffect(() => {
    // Set a timeout to detect if iframe fails to load
    const timer = setTimeout(() => {
      if (!isLoaded) {
        console.warn('YouTube iframe timeout - site may block embedding');
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full flex flex-col"
    >
      {/* Compact Header */}
      <div className="bg-gradient-to-b from-hifi-gray to-hifi-dark border-b border-hifi-accent px-4 py-2 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-red-600">
              <Youtube size={20} className="text-white" />
            </div>
            <h1 className="text-lg font-bold text-white">YouTube</h1>
          </div>
        </div>
      </div>

      {/* Iframe container - takes all remaining space */}
      <div className="flex-1 relative bg-black overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-hifi-dark z-10">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 border-4 border-hifi-gold border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-hifi-silver">Caricamento YouTube...</p>
            </div>
          </div>
        )}
        
        <iframe
          src={youtubeUrl}
          className="w-full h-full border-0"
          onLoad={() => {
            console.log('YouTube iframe loaded');
            setIsLoaded(true);
          }}
          onError={() => {
            console.error('YouTube iframe error');
            setError(true);
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
          title="YouTube"
        />
      </div>
    </motion.div>
  );
};

export default YouTube;