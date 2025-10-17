'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';
import { ArrowRight, Layers, ShoppingBag, Car, Bot, Database } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    title: 'Aura - Cafenea & Magazin Artizanal',
    description: 'Studiu de caz pentru un brand premium ce combină atmosfera unei cafenele cu un magazin artizanal online, oferind o experiență unică utilizatorilor.',
    image: '/photos/aurarev.png',
    link: 'https://aura-cafea-demo.vercel.app/',
    tags: ['E-commerce', 'Branding', 'Next.js', 'Framer Motion', 'UI/UX'],
    Icon: ShoppingBag,
  },
  {
    title: 'Quantum - Landing Page pentru SaaS',
    description: 'Landing page custom cu animații 3D și interactivitate avansată, destinat unei platforme SaaS inovatoare pentru managementul proiectelor.',
    image: '/photos/quantumrev.png',
    link: 'https://quantum-demo-gamma.vercel.app/',
    tags: ['SaaS', 'Landing Page', 'Next.js', 'TypeScript'],
    Icon: Layers,
  },
  {
    title: 'Precision Auto - Service Auto & Programări Online',
    description: 'Website modern pentru un service auto, construit în Next.js, cu sistem de programări online, prezentare detaliată a serviciilor și design profesional.',
    image: '/photos/precrev.png',
    link: 'https://precision-auto-demo.vercel.app/',
    tags: ['Service Auto', 'Next.js', 'Booking', 'Prezentare'],
    Icon: Car,
  },
  {
    title: 'Pas cu Pas - Asistent AI pentru Români',
    description: 'Un site integrat cu AI care oferă conversații empatice și suport pentru probleme precum depresia, singurătatea sau anxietatea. O inițiativă dedicată să aducă inteligența artificială mai aproape de oameni, în sprijinul comunității.',
    image: '/photos/pascupas3.png',
    link: 'https://www.pascupas.online/',
    tags: ['AI', 'Asistență', 'Conversație', 'Suport Emoțional'],
    Icon: Bot,
  },
  {
    title: 'ShopFlow Dashboard - Panou de Control pentru E-commerce',
    description: 'Dashboard interactiv pentru gestionarea magazinelor online, oferind analize detaliate, managementul comenzilor și optimizarea vânzărilor.',
    image: '/photos/shopflowrev.png',
    link: 'https://dashboard-demo-eight.vercel.app/',
    tags: ['E-commerce', 'Dashboard', 'Analytics', 'Sales Management'],
    Icon: Database,
  },
  {
    title: 'EcoTravel - Aplicație Mobilă pentru Turism Sustenabil',
    description: 'Aplicație mobilă ce promovează turismul sustenabil, oferind recomandări personalizate și ghiduri eco-friendly.',
    image: '/photos/dashboard-demo.png',
    link: 'https://ecotravel-demo.vercel.app/',
    tags: ['Mobile App', 'React Native', 'Sustainability', 'UX/UI'],
    Icon: Layers,
  },
];

export default function PortofoliuPage() {
  return (
    <>
      <Header />
      <main className="bg-slate-950 text-white font-exo2">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-r from-teal-500/20 via-blue-600/20 to-slate-900/30 py-28 px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6">Portofoliul Nostru</h1>
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-300 leading-relaxed">
            Descoperă proiectele noastre de concept și studiile de caz prin care explorăm design-ul, tehnologia și experiențele digitale de top.
          </p>
        </section>

        {/* Projects Grid */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => {
            const IconComponent = project.Icon;
            return (
              <div
                key={index}
                className="bg-slate-900 rounded-xl shadow-md shadow-slate-800 hover:shadow-teal-500/50 transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="w-full h-48 md:h-56 object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                    priority={index < 2}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-slate-800 border border-slate-700 rounded-lg">
                      <IconComponent className="w-6 h-6 text-teal-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-6 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs font-semibold text-teal-300 bg-teal-500/10 px-3 py-1 rounded-full select-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-300 mt-auto"
                  >
                    <span>Vezi Studiul de Caz</span>
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}