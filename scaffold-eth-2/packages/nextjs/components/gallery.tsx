import React from 'react';
import { useEffect, useState } from 'react';

import ImageGrid from './ImageGrid';
import { getImagePaths } from '../utils/scaffold-eth/getImagePaths';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/api/images');
      const data = await response.json();
      setImages(data.images);
    };

    fetchImages();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-5 gap-4">
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Image ${index}`} className="hover:brightness-105 transition duration-200 hover:scale-110 transition-transform duration-200 rounded-lg shadow-xl"/>
      ))}
    </div>
  );
};

export default Gallery;