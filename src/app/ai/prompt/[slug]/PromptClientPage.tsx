'use client'; 

import { useState } from 'react';
import Image from 'next/image';
import { Copy, Check } from 'lucide-react';
import type { Prompt } from '@/lib/prompts';
import ImageComparator from '@/components/ImageComparator';
import CallToAction from '@/components/CallToAction';

interface PromptClientPageProps {
  promptData: Prompt;
}

const PromptClientPage: React.FC<PromptClientPageProps> = ({ promptData }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // --- MODIFICARE AICI ---
    // Am înlocuit 'promptData.prompt' cu varianta JSON.
    const textToCopy = JSON.stringify(promptData.jsonPrompt, null, 2);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
        {promptData.beforeImageUrl ? (
          <ImageComparator 
            beforeImage={promptData.beforeImageUrl}
            afterImage={promptData.imageUrl}
            alt={promptData.title}
          />
        ) : (
          <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-slate-900/80 border border-slate-800">
            <Image
              src={promptData.imageUrl}
              alt={promptData.title}
              width={800}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="flex flex-col h-full">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Prompt #{promptData.id}: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">{promptData.title}</span>
          </h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {promptData.tags.map(tag => (
              <span key={tag} className="text-xs font-semibold text-blue-300 bg-blue-500/10 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
          
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg flex-grow flex flex-col max-h-[50vh]">
            <div className="flex justify-between items-center mb-3 flex-shrink-0">
              <h2 className="text-sm uppercase tracking-widest text-slate-400">Prompt Complet</h2>
              <button
                onClick={handleCopy}
                className="p-2 text-slate-400 bg-slate-800 rounded-md hover:bg-teal-500 hover:text-white transition-all cursor-pointer"
                aria-label="Copiază prompt-ul"
                title="Copiază prompt-ul"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>

            <pre className="text-slate-200 text-sm leading-relaxed font-mono whitespace-pre-wrap overflow-x-auto flex-grow">
              <code>
                {JSON.stringify(promptData.jsonPrompt, null, 2)}
              </code>
            </pre>
          </div>

          {/* Secțiunea de Instrucțiuni (dacă există) */}
          {promptData.instructions && (
            <div className="mt-6 bg-slate-900 border border-slate-800 p-6 rounded-lg">
              <h3 className="flex items-center gap-2 text-sm uppercase tracking-widest text-slate-400 mb-4">
                Instrucțiuni de Utilizare
              </h3>
              <ul className="space-y-3 text-slate-300 text-sm">
                {promptData.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-teal-400 mt-1">&#10003;</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <CallToAction />
    </>
  );
};

export default PromptClientPage;