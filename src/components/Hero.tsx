"use client";

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhoneCallIcon } from "@phosphor-icons/react";


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const lines = [
  {
    words: ['Construim'],
    gradient: false,
  },
  {
    words: ['site-uri', 'web'],
    gradient: true,
    gradientStyle: 'linear-gradient(90deg, #14b8a6 0%, #7dd3fc 55%, #3b82f6 100%)',
  },
  {
    words: ['care', 'duc', 'afacerile'],
    gradient: false,
  },
  {
    words: ['mai', 'departe.'],
    gradient: true,
    gradientStyle: 'linear-gradient(90deg, #3b82f6 0%, #14b8a6 100%)',
  },
];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showBlackBg, setShowBlackBg] = useState(false);
  const [blackBgVisible, setBlackBgVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Per-word stagger animation
      const words = gsap.utils.toArray<HTMLElement>('.hero-word', titleRef.current);

      gsap.fromTo(
        words,
        { opacity: 0, y: 36, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.08,
          delay: 0.3,
        }
      );

      // CTA appears after last word
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 16, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.3 + words.length * 0.08 + 0.1,
        }
      );

      // Parallax on scroll
      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: 200,
        scale: 1.15,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.75;
      video.onended = () => setShowBlackBg(true);
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
      className="relative min-h-screen overflow-hidden bg-slate-950 text-white"
      style={{ fontFamily: 'Exo2, sans-serif' }}
    >
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-20"
        style={{ willChange: 'transform', objectPosition: 'center 35%' }}
      >
        <source src="/services/backnou.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradients */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-slate-950/90 via-slate-950/60 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

      {/* Radial glow — teal, bottom-left anchor */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-10"
        style={{
          width: '60vw',
          height: '60vh',
          background: 'radial-gradient(ellipse at bottom left, rgba(20,184,166,0.13) 0%, transparent 70%)',
        }}
      />

      {/* Radial glow — blue, top-right */}
      <div
        className="pointer-events-none absolute top-0 right-0 z-10"
        style={{
          width: '50vw',
          height: '55vh',
          background: 'radial-gradient(ellipse at top right, rgba(59,130,246,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Video-end black fade */}
      {showBlackBg && (
        <div
          className={`absolute inset-0 z-40 transition-opacity duration-[2000ms] ease-in-out ${blackBgVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'radial-gradient(ellipse at 50% 50%, #0f172a 60%, #000 100%)' }}
        />
      )}

      {/* MAIN CONTENT — vertically centered, left aligned */}
      <div
        ref={contentRef}
        className="relative z-50 flex min-h-screen flex-col justify-center px-6 pt-20 sm:px-10 lg:px-16 xl:px-20"
      >
        <div className="max-w-2xl xl:max-w-3xl mt-24 lg:mt-32">

          {/* Headline — per-word animated */}
          <h1
            ref={titleRef}
            className="font-semibold leading-[1.0] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(52px, 7vw, 96px)' }}
          >
            {lines.map((line, li) => (
              <span key={li} className="block">
                {line.words.map((word, wi) => (
                  <span
                    key={wi}
                    className="hero-word inline-block"
                    style={
                      line.gradient
                        ? {
                            backgroundImage: line.gradientStyle,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            marginRight: wi < line.words.length - 1 ? '0.3em' : 0,
                          }
                        : { marginRight: wi < line.words.length - 1 ? '0.3em' : 0 }
                    }
                  >
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* CTA */}
<div ref={ctaRef} className="mt-10">
  <button
    className="group relative flex items-center gap-3 overflow-hidden rounded-xl px-7 py-4 text-md font-bold transition-all duration-300 hover:scale-[1.03] cursor-pointer"
    style={{
      background: 'white',
      boxShadow: '0 0 32px rgba(20,184,166,0.25)',
    }}
    onClick={() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }}
    type="button"
  >
    {/* Iconița este acum prima */}
    <PhoneCallIcon 
      size={20} 
      className="relative z-10 text-black transition-transform group-hover:-translate-x-1" 
    />
    
    {/* Textul urmează după iconiță */}
    <span className="relative z-10 text-black">Discută cu noi</span>
  </button>
</div>

        </div>
      </div>
    </section>
  );
};

export default Hero;