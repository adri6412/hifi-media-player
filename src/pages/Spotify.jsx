import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Disc3, ExternalLink, AlertCircle } from 'lucide-react';

/**
 * Spotify integration screen
 * Embeds Spotify web player
 */
const Spotify = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const spotifyUrl = 'https://open.spotify.com';

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        console.warn('Spotify iframe timeout');
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
            <div className="p-1.5 rounded-lg bg-green-600">
              <Disc3 size={20} className="text-white" />
            </div>
            <h1 className="text-lg font-bold text-white">Spotify</h1>
            <span className="text-xs text-green-400 ml-2">
              Richiede Spotify Premium
            </span>
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
                className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-hifi-silver">Caricamento Spotify...</p>
            </div>
          </div>
        )}
        
        <iframe
          src={spotifyUrl}
          className="w-full h-full border-0"
          onLoad={() => {
            console.log('Spotify iframe loaded');
            setIsLoaded(true);
          }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-popups-to-escape-sandbox"
          title="Spotify"
        />
      </div>
    </motion.div>
  );
};

export default Spotify;