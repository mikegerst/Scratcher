import React from 'react';
import '../styles/globals.css';

interface ImageGridProps {
    images: string[];
  }
  
  const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
    return (
      <div className="grid grid-cols-5 gap-1">
        {images && images.map((src, index) => (
          <div key={index} className="">
            <img src={src} alt={`Image ${index}`} className="w-full h-full object-cover rounded-2xl" />
          </div>
        ))}
      </div>
    );
  };
    
  export default ImageGrid;