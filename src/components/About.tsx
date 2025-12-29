'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import { Zap, TrendingUp, Clock, EyeOff, BarChart2, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealTextProps {
  children: ReactNode;
  className?: string;
}

const RevealText: React.FC<RevealTextProps> = ({ children, className }) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current || typeof window === 'undefined') return;

    gsap.fromTo(textRef.current,
      { y: '100%' },
      {
        y: '0%',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 90%',
        }
      }
    );
  }, []);

  return (
    <span className={`block overflow-hidden ${className || ''}`}>
      <span ref={textRef} className="block">
        {children}
      </span>
    </span>
  );
};

const PremiumGrowthLine: React.FC = () => (
  <svg
    viewBox="0 0 100 50"
    className="w-full h-full"
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="premium-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#2dd4bf" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>
    </defs>
    <path
      d="M 0,45 C 10,40 20,10 35,15 S 60,30 75,20 S 90,5 100,2"
      stroke="url(#premium-gradient)"
      fill="none"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const standardColRef = useRef<HTMLDivElement>(null);
  const premiumColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      if (standardColRef.current && premiumColRef.current) {
        tl.fromTo(standardColRef.current,
          { opacity: 0, y: 40 },
          { opacity: 0.6, y: 0, duration: 0.6, ease: 'power3.out' }
        )
          .fromTo(premiumColRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            "-=0.4"
          );
      }
      gsap.fromTo('.premium-feature',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: premiumColRef.current,
            start: 'top 60%',
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="despre"
      className="w-full py-16 sm:py-20 md:py-24 lg:py-28 bg-slate-950 text-white overflow-hidden"
      style={{ fontFamily: 'Exo2, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-12 sm:mb-14 md:mb-16">
          <RevealText>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight px-2">
              Alegerea care îți definește viitorul.
            </h2>
          </RevealText>
          <RevealText className="delay-200">
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto px-4 leading-relaxed">
              Poți alege un simplu site sau poți alege un partener strategic.
            </p>
          </RevealText>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-8 xl:gap-10">

          <div className="relative">
            <div className="absolute -top-3 left-6 px-3 py-1 bg-slate-800 border border-slate-700 
                            rounded-full text-xs font-semibold text-slate-400 z-30">
              Abordare tradițională
            </div>

            <div
              ref={standardColRef}
              className="relative border-2 border-slate-700/50 rounded-2xl p-6 sm:p-7 md:p-8 text-left 
                         bg-slate-900/40 backdrop-blur-sm overflow-visible
                         hover:border-slate-600/50 transition-all duration-300"
            >

              <h3 className="text-xl sm:text-2xl md:text-2xl font-bold text-slate-400 mb-6 sm:mb-7 md:mb-8 mt-2">
                Abordarea standard: &quot;Doar un site&quot;
              </h3>
              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4 opacity-70">
                  <div className="p-2 sm:p-2.5 bg-slate-800/50 rounded-lg mt-0.5 sm:mt-1 flex-shrink-0">
                    <EyeOff className="w-5 h-5 sm:w-6 sm:h-6 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-300 mb-1.5 sm:mb-2 text-sm sm:text-base">
                      Invizibil pentru clienți
                    </h4>
                    <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                      Un design generic, bazat pe șabloane, te face să arăți ca toți ceilalți și te pierzi în mulțime.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4 opacity-70">
                  <div className="p-2 sm:p-2.5 bg-slate-800/50 rounded-lg mt-0.5 sm:mt-1 flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-300 mb-1.5 sm:mb-2 text-sm sm:text-base">
                      Timp pierdut, oportunități ratate
                    </h4>
                    <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                      Fără automatizări, petreci ore în șir cu sarcini manuale, în loc să te ocupi de creșterea afacerii.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4 opacity-70">
                  <div className="p-2 sm:p-2.5 bg-slate-800/50 rounded-lg mt-0.5 sm:mt-1 flex-shrink-0">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-300 mb-1.5 sm:mb-2 text-sm sm:text-base">
                      Stagnare și frustrare
                    </h4>
                    <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                      Fără date clare, deciziile sunt bazate pe ghicitori. Rezultatul? Creștere lentă și imprevizibilă.
                    </p>
                    <div className="h-16 sm:h-20 mt-3 sm:mt-4 bg-slate-800/30 rounded-lg p-2.5 sm:p-3 
                                    flex items-center justify-center border border-slate-700/30">
                      <svg viewBox="0 0 100 50" className="w-full h-full opacity-60" preserveAspectRatio="none">
                        <path
                          d="M 0,25 C 20,40 30,10 50,25 S 80,0 100,20"
                          stroke="#64748b"
                          fill="none"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray="4 4"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div
              ref={premiumColRef}
              className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
                         border-2 border-teal-400/40 rounded-2xl p-6 sm:p-7 md:p-8 text-left 
                         shadow-2xl shadow-teal-500/20 hover:shadow-teal-500/30 
                         transition-all duration-500 hover:border-teal-400/60 hover:scale-[1.02]
                         overflow-visible group"
            >
              <div className="absolute -top-3 left-6 px-4 py-1.5 
                              bg-gradient-to-r from-teal-500 to-blue-500 
                              rounded-full text-xs font-bold text-white shadow-lg z-30">
                Soluția noastrǎ
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-blue-500/10 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-transparent 
                              rounded-bl-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/20 to-transparent 
                              rounded-tr-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <RevealText>
                  <h3 className="text-xl sm:text-2xl md:text-2xl font-bold mb-6 sm:mb-7 md:mb-8 mt-2
                                 bg-gradient-to-r from-teal-300 via-teal-400 to-blue-400 bg-clip-text text-transparent
                                 drop-shadow-sm">
                    Parteneriatul premium: Un motor de creștere
                  </h3>
                </RevealText>

                <div className="space-y-5 sm:space-y-6">
                  <div className="premium-feature flex items-start gap-3 sm:gap-4 group/item">
                    <div className="p-2 sm:p-2.5 bg-gradient-to-br from-teal-500/25 to-teal-600/25 
                                    rounded-xl mt-0.5 sm:mt-1 flex-shrink-0 
                                    ring-2 ring-teal-400/40 shadow-lg shadow-teal-500/20
                                    group-hover/item:scale-110 group-hover/item:ring-teal-400/60 
                                    transition-all duration-300">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-teal-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white mb-1.5 sm:mb-2 text-sm sm:text-base
                                     group-hover/item:text-teal-300 transition-colors duration-300">
                        O mașinărie de atras clienți
                      </h4>
                      <p className="text-slate-200 leading-relaxed text-sm sm:text-base">
                        Creăm o experiență unică, proiectată strategic pentru a-ți transforma vizitatorii în clienți fideli.
                      </p>
                    </div>
                  </div>
                  <div className="premium-feature flex items-start gap-3 sm:gap-4 group/item">
                    <div className="p-2 sm:p-2.5 bg-gradient-to-br from-blue-500/25 to-blue-600/25 
                                    rounded-xl mt-0.5 sm:mt-1 flex-shrink-0 
                                    ring-2 ring-blue-400/40 shadow-lg shadow-blue-500/20
                                    group-hover/item:scale-110 group-hover/item:ring-blue-400/60 
                                    transition-all duration-300">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white mb-1.5 sm:mb-2 text-sm sm:text-base
                                     group-hover/item:text-blue-300 transition-colors duration-300">
                        Afacerea ta rulează, chiar și când dormi
                      </h4>
                      <p className="text-slate-200 leading-relaxed text-sm sm:text-base">
                        Implementăm sisteme care preiau comenzi, generează oferte și aduc clienți 24/7, automat.
                      </p>
                    </div>
                  </div>
                  <div className="premium-feature flex items-start gap-3 sm:gap-4 group/item">
                    <div className="p-2 sm:p-2.5 bg-gradient-to-br from-teal-500/25 to-teal-600/25 
                                    rounded-xl mt-0.5 sm:mt-1 flex-shrink-0 
                                    ring-2 ring-teal-400/40 shadow-lg shadow-teal-500/20
                                    group-hover/item:scale-110 group-hover/item:ring-teal-400/60 
                                    transition-all duration-300">
                      <BarChart2 className="w-5 h-5 sm:w-6 sm:h-6 text-teal-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white mb-1.5 sm:mb-2 text-sm sm:text-base
                                     group-hover/item:text-teal-300 transition-colors duration-300">
                        Decizii clare, progres garantat
                      </h4>
                      <p className="text-slate-200 leading-relaxed text-sm sm:text-base">
                        Folosim date concrete pentru a optimiza constant strategia, asigurând o creștere continuă și predictibilă.
                      </p>
                      <div className="h-16 sm:h-20 mt-3 sm:mt-4 bg-slate-900/80 rounded-xl p-2.5 sm:p-3 
                                      flex items-center justify-center backdrop-blur-sm 
                                      ring-2 ring-teal-400/30 shadow-inner">
                        <PremiumGrowthLine />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;