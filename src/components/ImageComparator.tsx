// src/components/ImageComparator.tsx
'use client';

import React, { useState } from 'react'; // Am adăugat 'useState'
import Image from 'next/image';

interface ImageComparatorProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
}

const ImageComparator: React.FC<ImageComparatorProps> = ({ beforeImage, afterImage, alt }) => {
  // --- MODIFICARE 1: Adăugăm o stare pentru a controla vizibilitatea ---
  const [isAfterVisible, setIsAfterVisible] = useState(false);

  // Funcția care schimbă starea la fiecare click/tap
  const toggleImage = () => {
    setIsAfterVisible(!isAfterVisible);
  };

  return (
    // --- MODIFICARE 2: Adăugăm 'onClick' și 'cursor-pointer' ---
    <div
      onClick={toggleImage}
      className="relative w-full aspect-square cursor-pointer select-none overflow-hidden rounded-xl border border-slate-800 group bg-black/20"
    >
      {/* Imaginea "Before" (vizibilă implicit) */}
      <Image
        src={beforeImage}
        alt={`Before - ${alt}`}
        layout="fill"
        objectFit="contain"
        className="transition-opacity duration-700 ease-in-out"
      />
      {/* Imaginea "After" (acum este controlată de starea 'isAfterVisible') */}
      <Image
        src={afterImage}
        alt={`After - ${alt}`}
        layout="fill"
        objectFit="contain"
        // --- MODIFICARE 3: Clasa de opacitate este acum dinamică ---
        className={`transition-opacity duration-700 ease-in-out ${isAfterVisible ? 'opacity-100' : 'opacity-0'}`}
      />
      {/* Etichetele "Before" / "After" sunt și ele controlate de stare */}
      <div className={`absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-sm transition-opacity duration-300 ${isAfterVisible ? 'opacity-0' : 'opacity-100'}`}>
        Before
      </div>
      <div className={`absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-sm transition-opacity duration-300 ${isAfterVisible ? 'opacity-100' : 'opacity-0'}`}>
        After
      </div>
    </div>
  );
};

export default ImageComparator;