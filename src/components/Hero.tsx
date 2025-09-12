"use client"; // <-- ACEASTA ESTE SINGURA MODIFICARE. Spune Next.js să trateze acest fișier ca o Componentă Client.

import React, { useRef, useEffect, useState, FC } from 'react';
import { ArrowRight, Star, Award } from 'lucide-react';
import gsap from 'gsap';

const Hero: FC = () => {
  // Am adăugat tipuri specifice pentru fiecare element DOM la care se face referire.
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // TypeScript poate infera tipul 'boolean' aici, dar este o bună practică să fim expliciți.
  const [showBlackBg, setShowBlackBg] = useState<boolean>(false);
  const [blackBgVisible, setBlackBgVisible] = useState<boolean>(false);

  useEffect(() => {
    // Animațiile GSAP rămân neschimbate
    if (titleRef.current && subtitleRef.current && ctaRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          ease: 'power3.out',
          delay: 1.2,
        }
      );
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: 'power3.out',
          delay: 2.1,
        }
      );
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          delay: 2.7,
        }
      );
    }
  }, []);

  useEffect(() => {
    // Adăugăm o verificare de tip pentru elementul video pentru a fi 100% type-safe.
    const video = document.getElementById('hero-bg-video') as HTMLVideoElement | null;
    if (video) {
      video.playbackRate = 0.8;
      video.onended = () => {
        setShowBlackBg(true);
      };
    }
  }, []);

  useEffect(() => {
    if (showBlackBg) {
      setTimeout(() => setBlackBgVisible(true), 50);
    }
  }, [showBlackBg]);

  return (
    // Containerul principal care se întinde pe tot ecranul
    <section className="relative flex min-h-screen items-center overflow-hidden bg-slate-900 text-white" style={{ fontFamily: 'Exo2, sans-serif' }}>
      
      {/* Video de fundal */}
      <video
        id="hero-bg-video"
        autoPlay
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-25"
      >
        <source src="/services/back.mp4" type="video/mp4" />
        {/* Adaugă aici și alte formate video (ex: .webm) pentru compatibilitate maximă */}
      </video>

      {/* Overlay pentru a asigura lizibilitatea textului */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/70" />
      
      {/* Fundal negru după terminarea videoclipului */}
      {showBlackBg && (
        <div
          className={`absolute inset-0 z-40 transition-opacity duration-2000 ease-in-out ${blackBgVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, #0f172a 60%, #000 100%)',
          }}
        >
          <div className="pointer-events-none">
            <div className="absolute top-0 left-0 h-32 w-32 rounded-full bg-teal-400/15 blur-2xl" style={{zIndex:41}} />
            <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-blue-400/15 blur-2xl" style={{zIndex:41}} />
          </div>
        </div>
      )}

      {/* Gradient subtil peste tot conținutul */}
      <div className="pointer-events-none absolute inset-0 z-20" style={{background: 'linear-gradient(135deg,rgba(20,184,166,0.08) 0%, rgba(59,130,246,0.08) 50%, rgba(15,23,42,0.7) 100%)'}} />

      {/* Container pentru conținutul central */}
      <div className="relative z-40 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-6 py-32 text-center">
        
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-teal-400/30 bg-teal-500/10 px-6 py-3 text-sm font-medium text-teal-200 backdrop-blur-sm transition-colors duration-300 hover:bg-teal-500/20">
          <Award size={16} />
          <span className="flex items-center gap-2">
            <Star size={14} className="fill-current text-yellow-400" />
            4.9/5 din 51+ clienți mulțumiți
          </span>
        </div>

        <h1 
          ref={titleRef} 
           className="text-4xl font-bold leading-tight text-transparent drop-shadow-lg sm:text-5xl lg:text-6xl mb-6 bg-clip-text bg-gradient-to-r from-teal-400 via-white to-blue-400"
              style={{ fontFamily: 'Exo2, sans-serif', letterSpacing: 1 }}>
                Vezi Cum Arată Viitorul Firmei Tale.<br />
                 <span className="mt-2 block text-white">
                 Nu-l imagina — interacționează cu el.
          </span>
        </h1>

        <div className="mb-6 flex justify-center">
          <span className="select-none font-mono text-3xl font-bold text-teal-400 animate-pulse md:text-4xl">
            &lt;/&gt;
          </span>
        </div>

        <div className="mx-auto mb-8 h-1 w-32 rounded-full bg-gradient-to-r from-teal-400 to-blue-400" />
        
        <p 
          ref={subtitleRef} 
          className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-slate-200 drop-shadow sm:text-xl flex flex-wrap items-center justify-center gap-2"
        >
          Primește un prototip interactiv al noului tău site în mai puțin de 24 de ore. <span className="font-semibold text-teal-300 ml-2 whitespace-nowrap">100% gratuit.</span>
        </p>

        <div ref={ctaRef} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            className="group flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-colors duration-300 hover:from-teal-400 hover:to-blue-400 cursor-pointer"
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 2.21.895 4.21 2.343 5.657" /></svg>
            <span>Vreau Prototipul meu Gratuit</span>
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
