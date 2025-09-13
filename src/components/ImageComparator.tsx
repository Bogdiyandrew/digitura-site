// src/components/ImageComparator.tsx
'use client';

import React from 'react';
import Image from 'next/image';

interface ImageComparatorProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
}

const ImageComparator: React.FC<ImageComparatorProps> = ({ beforeImage, afterImage, alt }) => {
  return (
    // --- MODIFICARE AICI ---
    // Am înlocuit 'h-[70vh]' cu 'aspect-square' pentru a crea un pătrat perfect.
    // Am păstrat 'w-full' pentru ca pătratul să ocupe toată lățimea disponibilă.
    <div className="relative w-full aspect-square select-none overflow-hidden rounded-xl border border-slate-800 group bg-black/20">
      
      {/* Imaginea "Before" (vizibilă implicit) */}
      <Image
        src={beforeImage}
        alt={`Before - ${alt}`}
        layout="fill"
        // 'object-contain' asigură că întreaga imagine este vizibilă în container
        objectFit="contain" 
        className="transition-opacity duration-700 ease-in-out"
      />
      
      {/* Imaginea "After" (devine vizibilă la hover) */}
      <Image
        src={afterImage}
        alt={`After - ${alt}`}
        layout="fill"
        objectFit="contain"
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
      />
      
      {/* Etichete "Before" / "After" care se schimbă la hover */}
      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-sm transition-opacity duration-300 group-hover:opacity-0">
        Before
      </div>
      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        After
      </div>
    </div>
  );
};

export default ImageComparator;