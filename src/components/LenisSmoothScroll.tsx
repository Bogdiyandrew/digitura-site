"use client";

import { useEffect, ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

declare global {
  interface Window {
    lenis: Lenis;
  }
}

// Înregistrează ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface LenisSmoothScrollProps {
  children: ReactNode;
}

export default function LenisSmoothScroll({ children }: LenisSmoothScrollProps) {
  useEffect(() => {
    // Creează instanța Lenis
    const lenis = new Lenis({
      duration: 1.2, // Cât de smooth (1.0-2.0 recomandat)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      orientation: 'vertical', // Direcția scroll-ului
      gestureOrientation: 'vertical',
      smoothWheel: true, // Smooth scroll cu mouse wheel
      wheelMultiplier: 1, // Sensibilitatea mouse-ului (0.5-2.0)
      touchMultiplier: 2,
      infinite: false,
    });

    // Sincronizează Lenis cu GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Adaugă Lenis în GSAP ticker pentru sincronizare perfectă
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Dezactivează lag smoothing pentru mai multă precizie
    gsap.ticker.lagSmoothing(0);

    // Expune Lenis global pentru acces în alte componente
    window.lenis = lenis;

    // Cleanup la unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return <>{children}</>;
}