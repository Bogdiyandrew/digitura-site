'use client';

import React, { useEffect, useRef, useState, ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Check, ArrowRight, ChevronDown, Target, Globe, ShoppingCart, Wrench, Layers } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

interface Badge {
  text: string;
}

interface MainPlan {
  name: string;
  price: string;
  subtitle: string;
  description: string;
  icon: ReactElement;
  features: string[];
  ctaText: string;
  gradient: string;
  border: string;
  hover: string;
  isPopular: boolean;
  badge?: Badge;
}

interface CustomService {
  name: string;
  price: string;
  desc: string;
  icon: ReactElement;
}

interface FAQ {
  question: string;
  answer: string;
}

interface FaqItemProps {
  faq: FAQ;
  isOpen: boolean;
  onClick: () => void;
}

const mainPlans: MainPlan[] = [
  {
    name: 'Lansare Rapidă',
    price: '749<sup class="text-3xl font-bold align-top -top-2 relative">,99</sup> lei',
    subtitle: 'Intră online în 7 zile.',
    description: 'Perfect dacă vrei să-ți validezi o idee sau să prezinți un serviciu, fără complicații. Gata în câteva zile.',
    icon: <Target className="w-8 h-8 text-teal-400" />,
    features: [
      'Online și gata de clienți în câteva zile',
      'O singură pagină, clară și direct la subiect',
      'Formular de contact simplu și eficient',
      'Pagini care se încarcă în sub 2 secunde',
      '<strong>Bonus:</strong> 30 de zile de mentenanță și suport',
    ],
    ctaText: 'Începe Acum',
    gradient: 'from-slate-800/20 to-slate-900/20',
    border: 'border-slate-700',
    hover: 'hover:border-slate-500',
    isPopular: false,
  },
  {
    name: 'Partener Digital',
    price: '1999<sup class="text-3xl font-bold align-top -top-2 relative">,99</sup> lei',
    subtitle: 'Site complet pentru creștere.',
    description: 'Site-ul de care afacerea ta are nevoie pentru a arăta profesionist și a câștiga încrederea clienților.',
    icon: <Globe className="w-8 h-8 text-blue-400" />,
    features: [
      'O prezență online care inspiră încredere',
      'Design personalizat, care spune povestea brandului tău',
      'Structură flexibilă (până la 10 pagini incluse)',
      'Pregătit din start pentru a fi găsit pe Google (SEO de bază)',
      'Consultanță și ghidaj pe tot parcursul',
      '<strong>Bonus:</strong> 60 de zile de mentenanță și suport',
    ],
    ctaText: 'Alegerea Inteligentă',
    gradient: 'from-blue-500/10 to-teal-500/10',
    border: 'border-blue-500/30',
    hover: 'hover:border-blue-400/60 hover:shadow-blue-400/20',
    isPopular: true,
    badge: { text: 'CEA MAI BUNĂ ALEGERE' }
  },
  {
    name: 'Motor E-Commerce',
    price: '3999<sup class="text-3xl font-bold align-top -top-2 relative">,99</sup> lei',
    subtitle: 'Vinde online, fără bătăi de cap.',
    description: 'Lansăm magazinul tău online complet echipat, gata să primească comenzi și să proceseze plăți.',
    icon: <ShoppingCart className="w-8 h-8 text-teal-400" />,
    features: [
      'Un magazin online gata să vândă din prima zi',
      'Integrare plăți cu cardul și ramburs la livrare',
      'Panou de administrare ușor de folosit',
      'Configurare automată pentru firmele de curierat',
      '<strong>Bonus:</strong> 90 de zile de mentenanță și suport pentru magazin',
    ],
    ctaText: 'Începe să Vinzi',
    gradient: 'from-teal-500/10 to-green-500/10',
    border: 'border-teal-500/30',
    hover: 'hover:border-teal-400/60 hover:shadow-teal-400/20',
    isPopular: false,
    badge: { text: 'PENTRU PROFIT MAXIM' }
  },
  {
    name: 'Soluție Personalizată',
    price: 'La cerere',
    subtitle: 'Pentru idei care nu încap în cutii.',
    description: 'Dacă ai o viziune anume sau o nevoie complexă, construim de la zero o soluție digitală exact pe măsura ei.',
    icon: <Layers className="w-8 h-8 text-slate-400" />,
    features: [
        'Construim exact ce ai tu în minte, oricât de complex',
        'Funcționalități dezvoltate special pentru ideea ta',
        'O fundație tehnică solidă, care poate crește oricât de mult',
        'Comunicare directă cu dezvoltatorul proiectului',
        '<strong>Bonus:</strong> Suport tehnic dedicat după lansare',
    ],
    ctaText: 'Hai să Discutăm',
    gradient: 'from-slate-700/20 to-slate-800/20',
    border: 'border-slate-600',
    hover: 'hover:border-slate-400/80 hover:shadow-slate-400/10',
    isPopular: false,
    badge: { text: '100% CUSTOM' }
  },
];

const customServices: CustomService[] = [
    {
        name: 'Mentenanță & Suport',
        price: 'de la 150 lei/lună',
        desc: 'Liniștea ta digitală. Ne ocupăm de update-uri, securitate și backup-uri, asigurând funcționarea perfectă a site-ului tău.',
        icon: <Wrench className="w-6 h-6 text-teal-400" />
    },
];

const faqs: FAQ[] = [
  {
  question: 'Cât costă un site?',
  answer: 'Avem prețuri fixe pentru pachete standard: Landing Page – <strong class="text-white font-bold">749<sup class="font-light text-base">,99</sup> lei</strong>, Website de prezentare – <strong class="text-white font-bold">1999<sup class="font-light text-base">,99</sup> lei</strong>, Magazin online – <strong class="text-white font-bold">3999<sup class="font-light text-base">,99</sup> lei</strong>. Pentru proiecte complet personalizate, prețul se stabilește în funcție de complexitate.'
  },
  {
  question: 'Ce se întâmplă dacă vreau mai multe funcționalități?',
  answer: 'Pachetele standard acoperă nevoile celor mai multe proiecte. Dacă vrei funcții personalizate sau integrări speciale, pachetul "Soluție Personalizată" este perfect. Discutăm ideea și îți facem o ofertă clară.'
  },
  {
    question: 'Cât durează realizarea unui site?',
answer: 'În general, un landing page se face în 3–6 zile, un website de prezentare în 1–2 săptămâni, iar un magazin online poate dura mai mult. Un proiect custom variază ca durată, în funcție de complexitate.'
  },
  {
    question: 'Ce se întâmplă dacă vreau modificări?',
    answer: 'Discutăm, ajustăm și livrăm ce trebuie. Dacă vrei modificări majore după livrare, se facturează separat. Nu lăsăm lucrurile în aer, ne asigurăm că ești mulțumit.'
  },
  {
    question: 'Trebuie să am conținutul pregătit?',
  answer: 'Ideal, da — dar nu e obligatoriu. Te putem ajuta cu structură, texte (copywriting), imagini și chiar materiale vizuale. Dacă ai nevoie, ne ocupăm și de logo sau identitate vizuală. Venim cu soluții, nu cu probleme.'
  },
  {
    question: 'Site-ul e optimizat pentru mobil și viteză?',
    answer: 'Da. Orice livrăm e responsive și testat pentru performanță. Viteză, UX, mobile — sunt standard, nu opțiuni extra.'
  },
  {
  question: 'Voi putea face modificări singur după lansare?',
  answer: 'Modificările se fac prin noi, ca să fie totul rapid, curat și fără erori. De asta oferim și pachete de mentenanță — actualizăm texte, imagini, pagini sau funcționalități, fără stres pentru tine. Dacă vrei, îți oferim și tot proiectul codat, ca să ai libertate totală și să poți lucra cu oricine în viitor.'
  },
  {
    question: 'Ce suport primesc după livrare?',
    answer: 'Ai 30 de zile de suport gratuit pentru orice problemă tehnică sau întrebări. După, poți alege un plan de mentenanță lunar sau suport la cerere.'
  }
];

const FaqItem: React.FC<FaqItemProps> = ({ faq, isOpen, onClick }) => (
  <div className="border-b border-slate-700 py-4">
    <button onClick={onClick} className="w-full flex justify-between items-center text-left group cursor-pointer">
      <h3 className="text-lg font-medium text-slate-100 group-hover:text-white transition-colors">{faq.question}</h3>
      <ChevronDown className={`transform transition-all duration-300 text-slate-400 group-hover:text-teal-400 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
      <p className="text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
    </div>
  </div>
);

const Pricing: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const handlePlanClick = (e: React.MouseEvent<HTMLAnchorElement>, planName: string) => {
    e.preventDefault();
    const newUrl = `?package=${encodeURIComponent(planName)}#contact`;
    router.push(newUrl, { scroll: false });
    gsap.to(window, {
      duration: 1.2,
      scrollTo: "#contact",
      ease: "power2.inOut",
    });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ctx = gsap.context(() => {
        gsap.fromTo('.pricing-title', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } });
        gsap.fromTo('.pricing-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }, delay: 0.2 });
        gsap.fromTo('.pricing-card',
          { opacity: 0, x: -80 }, 
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15, scrollTrigger: { trigger: '.pricing-grid', start: 'top 70%', once: true }, delay: 0.4 }
        );
        gsap.fromTo('.custom-service', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: '.custom-section', start: 'top 75%', once: true } });
        gsap.fromTo('.faq-item', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: '.faq-section', start: 'top 80%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleFaqToggle = (index: number): void => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="preturi" className="py-28 bg-slate-900 relative overflow-hidden" style={{ fontFamily: 'Exo2, sans-serif' }}>
      <div className="absolute top-0 left-0 w-64 h-64 bg-teal-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="pricing-title text-4xl sm:text-5xl font-bold text-white opacity-0">
            O <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">Investiție</span>, Nu o Cheltuială.
          </h2>
          <p className="pricing-subtitle mt-6 text-lg md:text-xl text-slate-300 opacity-0">
            Credem în parteneriate pe termen lung. De aceea, oferim pachete de o valoare excepțională la început, pentru a crește <strong>împreună</strong> cu afacerea ta.
          </p>
        </div>
        <div className="pricing-grid mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {mainPlans.map((plan: MainPlan) => (
            <div
              key={plan.name}
              className={`pricing-card h-full rounded-2xl p-8 flex flex-col transition-all duration-300 bg-gradient-to-br ${plan.gradient} border-2 ${plan.border} ${plan.hover} hover:scale-105 shadow-xl hover:shadow-2xl backdrop-blur-sm opacity-0 ${
                plan.isPopular ? 'scale-105 border-blue-400/60 shadow-blue-400/20' : ''
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-fit">
                  <span className={`text-white text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap ${plan.isPopular ? 'bg-gradient-to-r from-teal-500 to-blue-500' : (plan.name.includes('Personalizat') ? 'bg-slate-600' : 'bg-gradient-to-r from-teal-600 to-green-500')}`}>
                    {plan.badge.text}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-center mb-4 pt-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${plan.gradient} border ${plan.border}`}>
                  {plan.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white text-center h-16 flex items-center justify-center">{plan.name}</h3>
              <p className="text-slate-400 text-center mt-2 font-medium h-10">{plan.subtitle}</p>
              <div className="text-5xl font-extrabold text-white text-center my-6" dangerouslySetInnerHTML={{ __html: plan.price }} />
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="text-teal-400 w-5 h-5 flex-shrink-0 mt-1" />
                    <span className="text-slate-200 text-sm" dangerouslySetInnerHTML={{ __html: feature }}></span>
                  </li>
                ))}
              </ul>

              <a
                href={`?package=${encodeURIComponent(plan.name)}#contact`}
                onClick={(e) => handlePlanClick(e, plan.name)}
                className={`block text-center w-full mt-auto font-semibold px-6 py-4 rounded-xl transition-all duration-300 group cursor-pointer` +
                  (plan.isPopular
                    ? ' bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:scale-105 shadow-lg hover:shadow-teal-400/30'
                    : ' bg-slate-800 text-white hover:bg-slate-700 border border-slate-600 hover:border-slate-500')
                }
              >
                <span className="flex items-center justify-center gap-2">
                  {plan.ctaText}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </div>
          ))}
        </div>
        <div
          className="custom-section mt-24 bg-slate-800/50 rounded-2xl p-8 md:p-12 border border-slate-700 relative overflow-hidden"
          style={{ backgroundImage: `url('/services/sectionphoto.png')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay' }}
        >
          <div className="absolute inset-0 bg-slate-800/60 rounded-2xl z-0"></div>
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Construiește Pachetul <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">Perfect</span>
              </h3>
              <p className="text-slate-300 text-lg">
                Adaugă servicii extra pentru a-ți transforma viziunea în realitate.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {customServices.map((service: CustomService) => (
                <div
                  key={service.name}
                  className="custom-service bg-slate-800/80 border border-slate-600 rounded-xl p-6 hover:border-slate-500 transition-all duration-300 hover:scale-105 opacity-0 md:col-start-2"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-slate-700 rounded-lg">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{service.name}</h4>
                      <span className="text-teal-400 font-bold text-lg">{service.price}</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="faq-section mt-28 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
              Întrebări
            </span> Frecvente
          </h2>
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
            {faqs.map((faq: FAQ, index: number) => (
              <div key={index} className="faq-item opacity-0">
                <FaqItem
                  faq={faq}
                  isOpen={openFaq === index}
                  onClick={() => handleFaqToggle(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;