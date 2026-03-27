import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Music, 
  Youtube, 
  Radio,
  Server,
  Settings as SettingsIcon,
  Disc3
} from 'lucide-react';

/**
 * Home screen component
 * Displays source selection buttons in a grid layout
 */
const Home = ({ onNavigate }) => {
  const sources = [
    {
      id: 'lyrion',
      name: 'Lyrion Server',
      description: 'Libreria musicale locale',
      icon: Server,
      color: 'from-blue-600 to-blue-800',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      description: 'Stream da YouTube',
      icon: Youtube,
      color: 'from-red-600 to-red-800',
    },
    {
      id: 'spotify',
      name: 'Spotify',
      description: 'Spotify Web Player',
      icon: Disc3,
      color: 'from-green-600 to-green-800',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full overflow-y-auto p-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">HiFi Media Center</h1>
          <p className="text-hifi-silver text-lg">Seleziona la sorgente musicale</p>
        </motion.div>


        <div className="grid grid-cols-2 gap-8">
          {sources.map((source, index) => {
            const Icon = source.icon;
            
            return (
              <motion.button
                key={source.id}
                onClick={() => !source.disabled && onNavigate && onNavigate(source.id)}
                disabled={source.disabled}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 * index, type: 'spring', stiffness: 200 }}
                whileHover={!source.disabled ? { scale: 1.05, y: -5 } : {}}
                whileTap={!source.disabled ? { scale: 0.95 } : {}}
                className={`
                  relative hifi-panel p-8 flex flex-col items-center justify-center
                  min-h-[200px] group overflow-hidden
                  ${source.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-hifi-gold cursor-pointer'}
                `}
              >
                {/* Background gradient on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${source.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Icon */}
                <motion.div
                  className={`
                    w-24 h-24 rounded-full mb-6 flex items-center justify-center
                    bg-gradient-to-br ${source.color} shadow-lg
                    ${!source.disabled && 'group-hover:shadow-xl group-hover:shadow-current/30'}
                  `}
                  whileHover={!source.disabled ? { rotate: 5 } : {}}
                >
                  <Icon size={48} className="text-white" />
                </motion.div>

                {/* Text */}
                <h2 className="text-2xl font-bold text-white mb-2 text-center">
                  {source.name}
                </h2>
                <p className="text-hifi-silver text-sm text-center">
                  {source.description}
                </p>

                {/* Disabled badge */}
                {source.disabled && (
                  <div className="absolute top-4 right-4 bg-hifi-accent px-3 py-1 rounded-full">
                    <span className="text-xs text-hifi-silver">Coming Soon</span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Settings Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <motion.button
            onClick={() => onNavigate('settings')}
            className="flex items-center space-x-2 px-6 py-3 bg-hifi-light hover:bg-hifi-accent text-white rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SettingsIcon size={20} />
            <span>Impostazioni</span>
          </motion.button>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Home;