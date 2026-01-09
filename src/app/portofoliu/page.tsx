'use client';
import Link from 'next/link';
import Head from "next/head";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React, { useState } from 'react';
import { ArrowRight, Layers, ShoppingBag, Car, Bot, Database, PlugZap, ExternalLink, Hospital, Scale } from 'lucide-react'; import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';


const projects = [
  {
    id: 1,
    title: 'Cabinet avocaturǎ - consultanță juridică',
    description: 'Website corporate premium dedicat serviciilor juridice. Design sobru și elegant care inspiră încredere, structurat pentru a prezenta clar ariile de practică și echipa, cu accent pe conversie și contact rapid.',
    image: '/photos/avocatdemo.png',
    link: 'https://avocatdemo.vercel.app/',
    tags: ['Legal', 'Corporate', 'Next.js', 'Professional UI'],
    category: 'Corporate',
    Icon: Scale,
  },
  {
    id: 2,
    title: 'Voltariss - Inginerie electricǎ',
    description: 'Platformă digitală High-Tech pentru servicii industriale. Design "Dark Mode" minimalist, animații fluide și optimizare SEO maximă pentru generarea de lead-uri locale.',
    image: '/photos/voltariss.png',
    link: 'https://voltariss.ro/',
    tags: ['Corporate website', 'Next.js', 'Industrial UI', 'Lead generation'],
    category: 'Corporate',
    Icon: PlugZap,
  },
  {
    id: 3,
    title: 'Aura - Cafenea',
    description: 'Studiu de caz pentru un brand premium ce combină atmosfera unei cafenele cu un magazin artizanal online, oferind o experiență unică utilizatorilor.',
    image: '/photos/auracafea.png',
    link: 'https://aura-cafea-demo.vercel.app/',
    tags: ['E-commerce', 'Branding', 'Next.js', 'Framer motion', 'UI/UX'],
    category: 'E-commerce',
    Icon: ShoppingBag,
  },
  {
    id: 4,
    title: 'Clinia dentarǎ - Servicii dentare',
    description: 'Website modern și profesional pentru o clinică dentară, construit cu Next.js și optimizat pentru conversii și experiența utilizatorilor.',
    image: '/photos/clinicadentara.png',
    link: 'https://demo-clinicadentara.vercel.app/',
    tags: ['Sănătate', 'Next.js', 'TypeScript', 'UI/UX'],
    category: 'Medical',
    Icon: Hospital,
  },
  {
    id: 5,
    title: 'Quantum - Landing page SaaS',
    description: 'Landing page custom cu animații 3D și interactivitate avansată, destinat unei platforme SaaS inovatoare pentru managementul proiectelor.',
    image: '/photos/quantum.png',
    link: 'https://quantum-demo-gamma.vercel.app/',
    tags: ['SaaS', 'Landing Page', 'Next.js', 'TypeScript'],
    category: 'SaaS',
    Icon: Layers,
  },
  {
    id: 6,
    title: 'Precision Auto - Service auto şi programări online',
    description: 'Website modern pentru un service auto, construit în Next.js, cu sistem de programări online, prezentare detaliată a serviciilor și design profesional.',
    image: '/photos/precisionauto.png',
    link: 'https://precision-auto-demo.vercel.app/',
    tags: ['Service Auto', 'Next.js', 'Booking', 'Prezentare'],
    category: 'Services',
    Icon: Car,
  },
  {
    id: 7,
    title: 'Pas cu Pas - Asistent AI',
    description: 'Un site integrat cu AI care oferă conversații empatice și suport pentru probleme precum depresia, singurătatea sau anxietatea. O inițiativă dedicată să aducă inteligența artificială mai aproape de oameni, în sprijinul comunității.',
    image: '/photos/pascupas3.png',
    link: 'https://www.pascupas.online/',
    tags: ['AI', 'Asistență', 'Conversație', 'Suport Emoțional'],
    category: 'AI',
    Icon: Bot,
  },
  {
    id: 8,
    title: 'ShopFlow Dashboard - Panou de control e-commerce',
    description: 'Dashboard interactiv pentru gestionarea magazinelor online, oferind analize detaliate, managementul comenzilor și optimizarea vânzărilor.',
    image: '/photos/dashboard-demo.png',
    link: 'https://dashboard-demo-eight.vercel.app/',
    tags: ['E-commerce', 'Dashboard', 'Analytics', 'Sales Management'],
    category: 'E-commerce',
    Icon: Database,
  },
];

const categories = ['Toate', 'Corporate', 'E-commerce', 'SaaS', 'AI', 'Medical', 'Services'];

export default function PortofoliuPage() {
  const [activeCategory, setActiveCategory] = useState('Toate');

  const filteredProjects = activeCategory === 'Toate'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <>
      <Head>
        <title>Portofoliu | Digitura</title>
        <meta
          name="description"
          content="Vezi proiectele Digitura: site-uri web, experiențe digitale și soluții creative care transformă ideile în realitate."
        />
      </Head>
      <Header />
      <main className="bg-slate-950 text-white font-exo2 min-h-screen">

        <section className="relative w-full py-32 px-6 text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-950 to-slate-950 pointer-events-none" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-4xl mx-auto"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-teal-500/10 text-teal-400 text-sm font-semibold mb-6 border border-teal-500/20">
              Portofoliu 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400" style={{ fontFamily: 'Ethnocentric, sans-serif', letterSpacing: 1 }}>
              Portofoliul nostru
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Explorăm limitele designului și tehnologiei pentru a crea experiențe digitale memorabile.
            </p>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === category
                  ? 'bg-teal-500 text-white border-teal-500 shadow-lg shadow-teal-500/25'
                  : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:border-teal-500/50 hover:text-white'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-32">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project) => {
                const IconComponent = project.Icon;
                return (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group relative bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-teal-500/30 transition-colors duration-300 flex flex-col h-full"
                  >
                    <div className="relative h-80 overflow-hidden">
                      <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700 ease-out"
                      />
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-4">
                        <span className="text-xs font-bold text-teal-500 uppercase tracking-wider mb-2 block">
                          {project.category}
                        </span>

                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors duration-300">
                            {project.title}
                          </h3>

                          <div className="shrink-0 bg-slate-800 p-2 rounded-lg border border-slate-700/50 text-teal-400 group-hover:border-teal-500/50 group-hover:text-teal-300 transition-all duration-300">
                            <IconComponent className="w-5 h-5" />
                          </div>
                        </div>

                      </div>

                      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium text-slate-300 bg-slate-800/50 px-2 py-1 rounded border border-slate-700/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between w-full px-4 py-3 bg-slate-800 hover:bg-teal-600 text-white rounded-xl transition-all duration-300 group/btn mt-auto"
                      >
                        <span className="font-medium text-sm">Vezi proiectul</span>
                        <ExternalLink size={16} className="transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        <section className="w-full py-24 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Ai o idee de proiect?
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
              Hai să transformăm viziunea ta în realitate. Contactează-ne pentru o discuție gratuită despre proiectul tău.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25 transform hover:-translate-y-1"
            >
              Începe un Proiect
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}