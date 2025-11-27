"use client";

import { useEffect, ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface LenisSmoothScrollProps {
  children: ReactNode;
}

export default function LenisSmoothScroll({ children }: LenisSmoothScrollProps) {

  useEffect(() => {
    console.log("[Lenis Setup] Lenis este DEZACTIVAT temporar (Native Scroll Only).");

  }, []);

  return <>{children}</>;
}