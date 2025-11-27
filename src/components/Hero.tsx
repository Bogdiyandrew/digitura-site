"use client";

import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Star, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);
  const codeSymbolRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  const [showBlackBg, setShowBlackBg] = useState(false);
  const [blackBgVisible, setBlackBgVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const masterTL = gsap.timeline({
        defaults: { ease: 'power4.out' }
      });


      masterTL.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotationX: -45
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.8,
          ease: 'power4.out'
        },
        0.8
      );

      masterTL.fromTo(
        codeSymbolRef.current,
        {
          opacity: 0,
          scale: 0,
          rotationY: -180,
          rotationZ: -180
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          rotationZ: 0,
          duration: 1.5,
          ease: 'back.out(2)',
          onComplete: () => {
            gsap.to(codeSymbolRef.current, {
              rotationY: 360,
              duration: 20,
              repeat: -1,
              ease: 'none'
            });
          }
        },
        1.5
      );

      masterTL.fromTo(
        separatorRef.current,
        {
          scaleX: 0,
          opacity: 0
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out'
        },
        1.8
      );

      masterTL.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out'
        },
        2
      );

      masterTL.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 30,
          rotationX: 45
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          ease: 'back.out(1.7)'
        },
        2.5
      );

      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: 200,
        scale: 1.2,
        ease: 'none'
      });

      gsap.to(gradientRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        backgroundPosition: '0% 100%',
        ease: 'none'
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
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
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-900 text-white"
      style={{ fontFamily: 'Exo2, sans-serif' }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-25"
        style={{
          willChange: 'transform',
          objectPosition: 'center 35%'
        }}
      >
        <source src="/services/back.mp4" type="video/mp4" />
      </video>

      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/70"
        style={{ willChange: 'opacity' }}
      />

      {showBlackBg && (
        <div
          className={`absolute inset-0 z-40 transition-opacity duration-2000 ease-in-out ${blackBgVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, #0f172a 60%, #000 100%)',
          }}
        >
          <div className="pointer-events-none">
            <div className="absolute top-0 left-0 h-32 w-32 rounded-full bg-teal-400/15 blur-2xl" style={{ zIndex: 41 }} />
            <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-blue-400/15 blur-2xl" style={{ zIndex: 41 }} />
          </div>
        </div>
      )}

      <div
        ref={gradientRef}
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background: 'linear-gradient(135deg, rgba(20,184,166,0.08) 0%, rgba(59,130,246,0.08) 50%, rgba(15,23,42,0.7) 100%)',
          backgroundSize: '200% 200%',
          willChange: 'background-position'
        }}
      />

      <div className="relative z-50 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-6 py-32 text-center">

        <div
          ref={badgeRef}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-teal-400/30 bg-teal-500/10 px-6 py-3 text-sm font-medium text-teal-200 backdrop-blur-sm transition-all duration-300 hover:bg-teal-500/20 hover:scale-105"
          style={{ perspective: '1000px' }}
        >
          <Award size={16} />
          <span className="flex items-center gap-2">
            <Star size={14} className="fill-current text-yellow-400" />
            4.9/5 din 40+ clienți mulțumiți
          </span>
        </div>

        <h1
          ref={titleRef}
          className="text-3xl font-bold leading-tight text-transparent drop-shadow-lg sm:text-4xl lg:text-5xl mb-6 bg-clip-text bg-gradient-to-r from-teal-400 via-white to-blue-400"
          style={{
            fontFamily: 'Exo2, sans-serif',
            letterSpacing: 1,
            perspective: '1000px'
          }}
        >
          Vezi cum arată viitorul firmei tale. Nu-l imagina — interacționează cu el.
        </h1>

        <div className="mb-6 flex justify-center" style={{ perspective: '1000px' }}>
          <span
            ref={codeSymbolRef}
            className="select-none font-mono text-2xl font-bold text-teal-400 md:text-3xl cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
          >
            &lt;/&gt;
          </span>
        </div>

        <div
          ref={separatorRef}
          className="mx-auto mb-8 h-1 w-32 rounded-full bg-gradient-to-r from-teal-400 to-blue-400"
          style={{ transformOrigin: 'center' }}
        />

        <p
          ref={subtitleRef}
          className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-slate-200 drop-shadow sm:text-lg"
        >
          Primește un prototip interactiv al noului tău site în mai puțin de 24 de ore.{' '}
          <span className="font-semibold text-teal-300">100% gratuit.</span>
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ perspective: '1000px' }}
        >
          <button
            className="group relative flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:shadow-teal-500/50 hover:scale-105 cursor-pointer overflow-hidden"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.05,
                boxShadow: '0 0 40px rgba(20,184,166,0.6)',
                duration: 0.3
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                boxShadow: '0 0 0px rgba(20,184,166,0)',
                duration: 0.3
              });
            }}
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            type="button"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <svg xmlns="http://www.w3.org/2000/svg" className="relative z-10 w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 2.21.895 4.21 2.343 5.657" />
            </svg>
            <span className="relative z-10">Vreau prototipul meu gratuit</span>
            <ArrowRight size={20} className="relative z-10 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;