'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import { Zap, TrendingUp, Clock, EyeOff, BarChart2, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Asigură-te că gsap este înregistrat corect
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Interfața pentru props-urile componentei RevealText
interface RevealTextProps {
  children: ReactNode;
  className?: string;
}

// Componenta ajutătoare reutilizabilă pentru efectul de text-reveal
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

// Componenta pentru linia de grafic animată
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
                start: 'top 60%',
            }
        });

        if (standardColRef.current && premiumColRef.current) {
          tl.fromTo(standardColRef.current, { opacity: 0, y: 80 }, { opacity: 0.6, y: 0, duration: 1, ease: 'power2.out' })
            .fromTo(premiumColRef.current, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }, "-=0.8");
        }
          
        gsap.fromTo('.premium-feature',
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: premiumColRef.current,
                    start: 'top 50%',
                }
            }
        );

        // Efect parallax cu GSAP pentru coloana premium
        gsap.to(premiumColRef.current, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: premiumColRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            }
        });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="despre" className="w-full py-28 bg-slate-950 text-white overflow-hidden" style={{ fontFamily: 'Exo2, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="mb-16">
          <RevealText>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Alegerea care îți definește viitorul.
            </h2>
          </RevealText>
          <RevealText className="delay-200">
             <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                Poți alege un simplu site sau poți alege un partener strategic. Decizia ta va dicta rezultatele.
             </p>
          </RevealText>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12">
          
          <div ref={standardColRef} className="border border-slate-800 rounded-2xl p-8 text-left filter grayscale opacity-60 hover:opacity-70 transition-opacity duration-300">
            {/* Eroarea a fost corectată aici prin înlocuirea ghilimelelor cu &quot; */}
            <h3 className="text-2xl font-bold text-slate-400 mb-8">Abordarea Standard: &quot;Doar un site&quot;</h3>
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-700 rounded-md mt-1 flex-shrink-0">
                    <EyeOff className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 mb-2">Invizibil Pentru Clienți</h4>
                    <p className="text-slate-400 leading-relaxed">Un design generic, bazat pe șabloane, te face să arăți ca toți ceilalți și te pierzi în mulțime.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-700 rounded-md mt-1 flex-shrink-0">
                    <Clock className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 mb-2">Timp Pierdut, Oportunități Ratate</h4>
                    <p className="text-slate-400 leading-relaxed">Fără automatizări, petreci ore în șir cu sarcini manuale, în loc să te ocupi de creșterea afacerii.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-700 rounded-md mt-1 flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 mb-2">Stagnare și Frustrare</h4>
                    <p className="text-slate-400 leading-relaxed">Fără date clare, deciziile sunt bazate pe ghicitori. Rezultatul? Creștere lentă și imprevizibilă.</p>
                    <div className="h-20 mt-4 bg-slate-800 rounded-lg p-3 flex items-center justify-center">
                      <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="none">
                        <path d="M 0,25 C 20,40 30,10 50,25 S 80,0 100,20" stroke="#64748b" fill="none" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"/>
                      </svg>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div>
            <div ref={premiumColRef} className="bg-slate-900 border border-teal-500/30 rounded-2xl p-8 text-left shadow-2xl shadow-teal-500/10 hover:shadow-teal-500/20 transition-shadow duration-500">
              <RevealText>
                <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                  Parteneriatul Premium: Un Motor de Creștere
                </h3>
              </RevealText>
              <div className="space-y-6">
                <div className="premium-feature flex items-start gap-4">
                  <div className="p-2 bg-teal-500/20 rounded-md mt-1 flex-shrink-0">
                    <Users className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">O Mașinărie de Atras Clienți</h4>
                    <p className="text-slate-300 leading-relaxed">Creăm o experiență unică, proiectată strategic pentru a-ți transforma vizitatorii în clienți fideli.</p>
                  </div>
                </div>
                
                <div className="premium-feature flex items-start gap-4">
                  <div className="p-2 bg-blue-500/20 rounded-md mt-1 flex-shrink-0">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Afacerea ta Rulează, Chiar și Când Dormi</h4>
                    <p className="text-slate-300 leading-relaxed">Implementăm sisteme care preiau comenzi, generează oferte și aduc clienți 24/7, automat.</p>
                  </div>
                </div>
                
                <div className="premium-feature flex items-start gap-4">
                  <div className="p-2 bg-teal-500/20 rounded-md mt-1 flex-shrink-0">
                    <BarChart2 className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Decizii Clare, Progres Garantat</h4>
                    <p className="text-slate-300 leading-relaxed">Folosim date concrete pentru a optimiza constant strategia, asigurând o creștere continuă și predictibilă.</p>
                    <div className="h-20 mt-4 bg-slate-800/50 rounded-lg p-3 flex items-center justify-center">
                        <PremiumGrowthLine />
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
