// src/components/PromptCard.tsx
'use client';

import React, { useState, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Copy, Check, Video } from 'lucide-react';

interface PromptCardProps {
  slug: string;
  title: string;
  prompt: string;
  imageUrl: string;
  videoUrl?: string;
  tags: string[];
}

const PromptCard: React.FC<PromptCardProps> = ({ slug, title, prompt, imageUrl, videoUrl, tags }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: MouseEvent<HTMLButtonElement>) => {
    // Oprim propagarea pentru a nu activa link-ul principal al cardului
    e.preventDefault(); 
    e.stopPropagation();
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Am schimbat funcția pentru a funcționa cu un div
  const handleVideoClick = (e: MouseEvent<HTMLDivElement>) => {
    // Oprim propagarea și aici
    e.preventDefault();
    e.stopPropagation();
    if (videoUrl) {
      window.open(videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Link href={`/ai/prompt/${slug}`} className="block h-full">
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 h-full">
        <div className="relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            width={600}
            height={600}
            className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          {/* MODIFICARE: Am înlocuit <a> cu <div> și am adăugat onClick */}
          {videoUrl && (
            <div 
              onClick={handleVideoClick} 
              className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm hover:bg-teal-500 transition-colors z-10 cursor-pointer"
            >
              <Video size={16} />
              <span>Vezi Video</span>
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-bold text-lg text-white mb-2">{title}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => (
              <span key={tag} className="text-xs font-semibold text-blue-300 bg-blue-500/10 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
          <div className="relative bg-slate-800 p-4 rounded-lg mt-auto">
            <p className="text-slate-300 text-sm leading-relaxed font-mono pr-10 truncate">{prompt}</p>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-2 text-slate-400 bg-slate-700/50 rounded-md hover:bg-teal-500 hover:text-white transition-all"
              aria-label="Copiază prompt-ul"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PromptCard;