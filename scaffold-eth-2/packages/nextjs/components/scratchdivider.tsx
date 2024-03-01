// ImageGrid.tsx
import React, { useState } from 'react';


interface ImageGridProps {
  imageUrl: string;
  gridDimension: number;
  size: number; // Size in pixels for the whole grid
  className?: string
}

const scratchdivider: React.FC<ImageGridProps> = ({ imageUrl, gridDimension, size, className }) => {
  const cellSize = size / gridDimension;
  // Use a Set to track the indices of cells that have been hovered over
  const [hoveredIndices, setHoveredIndices] = useState<Set<number>>(new Set());

  const handleMouseEnter = (index: number) => {
    setHoveredIndices(prevIndices => new Set(prevIndices).add(index));
  };

  return (
    <div
      cover-fit="cover"
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridDimension}, 1fr)`,
        width: size,
        height: size,
      }}
    >
      {Array.from({ length: gridDimension * gridDimension }, (_, index) => {
        const x = index % gridDimension;
        const y = Math.floor(index / gridDimension);
        const xPos = (-x * cellSize);
        const yPos = (-y * cellSize);
        const isHovered = hoveredIndices.has(index);
        return (
          <div
            key={index}
            className="grid-cellg"
            onMouseEnter={() => handleMouseEnter(index)}
            style={{
              width: cellSize,
              height: cellSize,
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: `${xPos}px ${yPos}px`,
              backgroundSize: `${size}px ${size}px`,
              opacity: isHovered ? 0 : 1, // Stay transparent if hovered over
              transition: 'opacity 2s ease',
            }}
          />
        );
      })}
    </div>
  );
};

export default scratchdivider;