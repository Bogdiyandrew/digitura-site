// src/app/ai/page.tsx

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Am importat componenta Image

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
        
        {/* Am actualizat structura grid-ului și a cardurilor */}
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card pentru Imagini cu Imagine de Fundal */}
          <Link href="/ai/images" className="group relative block h-80 overflow-hidden rounded-2xl shadow-2xl shadow-teal-500/10 border border-slate-800">
            <Image
              src="/ai-category-image.png" // Asigură-te că imaginea există în /public
              alt="Categorie Prompt-uri Imagini"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/70"></div>
            <div className="relative z-10 flex flex-col items-center justify-end h-full text-center p-8">
              <h2 className="text-3xl font-bold text-white mb-2 transform transition-transform duration-300 group-hover:-translate-y-1">Prompt-uri Imagini</h2>
              <p className="text-slate-300 max-w-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100">Generează logo-uri, mascote, fotografii de produs și concepte vizuale uimitoare.</p>
            </div>
          </Link>
          
          {/* Card pentru Video cu Imagine de Fundal */}
          <Link href="/ai/videos" className="group relative block h-80 overflow-hidden rounded-2xl shadow-2xl shadow-blue-500/10 border border-slate-800">
             <Image
              src="/ai-category-video.png" // Asigură-te că imaginea există în /public
              alt="Categorie Prompt-uri Video"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/70"></div>
            <div className="relative z-10 flex flex-col items-center justify-end h-full text-center p-8">
              <h2 className="text-3xl font-bold text-white mb-2 transform transition-transform duration-300 group-hover:-translate-y-1">Prompt-uri Video</h2>
              <p className="text-slate-300 max-w-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100">Transformă imagini statice în clipuri cinematice sau generează concepte video de la zero.</p>
            </div>
          </Link>

        </div>
      </main>
      <Footer />
    </>
  );
};

export default LaboratorAIHub;