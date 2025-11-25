import { useState, useEffect } from 'react';

/**
 * Custom hook to track window resize
 * @param {Function} callback - Optional callback function called on resize
 * @returns {Object} - { width, height }
 */
export const useWindowResize = (callback) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      const newDimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      setDimensions(newDimensions);
      if (callback) {
        callback(newDimensions);
      }
    };

    handleResize(); // Set initial dimensions
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [callback]);

  return dimensions;
};

