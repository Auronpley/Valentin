import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function TypewriterText({ text, delay = 0, className = "", onComplete }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i === text.length) {
          clearInterval(intervalId);
          onComplete?.();
        }
      }, 50); // Typing speed
      
      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return (
    <div className="relative inline-block">
      <motion.h1 
        className={`font-hand text-2xl md:text-4xl leading-relaxed text-primary ${className}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {displayedText}
        <motion.span 
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-1 h-8 md:h-10 bg-primary/50 ml-1 align-middle"
        >
        </motion.span>
      </motion.h1>
      
      {/* Subtle floating heart next to text */}
      {displayedText.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          className="absolute -top-4 -right-4"
        >
          <Heart className="w-6 h-6 fill-primary text-primary" />
        </motion.div>
      )}
    </div>
  );
}

import { Heart } from "lucide-react";
