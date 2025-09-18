'use client';

import React, { useRef, useEffect } from 'react';
import { ArrowRight, Layers, ShoppingBag, LucideIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Interfața TypeScript
interface ConceptProject {
  title: string;
  description: string;
  image: string;
  link: string; // Aici vei adăuga link-urile către demo-urile live
  tags: string[];
  Icon: LucideIcon;
}

// --- AICI ESTE MODIFICAREA: Am înlocuit proiectele cu demo-urile noastre ---
const conceptProjects: ConceptProject[] = [
  {
    title: 'Aura - Cafenea & Magazin Artizanal',
    description: 'Studiu de caz pentru un brand de e-commerce premium. Am creat o experiență de cumpărături imersivă cu un design ultra-modern, fundal animat, efecte de glassmorphism și un coș de cumpărături funcțional. Proiectul demonstrează atenție la detalii, animații fluide cu Framer Motion și o structură hibridă (magazin și meniu de prezentare).',
    // Imagine placeholder actualizată. Când ai un screenshot, înlocuiește-l aici.
    image: '/photos/aura-demo.png',
    link: 'https://aura-cafea-demo.vercel.app/', // TODO: Adaugă link-ul către demo-ul "Aura"
    tags: ['E-commerce', 'Branding', 'Next.js', 'Framer Motion', 'UI/UX'],
    Icon: ShoppingBag,
  },
  {
    title: 'Quantum - Landing Page pentru SaaS',
    description: 'O pagină de prezentare custom pentru o aplicație tech, axată pe un design memorabil și interacțiuni avansate. Demo-ul include un hero section cu efect 3D care reacționează la mișcarea mouse-ului, o secțiune de features cu scroll orizontal animat și un cursor personalizat, demonstrând tehnici de front-end care depășesc un template standard.',
    // Imagine placeholder actualizată.
    image: '/photos/quantum-demo.png',
    link: 'https://quantum-demo-gamma.vercel.app/', // TODO: Adaugă link-ul către demo-ul "Quantum"
    tags: ['SaaS', 'Landing Page', 'Animații Avansate', 'Next.js', 'TypeScript'],
    Icon: Layers,
  },
];

const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Animații pentru titlu și subtitlu (păstrate)
      gsap.fromTo('.portfolio-title', 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );
      gsap.fromTo('.portfolio-subtitle', 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );

      // Animații pentru cardurile de portofoliu (păstrate)
      const cards = document.querySelectorAll('.portfolio-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 80, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.2)', scrollTrigger: { trigger: card, start: 'top 85%' }, delay: 0.4 + (i * 0.2) }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-slate-950 py-28 px-6" id="portofoliu" style={{ fontFamily: 'Exo2, sans-serif' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="portfolio-title text-4xl md:text-5xl font-bold mb-6 text-white">
            Laboratorul Nostru de <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">Inovație</span>
          </h2>
          <p className="portfolio-subtitle text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Nu așteptăm viitorul, îl construim. Aici explorăm concepte și demonstrăm ce este posibil atunci când strategia întâlnește design-ul de excepție.
          </p>
        </div>

        <div className="space-y-20">
          {conceptProjects.map((project: ConceptProject, index: number) => {
            const IconComponent = project.Icon;
            
            return (
              <div key={index} className="portfolio-card grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center opacity-0">
                <div className={`text-left ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="p-2 bg-slate-800 border border-slate-700 rounded-lg">
                      <IconComponent className="w-6 h-6 text-teal-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="text-xs font-semibold text-teal-300 bg-teal-500/10 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-300"
                  >
                    <span>Vezi Studiul de Caz</span>
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>

                <div className={`group relative rounded-xl overflow-hidden shadow-2xl shadow-slate-900/80 border border-slate-800 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;