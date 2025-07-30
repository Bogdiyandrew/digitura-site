'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Globe, Target, Zap, Wrench, Palette, TrendingUp, X, LucideIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMediaQuery from '../hooks/useMediaQuery';

// Asigură-te că ai gsap instalat și configurat pentru Next.js
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Interfețe TypeScript
interface Position {
  x: number;
  y: number;
}

interface ServicePosition {
  desktop: Position;
  mobile: Position;
}

interface ServiceData {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  position: ServicePosition;
  image: string;
  color: 'teal' | 'blue';
}

type ConnectionPair = [string, string];

// --- MODIFICARE TEXTE SERVICII ---
// Am rescris descrierile pentru a se concentra pe beneficiul final al clientului.
const servicesData: ServiceData[] = [
  { 
    id: 'ecommerce', 
    title: 'Magazin Online', 
    desc: 'Motorul tău de vânzări care funcționează 24/7, chiar și când dormi. Transformăm vizitatorii în clienți fideli cu un proces de plată impecabil și o experiență de cumpărături memorabilă.', 
    icon: ShoppingCart, 
    position: { desktop: { x: 20, y: 35 }, mobile: { x: 30, y: 20 } }, 
    image: '/services/MAGAZIN.webp',
    color: 'teal',
  },
  { 
    id: 'website', 
    title: 'Website Prezentare', 
    desc: 'Cartea ta de vizită digitală care nu doar impresionează, ci convertește. Construim o prezență online care comunică instant încredere și profesionalism, transformând scepticii în clienți.', 
    icon: Globe, 
    position: { desktop: { x: 50, y: 20 }, mobile: { x: 70, y: 20 } }, 
    image: '/services/WEBSITEPREZENTARE.webp',
    color: 'blue',
  },
  { 
    id: 'landing', 
    title: 'Landing Page', 
    desc: 'O mașinărie de conversie creată cu un singur scop: rezultate maxime pentru campaniile tale. Fiecare pixel este optimizat pentru a ghida vizitatorul spre acțiunea dorită.', 
    icon: Target, 
    position: { desktop: { x: 80, y: 35 }, mobile: { x: 50, y: 35 } }, 
    image: '/services/LGPAGE.webp',
    color: 'teal',
  },
  { 
    id: 'automation', 
    title: 'Automatizare', 
    desc: 'Îți redăm cel mai de preț activ: timpul. Implementăm sisteme inteligente care preiau sarcinile repetitive, elimină erorile umane și îți permit să te concentrezi pe inovație.', 
    icon: Zap, 
    position: { desktop: { x: 35, y: 60 }, mobile: { x: 25, y: 50 } }, 
    image: '/services/AUTO.webp',
    color: 'blue',
  },
  { 
    id: 'maintenance', 
    title: 'Mentenanță', 
    desc: 'Liniștea ta, garantată. Ne asigurăm că afacerea ta online este mereu protejată, actualizată și funcționează la performanță maximă. Dormi liniștit, noi veghem pentru tine.', 
    icon: Wrench, 
    position: { desktop: { x: 65, y: 60 }, mobile: { x: 75, y: 50 } }, 
    image: '/services/MAINTENANCE.webp',
    color: 'teal',
  },
  { 
    id: 'design', 
    title: 'Design & Branding', 
    desc: 'ADN-ul vizual care te face de neuitat. Creăm o identitate puternică și coerentă care te separă de zgomotul pieței și construiește un brand pe care oamenii îl iubesc și în care au încredere.', 
    icon: Palette, 
    position: { desktop: { x: 40, y: 90 }, mobile: { x: 30, y: 80 } }, 
    image: '/services/BRAND.webp',
    color: 'blue',
  },
  { 
    id: 'marketing', 
    title: 'Marketing Digital', 
    desc: 'Sistemul care aduce un flux constant de clienți la ușa ta. Prin strategii SEO, Ads și conținut, nu doar atragem trafic, ci construim audiențe care cumpără.', 
    icon: TrendingUp, 
    position: { desktop: { x: 70, y: 90 }, mobile: { x: 70, y: 80 } }, 
    image: '/services/MARK.webp',
    color: 'teal',
  }
];

const connections: ConnectionPair[] = [
  ['website', 'ecommerce'], ['website', 'landing'], ['website', 'design'], 
  ['ecommerce', 'automation'], ['landing', 'marketing'], ['design', 'automation'], 
  ['design', 'maintenance'], ['marketing', 'maintenance']
];

const Services: React.FC = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const sectionRef = useRef<HTMLElement>(null);

    const handleNodeClick = (id: string): void => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveServiceId(prevId => (prevId === id ? null : id));
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.section-title h2', { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.2)', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }});
            gsap.fromTo('.section-title p', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }, delay: 0.3 });
            gsap.fromTo('.bg-glow', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }});
            
            const lines = document.querySelectorAll('.service-line');
            lines.forEach((line, index) => {
                const svgLine = line as SVGPathElement;
                const length = svgLine.getTotalLength ? svgLine.getTotalLength() : 100;
                gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
                gsap.to(line, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut', scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true }, delay: 0.8 + (index * 0.1) });
            });

            gsap.fromTo('.service-node', { opacity: 0, scale: 0.3, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)', stagger: { amount: 1.2, from: "center", grid: "auto" }, scrollTrigger: { trigger: sectionRef.current, start: 'top 50%', once: true }, delay: 1 });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const onAnimationComplete = (): void => setIsAnimating(false);
        const allNodes = '.service-node';
        const allLines = '.service-line';
        
        if (activeServiceId) {
            const activeNode = `#node-${activeServiceId}`;
            const otherNodes = servicesData.filter(s => s.id !== activeServiceId).map(s => `#node-${s.id}`).join(',');
            const tl = gsap.timeline({ onComplete: onAnimationComplete });

            tl.to('.section-title', { opacity: 0, y: -15, duration: 0.3, ease: 'power3.out' })
              .to([allLines, otherNodes, activeNode], { opacity: 0, duration: 0.4, ease: 'power3.in' }, 0)
              .fromTo('.details-panel', { opacity: 0, scale: 0.9, pointerEvents: 'none' }, { opacity: 1, scale: 1, pointerEvents: 'auto', duration: 0.5, ease: 'back.out(1.2)' }, 0.3)
              .fromTo('.details-content > *', { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: 'power3.out' }, 0.6);
        } else {
             const tl = gsap.timeline({ onComplete: onAnimationComplete });
             tl.to('.details-panel', { opacity: 0, scale: 0.95, pointerEvents: 'none', duration: 0.25, ease: 'power3.in' })
               .to('.section-title', { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.1)' }, 0.1)
               .to(allNodes, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.1)', stagger: 0.02 }, 0.15)
               .to(allLines, { opacity: 0.6, duration: 0.4, ease: 'power3.out' }, 0.15);
        }
    }, [activeServiceId]);
    
    const activeService: ServiceData | undefined = servicesData.find(s => s.id === activeServiceId);

    return (
        <section id="servicii" ref={sectionRef} className="w-full min-h-screen py-28 bg-slate-950 text-white relative overflow-hidden flex flex-col justify-center" style={{ fontFamily: 'Exo2, sans-serif' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
            <div className="bg-glow absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(20,184,166,0.08),transparent)] opacity-0"></div>
            
            <div className="text-center px-6 pointer-events-none relative z-10">
                 <div className="section-title">
                    {/* --- MODIFICARE TITLU & SUBTITLU --- */}
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 opacity-0">
                      Servicii individuale? Nu. <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">Un singur Ecosistem.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto opacity-0">
                      Fiecare serviciu îl alimentează pe celălalt, creând un motor de creștere unificat pentru afacerea ta.
                    </p>
                </div>
            </div>

            <div className="relative w-full h-[80vh] md:h-[100vh] mt-8">
                <div 
                    className={`fixed inset-0 z-20 transition-opacity duration-300 ${activeServiceId ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent pointer-events-none'}`}
                    onClick={() => activeServiceId && handleNodeClick(activeServiceId)}
                ></div>

                <div className="absolute top-0 left-0 w-full h-full">
                    <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
                        <defs>
                          <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(20, 184, 166, 0.3)" />
                            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
                          </linearGradient>
                        </defs>
                        {connections.map(([startId, endId], i) => {
                            const startNodeData = servicesData.find(s => s.id === startId);
                            const endNodeData = servicesData.find(s => s.id === endId);
                            if (!startNodeData || !endNodeData) return null;
                            
                            const startPos = isMobile ? startNodeData.position.mobile : startNodeData.position.desktop;
                            const endPos = isMobile ? endNodeData.position.mobile : endNodeData.position.desktop;
                            const controlX = (startPos.x + endPos.x) / 2 + (startPos.y - endPos.y) * 0.1;
                            const controlY = (startPos.y + endPos.y) / 2 + (endPos.x - startPos.x) * 0.1;

                            return <path key={i} d={`M ${startPos.x} ${startPos.y} Q ${controlX} ${controlY} ${endPos.x} ${endPos.y}`} className="service-line" stroke="url(#connection-gradient)" strokeWidth="0.15" fill="none" opacity="0.6" />;
                        })}
                    </svg>
                    
                    {servicesData.map(service => {
                        const position = isMobile ? service.position.mobile : service.position.desktop;
                        const IconComponent = service.icon;
                        
                        return (
                            <button 
                                key={service.id} 
                                id={`node-${service.id}`} 
                                className="service-node absolute flex flex-col items-center group cursor-pointer transition-all duration-200 hover:scale-105 focus:scale-105 opacity-0 z-10"
                                style={{ top: `${position.y}%`, left: `${position.x}%`, transform: 'translate(-50%, -50%)', filter: 'drop-shadow(0 0 8px rgba(20,184,166,0.10)) drop-shadow(0 0 16px rgba(59,130,246,0.08))' }} 
                                onClick={(e) => { e.stopPropagation(); handleNodeClick(service.id); }}
                                aria-label={`Vezi detalii despre ${service.title}`}
                            >
                                <div className={`absolute w-10 h-10 md:w-16 md:h-16 bg-${service.color}-400/15 rounded-full blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-${service.color}-400/25 z-[-1]`}></div>
                                <div className={`relative p-3 md:p-5 bg-slate-900/95 border-2 rounded-full backdrop-blur-sm transition-all duration-200 shadow group-hover:shadow-lg ${service.color === 'teal' ? 'border-teal-400/40 group-hover:border-teal-300' : 'border-blue-400/40 group-hover:border-blue-300'}`}>
                                    <IconComponent className={`w-8 h-8 md:w-12 md:h-12 ${service.color === 'teal' ? 'text-teal-300' : 'text-blue-300'} transition-all duration-200`} />
                                </div>
                                <span className="mt-2 text-xs md:text-sm text-white text-center font-semibold leading-tight drop-shadow-md" style={{ fontFamily: 'Exo2, sans-serif' }}>{service.title}</span>
                            </button>
                        )
                    })}
                </div>
                
                <div 
                    className="details-panel fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-full md:max-w-4xl z-30" 
                    style={{opacity: 0, pointerEvents: 'none'}} 
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative w-full aspect-[9/16] md:aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
                        {activeService && (
                            <>
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
                                    style={{ 
                                        backgroundImage: `url(${activeService.image})`,
                                        transform: activeServiceId ? 'scale(1)' : 'scale(1.1)'
                                    }}
                                ></div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
                                
                                <div className="details-content absolute bottom-0 left-0 right-0 p-6 md:p-10 text-left">
                                    <h3 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white drop-shadow-lg" style={{ fontFamily: 'Exo2, sans-serif' }}>
                                        {activeService.title}
                                    </h3>
                                    <p className="text-slate-200 text-base md:text-lg leading-relaxed max-w-2xl drop-shadow-md">
                                        {activeService.desc}
                                    </p>
                                </div>

                                <button 
                                    onClick={() => activeServiceId && handleNodeClick(activeServiceId)} 
                                    className="absolute top-4 right-4 text-slate-300 hover:text-white bg-black/30 hover:bg-black/60 backdrop-blur-sm rounded-full p-2 transition-all duration-200 z-20 hover:scale-110"
                                    aria-label="Închide detaliile"
                                >
                                    <X size={20}/>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;