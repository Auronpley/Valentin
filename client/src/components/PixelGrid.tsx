import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Simplified pixel art data representations
// 1 = color, 0 = transparent

const BEAR_GRID = [
  [0,0,0,1,1,0,0,0,0,1,1,0,0,0],
  [0,0,1,1,1,1,0,0,1,1,1,1,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
  [0,1,1,1,2,1,1,1,1,2,1,1,1,0],
  [0,1,1,1,2,1,1,1,1,2,1,1,1,0],
  [0,1,1,1,1,1,2,2,1,1,1,1,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,2,1,1,2,1,1,1,0,0],
  [0,0,0,1,1,1,2,2,1,1,1,0,0,0],
  [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,1,1,0,0,0,0,1,1,0,0,0],
  [0,0,1,1,0,0,0,0,0,0,1,1,0,0],
];

const HEART_GRID = [
  [0,0,1,1,0,0,0,1,1,0,0],
  [0,1,1,1,1,0,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,1,1,1,0,0],
  [0,0,0,1,1,1,1,1,0,0,0],
  [0,0,0,0,1,1,1,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,0,0],
];

const TREE_GRID = [
  [0,0,0,0,0,3,3,0,0,0,0,0],
  [0,0,0,0,3,3,3,3,0,0,0,0],
  [0,0,0,3,3,3,3,3,3,0,0,0],
  [0,0,3,3,3,3,3,3,3,3,0,0],
  [0,3,3,3,3,3,3,3,3,3,3,0],
  [3,3,3,3,3,3,3,3,3,3,3,3],
  [0,0,3,3,3,3,3,3,3,3,0,0],
  [0,0,0,3,3,3,3,3,3,0,0,0],
  [0,0,0,0,4,4,4,4,0,0,0,0],
  [0,0,0,0,4,4,4,4,0,0,0,0],
  [0,0,0,4,4,4,4,4,4,0,0,0],
];



const KITTY_GRID = [
  [0, 0, 0, 0, 5, 5, 0, 0, 0, 5, 5, 0], // Moño y oreja
  [0, 0, 0, 5, 5, 5, 5, 0, 5, 1, 1, 5], 
  [0, 0, 0, 0, 5, 5, 0, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1], // Orejas blancas
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Cabeza parte superior
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1], // Ojos (2)
  [1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1], // Nariz (3)
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], // Base de la cara
];


const PENGUIN_GRID = [
  [0,0,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,0],
  [1,1,0,1,1,0,1,1],
  [1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,0],
  [0,2,2,2,2,2,2,0],
  [0,2,2,2,2,2,2,0],
  [0,0,3,0,0,3,0,0],
];

interface PixelGridProps {
  type: 'bear' | 'heart' | 'tree' | 'kitty' | 'penguin';
  onComplete?: () => void;
  className?: string;
}

export function PixelGrid({ type, onComplete, className }: PixelGridProps) {
  const [visiblePixels, setVisiblePixels] = useState<number>(0);
  
  const grid = 
    type === 'bear' ? BEAR_GRID : 
    type === 'heart' ? HEART_GRID : 
    type === 'tree' ? TREE_GRID :
    type === 'kitty' ? KITTY_GRID :
    PENGUIN_GRID;
  
  const flatGrid = grid.flat();
  const totalPixels = flatGrid.filter(p => p !== 0).length;
  
  // Colors mapped to numbers in grid
  const colors: Record<number, string> = {
    1: '#DEB887',
    2: '#8B4513',
    3: '#FF69B4',
    4: '#8B4513',
    5: '#FF69B4',
  };

  if (type === 'heart') {
    colors[1] = '#FF1493';

  } else if (type === 'kitty') {
      colors[1] = '#FFFFFF'; // Cara blanca
      colors[2] = '#000000'; // Ojos negros
      colors[3] = '#FFD700'; // Nariz amarilla
      colors[4] = '#FF69B4'; // Boca rosada
      colors[5] = '#FF1493'; // Moño fuerte
    }


  } else if (type === 'penguin') {
    colors[1] = '#2F4F4F';
    colors[2] = '#FFFFFF';
    colors[3] = '#FFA500';
  }


  useEffect(() => {
    // Reset when type changes
    setVisiblePixels(0);
    
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisiblePixels(count);
      
      if (count >= totalPixels) {
        clearInterval(interval);
        setTimeout(() => onComplete?.(), 500); // Small delay before enabling next
      }
    }, 50); // Speed of drawing
    
    return () => clearInterval(interval);
  }, [type, totalPixels]);

  // We need to map linear index to visible count to "reveal" randomly or linearly
  // Here we'll do a simple linear reveal for simplicity but mapped to non-zero pixels
  let currentPixelCount = 0;

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
          gap: '2px',
          width: 'min(90vw, 300px)' // Responsive width
        }}
      >
        {grid.map((row, rowIndex) => 
          row.map((cell, colIndex) => {
            const isPixel = cell !== 0;
            if (isPixel) currentPixelCount++;
            
            const isVisible = isPixel && currentPixelCount <= visiblePixels;

            return (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ 
                  opacity: isVisible ? 1 : 0,
                  scale: isVisible ? 1 : 0,
                  rotate: isVisible ? 0 : -45,
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 0.4 
                }}
                className="aspect-square rounded-sm shadow-sm"
                style={{
                  backgroundColor: isVisible ? colors[cell as keyof typeof colors] : 'transparent',
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
