// src/app/ai/prompt/[slug]/PromptClientPage.tsx
'use client'; // Această componentă este interactivă

import { useState } from 'react';
import Image from 'next/image';
import { Copy, Check, Video } from 'lucide-react';
import type { Prompt } from '@/lib/prompts'; // Importăm tipul de date

// Definim tipul pentru props
interface PromptClientPageProps {
  promptData: Prompt;
}

const PromptClientPage: React.FC<PromptClientPageProps> = ({ promptData }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptData.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
      <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-slate-900/80 border border-slate-800">
        <Image
          src={promptData.imageUrl}
          alt={promptData.title}
          width={800}
          height={800}
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="flex flex-col h-full">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{promptData.title}</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {promptData.tags.map(tag => (
            <span key={tag} className="text-xs font-semibold text-blue-300 bg-blue-500/10 px-3 py-1 rounded-full">{tag}</span>
          ))}
        </div>
        {promptData.videoUrl && (
          <a href={promptData.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-300 font-semibold px-4 py-2 rounded-lg mb-6 hover:bg-teal-500/20 transition-colors self-start">
            <Video size={18} />
            Vezi Conceptul Video
          </a>
        )}
        <div className="relative bg-slate-900 border border-slate-800 p-6 rounded-lg flex-grow">
          <h2 className="text-sm uppercase tracking-widest text-slate-400 mb-3">Prompt Complet</h2>
          <p className="text-slate-200 text-base leading-relaxed font-mono whitespace-pre-wrap">{promptData.prompt}</p>
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 text-slate-400 bg-slate-800 rounded-md hover:bg-teal-500 hover:text-white transition-all"
            aria-label="Copiază prompt-ul"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptClientPage;