'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Globe, Wrench, TrendingUp, X, LucideIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMediaQuery from '../hooks/useMediaQuery';
import { FingerprintIcon , TargetIcon, ArrowsClockwiseIcon} from "@phosphor-icons/react";


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Position { x: number; y: number; }
interface ServicePosition { desktop: Position; mobile: Position; }
interface ServiceData {
  id: string; title: string; tagline?: string; desc: string;
  icon: LucideIcon; position: ServicePosition; image: string; color: 'teal' | 'blue';
}
type ConnectionPair = [string, string];

const servicesData: ServiceData[] = [
  {
    id: 'ecommerce', title: 'Magazin online', tagline: 'Un magazin gândit pentru cumpărare',
    desc: 'Construim magazine online gândite să susțină procesul de cumpărare și să inspire încredere de la prima vizită până la plasarea comenzii.',
    icon: ShoppingCart, position: { desktop: { x: 26, y: 32 }, mobile: { x: 22, y: 28 } },
    image: '/services/MAGAZIN.webp', color: 'teal',
  },
  {
    id: 'website', title: 'Website de prezentare', tagline: 'Prezență online mai credibilă',
    desc: 'Construim website-uri de prezentare pentru afaceri care vor să inspire încredere, să comunice mai bine ce oferă și să fie înțelese.',
    icon: Globe, position: { desktop: { x: 50, y: 50 }, mobile: { x: 50, y: 48 } },
    image: '/services/WEBSITEPREZENTARE.webp', color: 'blue',
  },
  {
    id: 'landing', title: 'Landing page', tagline: 'O ofertă prezentată clar',
    desc: 'Construim landing pages pentru campanii, servicii sau lansări, cu focus pe claritate, structură și conversie.',
    icon: TargetIcon, position: { desktop: { x: 74, y: 32 }, mobile: { x: 80, y: 32 } },
    image: '/services/LGPAGE.webp', color: 'teal',
  },
  {
    id: 'automation', title: 'Automatizare', tagline: 'Mai puțină muncă manuală',
    desc: 'Automatizăm procese repetitive pentru ca echipa ta să economisească timp, să reducă erorile și să lucreze mai eficient în activitățile de zi cu zi.',
    icon: ArrowsClockwiseIcon, position: { desktop: { x: 26, y: 70 }, mobile: { x: 20, y: 64 } },
    image: '/services/AUTO.webp', color: 'blue',
  },
  {
    id: 'maintenance', title: 'Mentenanță', tagline: 'Stabilitate și suport continuu',
    desc: 'Ne ocupăm de actualizări, monitorizare și mentenanță tehnică, astfel încât site-ul tău să rămână sigur.',
    icon: Wrench, position: { desktop: { x: 50, y: 88 }, mobile: { x: 50, y: 84 } },
    image: '/services/MAINTENANCE.webp', color: 'teal',
  },
  {
    id: 'marketing', title: 'Marketing digital', tagline: 'Vizibilitate cu obiectiv clar',
    desc: 'Implementăm campanii digitale care susțin vizibilitatea brandului tau.',
    icon: TrendingUp, position: { desktop: { x: 74, y: 70 }, mobile: { x: 78, y: 64 } },
    image: '/services/MARK.webp', color: 'teal',
  },
  {
    id: 'branding', title: 'Branding', tagline: 'Claritate pentru brandul tău',
    desc: 'Construim o identitate vizuală coerentă și ușor de recunoscut, ca brandul tău să fie perceput mai clar și ținut minte mai ușor.',
    icon: FingerprintIcon, position: { desktop: { x: 50, y: 14 }, mobile: { x: 50, y: 16 } },
    image: '/services/BRAND.webp', color: 'blue',
  },
];

const connections: ConnectionPair[] = [
  ['branding', 'website'], ['ecommerce', 'website'], ['landing', 'website'],
  ['marketing', 'website'], ['maintenance', 'website'], ['automation', 'website'],
  ['branding', 'landing'], ['landing', 'marketing'], ['marketing', 'maintenance'],
  ['maintenance', 'automation'], ['automation', 'ecommerce'], ['ecommerce', 'branding'],
];

const Services: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const linesRevealedRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ((window as any).lenis) {
      activeServiceId ? (window as any).lenis.stop() : (window as any).lenis.start();
    }
    const html = document.documentElement;
    const body = document.body;
    const preventTouch = (e: TouchEvent) => { if (activeServiceId) e.preventDefault(); };
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
    setActiveServiceId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {

        // --- Titlu & glow ---
        gsap.fromTo('.section-title h2',
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.2)',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true } }
        );
        gsap.fromTo('.section-title p',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true } }
        );
        gsap.fromTo('.bg-glow',
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
        );

        // --- Liniile: ascunse din start ---
        const lines = document.querySelectorAll<SVGPathElement>('.service-line');
        lines.forEach((line) => {
          const length = line.getTotalLength ? line.getTotalLength() : 60;
          gsap.set(line, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 });
        });

        // --- Timeline scrub DOAR pentru linii ---
        // clamp() previne declanșarea prematură înainte ca userul să fi scrollat deloc
        const sequenceTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'clamp(top 60%)',
            end: 'bottom 100%',
            scrub: 1.5,
          },
        });

        sequenceTl.to('.service-line', {
          strokeDashoffset: 0,
          opacity: 0.6,
          duration: 2,
          ease: 'none',
          stagger: 0.1,
        }, 0);

        // --- Nodurile: ScrollTrigger.batch — fiecare nod e propriul trigger ---
        // Se setează starea inițială
        gsap.set('.service-node-wrapper', {
          xPercent: -50,
          yPercent: -50,
          autoAlpha: 0,
          scale: 0.8,
          y: 20,
          filter: 'blur(8px)',
        });

        ScrollTrigger.batch('.service-node-wrapper', {
          start: 'top 88%',  // când vârful nodului ajunge la 88% din înălțimea viewport-ului
          once: true,
          onEnter: (elements) => {
            gsap.to(elements, {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.6,
              ease: 'back.out(1.4)',
              stagger: 0.1,
              onComplete: () => {
                linesRevealedRef.current = true;
              },
            });
          },
        });

      }, sectionRef);

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onAnimationComplete = (): void => setIsAnimating(false);
    const allNodes = '.service-node-wrapper';
    const allLines = '.service-line';

    if (activeServiceId) {
      const activeNode = `#node-${activeServiceId}`;
      const otherNodes = servicesData
        .filter((s) => s.id !== activeServiceId)
        .map((s) => `#node-${s.id}`)
        .join(',');

      const tl = gsap.timeline({ onComplete: onAnimationComplete });
      tl.to('.section-title', { opacity: 0, y: -15, duration: 0.3, ease: 'power3.out' })
        .to([allLines, otherNodes], { opacity: 0, duration: 0.4, ease: 'power3.in' }, 0)
        .to(activeNode, { opacity: 0, duration: 0.4, ease: 'power3.in' }, 0)
        .fromTo('.details-panel',
          { opacity: 0, scale: 0.9, pointerEvents: 'none' },
          { opacity: 1, scale: 1, pointerEvents: 'auto', duration: 0.5, ease: 'back.out(1.2)' },
          0.3
        )
        .fromTo('.details-content > *',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: 'power3.out' },
          0.6
        );
    } else {
      const tl = gsap.timeline({ onComplete: onAnimationComplete });
      tl.to('.details-panel', {
          opacity: 0, scale: 0.95, pointerEvents: 'none', duration: 0.25, ease: 'power3.in',
        })
        .to('.section-title', { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.1)' }, 0.1)
        .to(allNodes, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.1)', stagger: 0.02 }, 0.15)
        .to(allLines, {
          opacity: linesRevealedRef.current ? 0.6 : 0,
          duration: 0.4,
          ease: 'power3.out',
        }, 0.15);
    }
  }, [activeServiceId]);

  const activeService = servicesData.find((s) => s.id === activeServiceId);

  return (
    <section
      id="servicii"
      ref={sectionRef}
      className="w-full min-h-screen py-28 bg-slate-950 text-white relative overflow-hidden flex flex-col justify-center"
      style={{ fontFamily: 'Exo2, sans-serif' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      <div className="bg-glow absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(20,184,166,0.08),transparent)] opacity-0"></div>

      <div className="text-center px-6 pointer-events-none relative z-10">
        <div className="section-title">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 opacity-0">
            Ce putem construi pentru{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
              afacerea ta?
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto opacity-0">
            De la site-uri de prezentare și landing pages până la branding, magazine online și automatizări.
          </p>
        </div>
      </div>

      <div className="relative w-full h-[80vh] md:h-[100vh] mt-8">
        <div
          className={`fixed inset-0 z-20 transition-opacity duration-300 ${
            activeServiceId ? 'bg-black/60 backdrop-blur-sm' : 'bg-transparent pointer-events-none'
          }`}
          onClick={() => activeServiceId && handleNodeClick(activeServiceId)}
        ></div>

        <div className="absolute top-0 left-0 w-full h-full">
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ pointerEvents: 'none' }}
          >
            <defs>
              <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(20, 184, 166, 0.6)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.6)" />
              </linearGradient>
            </defs>
            {connections.map(([startId, endId], i) => {
              const startNodeData = servicesData.find((s) => s.id === startId);
              const endNodeData = servicesData.find((s) => s.id === endId);
              if (!startNodeData || !endNodeData) return null;
              const startPos = isMobile ? startNodeData.position.mobile : startNodeData.position.desktop;
              const endPos = isMobile ? endNodeData.position.mobile : endNodeData.position.desktop;
              const controlX = (startPos.x + endPos.x) / 2 + (startPos.y - endPos.y) * 0.1;
              const controlY = (startPos.y + endPos.y) / 2 + (endPos.x - startPos.x) * 0.1;
              return (
                <path
                  key={i}
                  d={`M ${startPos.x} ${startPos.y} Q ${controlX} ${controlY} ${endPos.x} ${endPos.y}`}
                  className="service-line"
                  stroke="url(#connection-gradient)"
                  strokeWidth="0.2"
                  fill="none"
                />
              );
            })}
          </svg>

          {servicesData.map((service) => {
            const position = isMobile ? service.position.mobile : service.position.desktop;
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                id={`node-${service.id}`}
                className="service-node-wrapper absolute z-10 invisible"
                style={{ top: `${position.y}%`, left: `${position.x}%` }}
              >
                <button
                  className="relative flex flex-col items-center group cursor-pointer hover:scale-110 focus:scale-110 transition-transform duration-300 ease-out"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(20,184,166,0.10)) drop-shadow(0 0 16px rgba(59,130,246,0.08))' }}
                  onClick={(e) => { e.stopPropagation(); handleNodeClick(service.id); }}
                  aria-label={`Vezi detalii despre ${service.title}`}
                >
                  <div className={`absolute w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-${service.color}-400/15 rounded-full blur-md group-hover:bg-${service.color}-400/25 z-[-1] transition-colors duration-300`}></div>
                  <div className={`relative p-3 sm:p-4 md:p-5 bg-slate-900/95 border-2 rounded-full backdrop-blur-sm shadow group-hover:shadow-lg transition-colors duration-200 ${
                    service.color === 'teal' ? 'border-teal-400/40 group-hover:border-teal-300' : 'border-blue-400/40 group-hover:border-blue-300'
                  }`}>
                    <IconComponent className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${
                      service.color === 'teal' ? 'text-teal-300' : 'text-blue-300'
                    } transition-colors duration-200`} />
                  </div>
                  <span className="mt-2 text-xs md:text-sm text-white text-center font-semibold leading-tight drop-shadow-md" style={{ fontFamily: 'Exo2, sans-serif' }}>
                    {service.title}
                  </span>
                </button>
              </div>
            );
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
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out"
                  style={{ backgroundImage: `url(${activeService.image})`, transform: activeServiceId ? 'scale(1)' : 'scale(1.1)' }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/20"></div>
                <div className="details-content absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`px-2 py-1 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider border ${
                      activeService.color === 'teal' ? 'border-teal-500/30 text-teal-300 bg-teal-500/10' : 'border-blue-500/30 text-blue-300 bg-blue-500/10'
                    }`}>
                      {activeService.tagline}
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-5 text-white drop-shadow-lg" style={{ fontFamily: 'Exo2, sans-serif' }}>
                    {activeService.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-200 max-w-2xl drop-shadow-md border-l-2 border-slate-500/50 pl-4">
                    {activeService.desc}
                  </p>
                </div>
                <button
                  onClick={() => activeServiceId && handleNodeClick(activeServiceId)}
                  className="absolute top-4 right-4 text-slate-300 hover:text-white bg-black/40 hover:bg-red-500/80 backdrop-blur-md rounded-full p-2 transition-transform duration-200 z-20 hover:scale-110 cursor-pointer border border-white/10"
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