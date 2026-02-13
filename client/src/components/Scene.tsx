import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SceneProps {
  isActive: boolean;
  children: ReactNode;
  className?: string;
}

export function Scene({ isActive, children, className = "" }: SceneProps) {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.4, 0, 0.2, 1] 
      }}
      className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center w-full h-full max-w-2xl mx-auto ${className}`}
    >
      {children}
    </motion.div>
  );
}
