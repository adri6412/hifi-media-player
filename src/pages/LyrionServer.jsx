import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Server, ExternalLink, AlertCircle, Settings } from 'lucide-react';
import { useKeyboard } from '../contexts/KeyboardContext';

/**
 * Lyrion Server integration screen
 * Embeds Lyrion Server Material skin interface
 */
const LyrionServer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [serverUrl, setServerUrl] = useState('http://localhost:9000/material/');
  const [customUrl, setCustomUrl] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const urlInputRef = useRef(null);
  const { showKeyboard } = useKeyboard();

  const handleUrlChange = () => {
    if (customUrl) {
      setServerUrl(customUrl);
      setShowSettings(false);
      setIsLoaded(false);
    }
  };

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
            <div className="p-1.5 rounded-lg bg-blue-600">
              <Server size={20} className="text-white" />
            </div>
            <h1 className="text-lg font-bold text-white">Lyrion Server</h1>
            {!showSettings && (
              <span className="text-xs text-blue-400 ml-2">
                {serverUrl}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center space-x-1 px-3 py-1.5 bg-hifi-light hover:bg-hifi-accent rounded-lg transition-colors text-white text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings size={16} />
              <span>URL</span>
            </motion.button>
          </div>
        </div>

        {/* Server URL settings - compact */}
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-2 bg-hifi-light rounded-lg p-2"
          >
            <div className="flex items-center space-x-2">
              <div 
                onClick={() => {
                  console.log('🖱️ Lyrion URL Input wrapper clicked!');
                  showKeyboard(urlInputRef, customUrl);
                }}
                className="flex-1 cursor-pointer"
              >
                <input
                  ref={urlInputRef}
                  type="text"
                  placeholder="http://localhost:9000/material/"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="w-full bg-hifi-dark border border-hifi-accent rounded px-3 py-1.5 text-white text-sm focus:outline-none focus:border-hifi-gold cursor-pointer"
                  readOnly
                />
              </div>
              <motion.button
                onClick={handleUrlChange}
                className="bg-hifi-gold text-black px-4 py-1.5 rounded font-semibold text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connetti
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Iframe container - takes all remaining space */}
      <div className="flex-1 relative bg-black overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-hifi-dark z-10">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-hifi-silver mb-2">Connessione a Lyrion Server...</p>
              <p className="text-xs text-hifi-silver/70">{serverUrl}</p>
            </div>
          </div>
        )}
        
        <iframe
          src={serverUrl}
          className="w-full h-full border-0"
          onLoad={() => {
            console.log('Lyrion iframe loaded');
            setIsLoaded(true);
          }}
          onError={(e) => {
            console.error('Lyrion iframe error:', e);
          }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
          title="Lyrion Server"
        />
      </div>
    </motion.div>
  );
};

export default LyrionServer;