import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Import pages
import Home from './pages/Home';
import Settings from './pages/Settings';
import YouTube from './pages/YouTube';
import Spotify from './pages/Spotify';
import LyrionServer from './pages/LyrionServer';

// Import components
import NavigationBar from './components/NavigationBar';
import VirtualKeyboard from './components/VirtualKeyboard';

// Import contexts
import { KeyboardProvider } from './contexts/KeyboardContext';

// Main app component with simple state-based navigation
const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'settings':
        return <Settings />;
      case 'youtube':
        return <YouTube />;
      case 'spotify':
        return <Spotify />;
      case 'lyrion':
        return <LyrionServer />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-hifi-dark overflow-hidden">
      <NavigationBar onNavigate={setCurrentPage} currentPage={currentPage} />
      
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>

    </div>
  );
};

function App() {
  return (
    <KeyboardProvider>
      <AppContent />
      <VirtualKeyboard />
    </KeyboardProvider>
  );
}

export default App;

