'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MousePointerClick } from 'lucide-react';

interface ImageComparatorProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
}

const ImageComparator: React.FC<ImageComparatorProps> = ({ beforeImage, afterImage, alt }) => {
  const [isAfterVisible, setIsAfterVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleImage = () => {
    setIsAfterVisible(!isAfterVisible);
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  return (
    <div
      onClick={toggleImage}
      className="relative w-full aspect-square cursor-pointer select-none overflow-hidden rounded-xl border border-slate-800 group bg-black/20"
    >
      <Image
        src={beforeImage}
        alt={`Before - ${alt}`}
        layout="fill"
        objectFit="contain"
        className="transition-opacity duration-700 ease-in-out"
      />
      <Image
        src={afterImage}
        alt={`After - ${alt}`}
        layout="fill"
        objectFit="contain"
        className={`transition-opacity duration-700 ease-in-out ${isAfterVisible ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className={`absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-sm transition-opacity duration-300 ${isAfterVisible ? 'opacity-0' : 'opacity-100'}`}>
        Before
      </div>
      <div className={`absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-sm transition-opacity duration-300 ${isAfterVisible ? 'opacity-100' : 'opacity-0'}`}>
        After
      </div>

      {!hasInteracted && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs pointer-events-none transition-opacity duration-500">
          <div className="flex items-center gap-3 text-white bg-slate-900/50 px-4 py-2 rounded-full border border-slate-700 animate-pulse">
            <MousePointerClick size={20} />
            <span className="font-semibold text-sm">Apasă pentru a compara</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageComparator;