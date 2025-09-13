// src/app/ai/prompt/[slug]/page.tsx
'use client'; 

import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { prompts } from '@/lib/prompts';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Copy, Check, Video, Info, CheckCircle2 } from 'lucide-react';
import CallToAction from '@/components/CallToAction';
import ImageComparator from '@/components/ImageComparator';

export default function PromptPage() {
  const params = useParams();
  const slug = params.slug;
  const [copied, setCopied] = useState(false);
  
  const promptData = prompts.find(p => p.slug === slug);

  if (!promptData) {
    notFound();
  }

  const handleCopy = () => {
    const textToCopy = JSON.stringify(promptData.jsonPrompt, null, 2);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const backLink = promptData.type === 'video' ? '/ai/videos' : '/ai/images';
  const backLinkText = promptData.type === 'video' ? 'Prompt-uri Video' : 'Prompt-uri Imagini';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 text-slate-100 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Link href={backLink} className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <ArrowLeft size={18} />
              Înapoi la {backLinkText}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            
            {/* --- MODIFICARE AICI: Logica pentru afișare video/imagine --- */}
            
            {promptData.type === 'video' && promptData.videoUrl ? (
              // 1. Dacă este de tip VIDEO, afișăm un player video
              <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-slate-800 bg-black">
                <video
                  key={promptData.videoUrl} // Forțează re-randarea dacă sursa se schimbă
                  className="w-full h-full object-contain"
                  src={promptData.videoUrl}
                  poster={promptData.imageUrl} // Folosim imaginea ca thumbnail
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls // Adăugăm controale (play/pauză, sunet, etc.)
                >
                  Browser-ul tău nu suportă tag-ul video.
                </video>
              </div>
            ) : promptData.beforeImageUrl ? (
              // 2. Dacă este IMAGINE cu Before/After, afișăm comparatorul
              <ImageComparator 
                beforeImage={promptData.beforeImageUrl}
                afterImage={promptData.imageUrl}
                alt={promptData.title}
              />
            ) : (
              // 3. Altfel, afișăm imaginea simplă
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

            {/* Restul paginii rămâne neschimbat */}
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
                  <button onClick={handleCopy} className="p-2 text-slate-400 bg-slate-800 rounded-md hover:bg-teal-500 hover:text-white transition-all cursor-pointer" aria-label="Copiază prompt-ul">
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
                <div className="overflow-y-auto">
                  <pre className="text-slate-200 text-sm leading-relaxed font-mono whitespace-pre-wrap">
                    <code>{JSON.stringify(promptData.jsonPrompt, null, 2)}</code>
                  </pre>
                </div>
              </div>

              {promptData.instructions && (
                <div className="mt-6 bg-slate-900 border border-slate-800 p-6 rounded-lg">
                  <h3 className="flex items-center gap-2 text-sm uppercase tracking-widest text-slate-400 mb-4">
                    <Info size={16} />
                    Instrucțiuni de Utilizare
                  </h3>
                  <ul className="space-y-3 text-slate-300 text-sm">
                    {promptData.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-teal-400 mt-0.5 flex-shrink-0" />
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <CallToAction />

        </div>
      </main>
      <Footer />
    </>
  );
}