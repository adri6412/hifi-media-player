import React, { createContext, useContext, useState, useEffect } from 'react';

const KeyboardContext = createContext();

export const useKeyboard = () => {
  const context = useContext(KeyboardContext);
  if (!context) {
    throw new Error('useKeyboard must be used within a KeyboardProvider');
  }
  return context;
};

export const KeyboardProvider = ({ children }) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const showKeyboard = (inputRef, currentValue = '') => {
    console.log('⌨️ showKeyboard called!', { inputRef, currentValue, activeInput });
    setActiveInput(inputRef);
    setInputValue(currentValue);
    setIsKeyboardVisible(true);
    console.log('⌨️ Keyboard should be visible now!');
  };

  const hideKeyboard = () => {
    console.log('❌ hideKeyboard called!');
    setIsKeyboardVisible(false);
    setActiveInput(null);
    setInputValue('');
  };

  const updateInputValue = (value) => {
    setInputValue(value);
    if (activeInput && activeInput.current) {
      activeInput.current.value = value;
      // Trigger change event
      const event = new Event('input', { bubbles: true });
      activeInput.current.dispatchEvent(event);
      
      // Also trigger React's onChange if it exists
      const reactEvent = {
        target: activeInput.current,
        currentTarget: activeInput.current
      };
      if (activeInput.current.onChange) {
        activeInput.current.onChange(reactEvent);
      }
    }
  };

  const confirmInput = () => {
    if (activeInput && activeInput.current) {
      activeInput.current.value = inputValue;
      // Trigger change event
      const event = new Event('input', { bubbles: true });
      activeInput.current.dispatchEvent(event);
    }
    hideKeyboard();
  };

  const toggleKeyboard = () => {
    console.log('🔄 toggleKeyboard called!', { isKeyboardVisible });
    if (isKeyboardVisible) {
      hideKeyboard();
    } else {
      showKeyboard(null, '');
    }
  };

  // Listen for global shortcut toggle
  useEffect(() => {
    const handleGlobalToggle = () => {
      console.log('🌐 Global shortcut triggered - toggling keyboard');
      toggleKeyboard();
    };

    // Listen for the global shortcut event from main process
    if (window.electronAPI) {
      window.electronAPI.onToggleSimpleKeyboard?.(handleGlobalToggle);
    }

    return () => {
      if (window.electronAPI?.removeToggleSimpleKeyboard) {
        window.electronAPI.removeToggleSimpleKeyboard(handleGlobalToggle);
      }
    };
  }, [isKeyboardVisible]);

  const value = {
    isKeyboardVisible,
    activeInput,
    inputValue,
    showKeyboard,
    hideKeyboard,
    updateInputValue,
    confirmInput,
    toggleKeyboard
  };

  return (
    <KeyboardContext.Provider value={value}>
      {children}
    </KeyboardContext.Provider>
  );
};