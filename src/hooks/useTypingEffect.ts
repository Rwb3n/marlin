import { useState, useEffect, useCallback } from 'react';

interface UseTypingEffectProps {
  texts: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  delayBetweenTexts?: number;
}

/**
 * Custom hook that implements a typewriter effect for displaying a sequence of texts
 * 
 * @param texts - Array of strings to display in sequence
 * @param typingSpeed - Milliseconds between typing each character (default: 100ms)
 * @param deleteSpeed - Milliseconds between deleting each character (default: 50ms)
 * @param delayBetweenTexts - Milliseconds to wait between finishing one text and starting the next (default: 2000ms)
 * 
 * @returns The current text being displayed with typewriter effect
 */
export function useTypingEffect({
  texts,
  typingSpeed = 100,
  deleteSpeed = 50,
  delayBetweenTexts = 2000,
}: UseTypingEffectProps): string {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const typeText = useCallback(() => {
    // Get the current text from the array
    const fullText = texts[currentIndex];
    
    if (isTyping && !isDeleting && !isPaused) {
      // If we're typing and haven't reached the end of the current text
      if (currentText.length < fullText.length) {
        // Add the next character
        setCurrentText(fullText.substring(0, currentText.length + 1));
      } else {
        // We've finished typing the current text, pause before deleting
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, delayBetweenTexts);
      }
    } else if (isDeleting && !isPaused) {
      // If we're deleting and haven't deleted all characters
      if (currentText.length > 0) {
        // Remove the last character
        setCurrentText(currentText.substring(0, currentText.length - 1));
      } else {
        // We've deleted all characters, move to the next text
        setIsDeleting(false);
        setCurrentIndex((currentIndex + 1) % texts.length);
      }
    }
  }, [currentText, currentIndex, isTyping, isDeleting, isPaused, texts, delayBetweenTexts]);

  useEffect(() => {
    // Don't start the effect if there are no texts
    if (!texts.length) return;
    
    // Set a timeout to call the typeText function
    const timeout = setTimeout(
      typeText,
      isDeleting ? deleteSpeed : typingSpeed
    );
    
    // Clear the timeout when the component unmounts or dependencies change
    return () => clearTimeout(timeout);
    
  }, [typeText, isDeleting, typingSpeed, deleteSpeed, texts]);

  return currentText;
}

export default useTypingEffect; 