'use client';

import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

export default function PortofoliuPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const line = document.querySelector<SVGPathElement>('.draw-line');
      if (line) {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: 'power2.inOut',
          delay: 0.3,
        });
      }

      gsap.fromTo('.anim-tag',
        { opacity: 0, y: 10, letterSpacing: '0.4em' },
        { opacity: 1, y: 0, letterSpacing: '0.25em', duration: 0.8, ease: 'power3.out', delay: 0.5 }
      );
      gsap.fromTo('.anim-title span',
        { opacity: 0, y: 60, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 1, ease: 'expo.out', stagger: 0.12, delay: 0.7 }
      );
      gsap.fromTo('.anim-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 1.3 }
      );
      gsap.fromTo('.anim-dot',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)', stagger: 0.15, delay: 1.6 }
      );
      gsap.to('.pulse-dot', {
        scale: 1.4,
        opacity: 0.4,
        duration: 1.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.4, from: 'random' },
      });
      gsap.to('.bg-particle', {
        y: -30,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.7, from: 'random' },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const particles = [
    { w: 3, h: 3, top: 15, left: 10, teal: true },
    { w: 5, h: 5, top: 25, left: 85, teal: false },
    { w: 2, h: 2, top: 60, left: 5,  teal: true },
    { w: 4, h: 4, top: 75, left: 90, teal: false },
    { w: 3, h: 3, top: 40, left: 50, teal: true },
    { w: 6, h: 6, top: 80, left: 20, teal: false },
    { w: 2, h: 2, top: 20, left: 70, teal: true },
    { w: 4, h: 4, top: 55, left: 45, teal: false },
  ];

  return (
    <>
      <Head>
        <title>Portofoliu | Digitura</title>
        <meta name="description" content="Portofoliul Digitura — în curând." />
      </Head>
      <Header />

      <main
        ref={containerRef}
        className="relative min-h-screen bg-slate-950 text-white overflow-hidden flex flex-col items-center justify-center"
        style={{ fontFamily: 'Exo2, sans-serif' }}
      >
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(20,184,166,0.07),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_70%,rgba(59,130,246,0.05),transparent)] pointer-events-none" />

        {/* Particles */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="bg-particle absolute rounded-full opacity-20 pointer-events-none"
            style={{
              width: `${p.w}px`,
              height: `${p.h}px`,
              background: p.teal ? 'rgba(20,184,166,0.8)' : 'rgba(59,130,246,0.8)',
              top: `${p.top}%`,
              left: `${p.left}%`,
            }}
          />
        ))}

        {/* Animated Line SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(20,184,166,0.5)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0.3)" />
            </linearGradient>
          </defs>
          <path
            className="draw-line"
            d="M -50 500 C 150 450, 300 200, 600 350 S 950 500, 1250 200"
            stroke="url(#lg1)"
            strokeWidth="1"
            fill="none"
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
          <p className="anim-tag opacity-0 text-teal-400 text-xs font-bold uppercase tracking-[0.25em] mb-8">
            Digitura · Portofoliu
          </p>

          <div className="overflow-hidden mb-6">
            <h1 className="anim-title text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
              <span className="inline-block opacity-0 text-white">Lucrăm </span>{' '}
              <span className="inline-block opacity-0 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
                la ceva
              </span>
              <br />
              <span className="inline-block opacity-0 text-white">frumos</span>
              <span className="inline-block opacity-0 text-teal-400">.</span>
            </h1>
          </div>

          <p className="anim-sub opacity-0 text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mb-14">
            Portofoliul nostru este în curs de actualizare. Până atunci, ne poți contacta direct pentru a vedea proiectele noastre.
          </p>

          <div className="flex items-center gap-3 mb-14">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`anim-dot pulse-dot opacity-0 rounded-full ${
                  i === 1 ? 'w-3 h-3 bg-teal-400' : 'w-2 h-2 bg-slate-600'
                }`}
              />
            ))}
          </div>

          {/* BUTONUL CORECTAT AICI: */}
          <a
            href="/#contact"
            className="anim-sub opacity-0 group inline-flex items-center gap-3 border border-teal-500/40 hover:border-teal-400 text-teal-300 hover:text-white px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-teal-500/10 backdrop-blur-sm"
          >
            Contactează-ne
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      </main>

      <Footer />
    </>
  );
}