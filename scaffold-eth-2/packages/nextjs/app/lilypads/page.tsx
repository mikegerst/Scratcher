
"use client";
import React from 'react';
import ImageGrid from '../../components/scratchdivider';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import '../../styles/globals.css';// Assuming you have some basic styles defined
import type { NextPage } from "next";

const lilypad: NextPage = () => {

  const [imageUrl, setImageUrl] = useState('');
  const [frogUrl, setFrogUrl] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/api/random_img');
      const data = await response.json();
      setImageUrl(data.poop);
      setFrogUrl(data.frog);
    };

    fetchImages();
  }, []);
  return (   
    <div className="flex flex-col md:flex-row justify-between items-center min-h-screen bg-lime-50">
    
    <p className="text-center flex-1 flex justify-center items-center text-black text-vw-8 break-words">Scratch to see if you win.</p>
    <div className="flex-1 flex justify-center items-center">
      <div className="flex items-center flex-grow w-full p-4 ">
        {imageUrl && <Image
          src={imageUrl}
          alt="Background"
          width={512}
          height={512}
          object-fit="cover" // Ensure it covers the container
          className="absolute z-0 rounded-lg"
        />}
        {frogUrl && <ImageGrid
          imageUrl={frogUrl}
          gridDimension={8} // For an 8x8 grid
          size={512} // Total size of the grid in pixels
          className="image-grid items-center z-10 w-full h-full rounded-lg shadow-lg"
        />}
      </div>
    </div>
    </div>
  );
};

export default lilypad;