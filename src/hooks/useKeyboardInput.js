import { useRef, useEffect } from 'react';
import { useKeyboard } from '../contexts/KeyboardContext';

export const useKeyboardInput = (value, onChange) => {
  const inputRef = useRef(null);
  const { showKeyboard } = useKeyboard();

  useEffect(() => {
    const input = inputRef.current;
    if (!input) {
      console.log('⚠️ useKeyboardInput: input ref is null');
      return;
    }

    console.log('🔧 Setting up keyboard input listeners for:', input);

    const handleFocus = (e) => {
      console.log('🔍 Input focused!', { input: inputRef.current, value, showKeyboard });
      e.preventDefault();
      e.stopPropagation();
      showKeyboard(inputRef, value);
    };

    const handleClick = (e) => {
      console.log('🖱️ Input clicked!', { input: inputRef.current, value, showKeyboard });
      e.preventDefault();
      e.stopPropagation();
      showKeyboard(inputRef, value);
    };

    const handleTouchStart = (e) => {
      console.log('👆 Input touched!', { input: inputRef.current, value, showKeyboard });
      e.preventDefault();
      e.stopPropagation();
      showKeyboard(inputRef, value);
    };

    const handleMouseDown = (e) => {
      console.log('🖱️ Input mouse down!', { input: inputRef.current, value, showKeyboard });
      e.preventDefault();
      e.stopPropagation();
      showKeyboard(inputRef, value);
    };

    const handlePointerDown = (e) => {
      console.log('👆 Input pointer down!', { input: inputRef.current, value, showKeyboard });
      e.preventDefault();
      e.stopPropagation();
      showKeyboard(inputRef, value);
    };

    // Add event listeners with passive: false to ensure preventDefault works
    input.addEventListener('focus', handleFocus, { passive: false });
    input.addEventListener('click', handleClick, { passive: false });
    input.addEventListener('touchstart', handleTouchStart, { passive: false });
    input.addEventListener('mousedown', handleMouseDown, { passive: false });
    input.addEventListener('pointerdown', handlePointerDown, { passive: false });

    // Make input look clickable but still allow focus
    input.style.cursor = 'pointer';
    input.readOnly = true; // Prevent physical keyboard input

    return () => {
      console.log('🧹 Cleaning up keyboard input listeners');
      input.removeEventListener('focus', handleFocus);
      input.removeEventListener('click', handleClick);
      input.removeEventListener('touchstart', handleTouchStart);
      input.removeEventListener('mousedown', handleMouseDown);
      input.removeEventListener('pointerdown', handlePointerDown);
      input.style.cursor = 'text';
      input.readOnly = false;
    };
  }, [value, showKeyboard]);

  return inputRef;
};