// src/app/ai/page.tsx

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';
import Link from 'next/link';
import { ImageIcon, VideoIcon } from 'lucide-react';

const LaboratorAIHub: React.FC = () => {
  return (
    <>
      <Header />
      <main 
        className="min-h-screen bg-slate-950 text-slate-100 py-24 px-4 flex flex-col items-center justify-center" 
        style={{ fontFamily: 'Exo2, sans-serif' }}
      >
        <div className="text-center mb-16">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400"
            style={{ fontFamily: 'Ethnocentric, sans-serif', letterSpacing: 1 }}
          >
            Laborator AI
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Alege o categorie pentru a explora prompt-uri creative pentru imagini sau concepte video, gata de folosit pentru proiectele tale.
          </p>
        </div>
        
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card pentru Imagini */}
          <Link href="/ai/images" className="group block">
            <div className="h-full p-8 bg-slate-900/50 border border-slate-800 rounded-2xl text-center transition-all duration-300 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transform hover:-translate-y-2">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 text-teal-400" />
              <h2 className="text-2xl font-bold text-white mb-2">Prompt-uri Imagini</h2>
              <p className="text-slate-400">Generează logo-uri, mascote, fotografii de produs și concepte vizuale uimitoare.</p>
            </div>
          </Link>
          
          {/* Card pentru Video */}
          <Link href="/ai/videos" className="group block">
            <div className="h-full p-8 bg-slate-900/50 border border-slate-800 rounded-2xl text-center transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-2">
              <VideoIcon className="w-16 h-16 mx-auto mb-4 text-blue-400" />
              <h2 className="text-2xl font-bold text-white mb-2">Prompt-uri Video</h2>
              <p className="text-slate-400">Transformă imagini statice în clipuri cinematice sau generează concepte video de la zero.</p>
            </div>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LaboratorAIHub;