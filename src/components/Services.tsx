'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Globe, Target, Zap, Wrench, TrendingUp, X, LucideIcon, Shield, Gauge, Rocket, Sparkles, Clock, Settings, Users, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMediaQuery from '../hooks/useMediaQuery';
// import useScrollLock from '../hooks/useScrollLock'; // Uncomment if you use this

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Position {
  x: number;
  y: number;
}

interface ServicePosition {
  desktop: Position;
  mobile: Position;
}

interface Benefit {
  icon: LucideIcon;
  stat: string;
  label: string;
  color: 'teal' | 'blue';
}

interface ServiceData {
  id: string;
  title: string;
  tagline?: string;
  desc: string;
  icon: LucideIcon;
  position: ServicePosition;
  image: string;
  color: 'teal' | 'blue';
  benefits: Benefit[];
}

type ConnectionPair = [string, string];

// --- AICI SUNT TEXTELE NOI (Modificate să fie directe și umane) ---
const servicesData: ServiceData[] = [
  {
    id: 'ecommerce',
    title: 'Magazin Online',
    tagline: 'Vinde în timp ce dormi',
    desc: 'Un magazin fizic te ține legat 12 ore pe zi. Aici, casa de marcat bate singură la 3 dimineața. Construim magazine care se încarcă instant și ghidează clientul direct spre butonul "Plătește", fără să se blocheze.',
    icon: ShoppingCart,
    position: { desktop: { x: 26, y: 32 }, mobile: { x: 22, y: 28 } },
    image: '/services/MAGAZIN.webp',
    color: 'teal',
    benefits: [
      { icon: Zap, stat: 'Rapid', label: 'Nu pierzi clienți', color: 'teal' },
      { icon: Gauge, stat: 'Simplu', label: 'Ușor de administrat', color: 'blue' },
    ]
  },
  {
    id: 'website',
    title: 'Website Prezentare',
    tagline: 'Nu mai arăta "ieftin"',
    desc: 'Prima impresie contează. Dacă site-ul tău arată a 2010, clienții cred că și afacerea ta e prăfuită. Îți facem un site curat, modern, care strigă "profesionalism" și justifică prețurile tale.',
    icon: Globe,
    position: { desktop: { x: 50, y: 50 }, mobile: { x: 50, y: 48 } },
    image: '/services/WEBSITEPREZENTARE.webp',
    color: 'blue',
    benefits: [
      { icon: Target, stat: 'Premium', label: 'Inspiri încredere', color: 'teal' },
      { icon: Shield, stat: 'Validare', label: 'Te iau în serios', color: 'blue' },
    ]
  },
  {
    id: 'landing',
    title: 'Landing Page',
    tagline: 'Pagină care vinde',
    desc: 'Reclamele sunt scumpe. Nu le irosi trimițând oamenii pe "Home". Creăm pagini dedicate cu un singur scop: să ia banii sau emailul clientului ACUM. Fără meniuri, fără distrageri, doar convingere.',
    icon: Target,
    position: { desktop: { x: 74, y: 32 }, mobile: { x: 80, y: 32 } },
    image: '/services/LGPAGE.webp',
    color: 'teal',
    benefits: [
      { icon: ArrowUpRight, stat: 'Max', label: 'Conversie', color: 'teal' },
      { icon: Rocket, stat: 'Rapid', label: 'Gata de campanie', color: 'blue' },
    ]
  },
  {
    id: 'automation',
    title: 'Automatizare',
    tagline: 'Scapă de munca de robot',
    desc: 'Te-ai săturat să dai copy-paste din email în Excel? Conectăm aplicațiile între ele. Când intră o comandă, factura se face singură și clientul primește mail. Tu doar verifici contul.',
    icon: Zap,
    position: { desktop: { x: 26, y: 70 }, mobile: { x: 20, y: 64 } },
    image: '/services/AUTO.webp',
    color: 'blue',
    benefits: [
      { icon: Clock, stat: 'Ore', label: 'Câștigate săptămânal', color: 'blue' },
      { icon: Settings, stat: 'Zero', label: 'Erori umane', color: 'teal' },
    ]
  },
  {
    id: 'maintenance',
    title: 'Mentenanță',
    tagline: 'Departamentul tău IT',
    desc: 'Nu îți bate capul cu update-uri, backup-uri sau securitate. Noi stăm cu ochii pe site ca tu să stai liniștit. Dacă pică ceva (deși nu pică), rezolvăm noi înainte să afli tu.',
    icon: Wrench,
    position: { desktop: { x: 50, y: 88 }, mobile: { x: 50, y: 84 } },
    image: '/services/MAINTENANCE.webp',
    color: 'teal',
    benefits: [
      { icon: Shield, stat: 'Sigur', label: 'Dormi liniștit', color: 'blue' },
      { icon: Wrench, stat: 'Non-stop', label: 'Monitorizare', color: 'teal' },
    ]
  },
  {
    id: 'marketing',
    title: 'Marketing Digital',
    tagline: 'Clienți, nu doar like-uri',
    desc: 'Like-urile nu țin de foame. Noi îți aducem oameni care chiar caută ce vinzi tu. Setăm reclamele și SEO-ul ca să apari exact în fața clientului când e gata să cumpere.',
    icon: TrendingUp,
    position: { desktop: { x: 74, y: 70 }, mobile: { x: 78, y: 64 } },
    image: '/services/MARK.webp',
    color: 'teal',
    benefits: [
      { icon: Users, stat: 'Reali', label: 'Clienți calificați', color: 'blue' },
      { icon: TrendingUp, stat: 'Profit', label: 'Investiție recuperată', color: 'teal' },
    ]
  },
  {
    id: 'branding',
    title: 'Branding',
    tagline: 'Fă-i să te țină minte',
    desc: 'De ce să cumpere de la tine și nu de la concurență? Brandingul e răspunsul. Îți construim o poveste și o imagine vizuală care te scoate din anonimat și te pune pe harta marilor jucători.',
    icon: Sparkles,
    position: { desktop: { x: 50, y: 14 }, mobile: { x: 50, y: 16 } },
    image: '/services/BRAND.webp',
    color: 'blue',
    benefits: [
      { icon: Sparkles, stat: 'Wow', label: 'Impact vizual', color: 'teal' },
      { icon: Shield, stat: 'Top', label: 'Poziționare', color: 'blue' },
    ]
  }
];

const connections: ConnectionPair[] = [
  ['branding', 'website'], ['ecommerce', 'website'], ['landing', 'website'],
  ['marketing', 'website'], ['maintenance', 'website'], ['automation', 'website'],
  ['branding', 'landing'], ['landing', 'marketing'], ['marketing', 'maintenance'],
  ['maintenance', 'automation'], ['automation', 'ecommerce'], ['ecommerce', 'branding']
];

const Services: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ((window as any).lenis) {
      if (activeServiceId) {
        (window as any).lenis.stop();
      } else {
        (window as any).lenis.start();
      }
    }
    const html = document.documentElement;
    const body = document.body;
    const preventTouch = (e: TouchEvent) => {
      if (activeServiceId) e.preventDefault();
    };

    if (activeServiceId) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      document.addEventListener('touchmove', preventTouch, { passive: false });
    } else {
      html.style.overflow = '';
      body.style.overflow = '';
      document.removeEventListener('touchmove', preventTouch);
    }
    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
      document.removeEventListener('touchmove', preventTouch);
      if ((window as any).lenis) (window as any).lenis.start();
    };
  }, [activeServiceId]);

  const handleNodeClick = (id: string): void => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveServiceId(prevId => (prevId === id ? null : id));
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.section-title h2', { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.2)', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true } });
      gsap.fromTo('.section-title p', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }, delay: 0.3 });
      gsap.fromTo('.bg-glow', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } });

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 opacity-0">
            {/* TEXT TITLU SCHIMBAT */}
            Tot ce ai nevoie <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">ca să crești online.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto opacity-0">
            {/* TEXT SUBTITLU SCHIMBAT */}
            Nu îți dăm doar un site și "mult succes". Îți construim întregul sistem prin care atragi clienți și vinzi, fără să îți bați capul cu tehnica.
          </p>
        </div>
      </div>

      <div className="relative w-full h-[80vh] md:h-[100vh] mt-8">
        <div
          className={`fixed inset-0 z-20 transition-opacity duration-300 ${activeServiceId ? 'bg-black/60 backdrop-blur-sm' : 'bg-transparent pointer-events-none'}`}
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
                <div className={`absolute w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-${service.color}-400/15 rounded-full blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-${service.color}-400/25 z-[-1]`}></div>
                <div className={`relative p-3 sm:p-4 md:p-5 bg-slate-900/95 border-2 rounded-full backdrop-blur-sm transition-all duration-200 shadow group-hover:shadow-lg ${service.color === 'teal' ? 'border-teal-400/40 group-hover:border-teal-300' : 'border-blue-400/40 group-hover:border-blue-300'}`}>
                  <IconComponent className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${service.color === 'teal' ? 'text-teal-300' : 'text-blue-300'} transition-all duration-200`} />
                </div>
                <span className="mt-2 text-xs md:text-sm text-white text-center font-semibold leading-tight drop-shadow-md" style={{ fontFamily: 'Exo2, sans-serif' }}>{service.title}</span>
              </button>
            )
          })}
        </div>

        <div
          className="details-panel fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-full md:max-w-4xl z-30"
          style={{ opacity: 0, pointerEvents: 'none' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full aspect-[4/5] sm:aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
            {activeService && (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
                  style={{
                    backgroundImage: `url(${activeService.image})`,
                    transform: activeServiceId ? 'scale(1)' : 'scale(1.1)'
                  }}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/20"></div>

                <div className="details-content absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`px-2 py-1 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider border ${activeService.color === 'teal' ? 'border-teal-500/30 text-teal-300 bg-teal-500/10' : 'border-blue-500/30 text-blue-300 bg-blue-500/10'}`}>
                      {activeService.tagline}
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-5 text-white drop-shadow-lg" style={{ fontFamily: 'Exo2, sans-serif' }}>
                    {activeService.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-200 max-w-2xl drop-shadow-md border-l-2 border-slate-500/50 pl-4">
                    {activeService.desc}
                  </p>

                  <div className="mt-6 md:mt-8 flex flex-wrap gap-3 md:gap-5">
                    {activeService.benefits.map((benefit, index) => {
                      const BenefitIcon = benefit.icon;
                      return (
                        <div key={index} className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                          <BenefitIcon className={`w-5 h-5 ${benefit.color === 'teal' ? 'text-teal-400' : 'text-blue-400'}`} />
                          <div>
                            <div className={`text-sm sm:text-base font-bold ${benefit.color === 'teal' ? 'text-teal-100' : 'text-blue-100'}`}>{benefit.stat}</div>
                            <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-medium">{benefit.label}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => activeServiceId && handleNodeClick(activeServiceId)}
                  className="absolute top-4 right-4 text-slate-300 hover:text-white bg-black/40 hover:bg-red-500/80 backdrop-blur-md rounded-full p-2 transition-all duration-200 z-20 hover:scale-110 cursor-pointer border border-white/10"
                  aria-label="Închide detaliile"
                >
                  <X size={24} />
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