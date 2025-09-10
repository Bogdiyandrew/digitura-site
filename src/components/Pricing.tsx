'use client';

import React, { useEffect, useRef, useState, ReactElement } from 'react';
import { useRouter } from 'next/navigation'; // Importă useRouter
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; // Importă ScrollToPlugin
import { Check, ArrowRight, ChevronDown, Target, Globe, ShoppingCart, Palette, Zap, Wrench } from 'lucide-react';

// Înregistrează plugin-urile GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// Interfețe TypeScript
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
    subtitle: ' Intră online în 7 zile.',
    description: 'Soluția perfectă pentru a valida o idee, a lansa o campanie sau a promova un singur serviciu. Direct la țintă.',
    icon: <Target className="w-8 h-8 text-teal-400" />,
    features: [
      '1 Pagină de Impact (Landing Page)',
      'Design Optimizat pentru Conversie',
      'Formular de Contact/Lead-uri',
      'Viteză de Încărcare Fulger',
      '<strong>BONUS:</strong> <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">30 zile suport & update-uri gratuite</span>',
    ],
    ctaText: 'Lansează site-ul azi',
    gradient: 'from-slate-800/20 to-slate-900/20',
    border: 'border-slate-700',
    hover: 'hover:border-slate-500',
    isPopular: false,
  },
  {
    name: 'Partener Digital',
    price: '1999<sup class="text-3xl font-bold align-top -top-2 relative">,99</sup> lei',
    subtitle: 'Site complet pentru creștere.',
    description: 'Devino o prezență dominantă în nișa ta. Aceasta nu este o cheltuială, ci fundația digitală a afacerii tale.',
    icon: <Globe className="w-8 h-8 text-blue-400" />,
    features: [
      'Website Complet, Orientat spre Obiective',
      'Design Unic, 100% Personalizat',
      'Arhitectură de pagini flexibilă',
      'Optimizare SEO Avansată',
      'Consultanță Strategică Inclusă',
      '<strong>BONUS:</strong> <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">60 zile mentenanță + 1 automatizare CRM gratuită</span>',    ],
    ctaText: 'Crește-ți afacerea acum',
    gradient: 'from-blue-500/10 to-teal-500/10',
    border: 'border-blue-500/30',
    hover: 'hover:border-blue-400/60 hover:shadow-blue-400/20',
    isPopular: true,
    badge: { text: 'CEA MAI BUNĂ ALEGERE' }
  },
  {
    name: 'Motor E-Commerce',
    price: '3999<sup class="text-3xl font-bold align-top -top-2 relative">,99</sup> lei',
    subtitle: 'Vinde online fără bătăi de cap.',
    description: 'Soluția completă pentru a construi un brand de succes în e-commerce și a vinde la scară națională sau internațională.',
    icon: <ShoppingCart className="w-8 h-8 text-teal-400" />,
    features: [
        'Magazin Online Complet Funcțional',
        'Integrare Plăți & Curierat',
        'Management Ușor Produse & Comenzi',
        'Optimizare SEO pentru Produse',
        '<strong>BONUS:</strong> <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">90 zile suport + automatizare pentru comenzi</span>',
        '<strong>BONUS:</strong> <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">Automatizare & Eficiență</span>',
    ],
    ctaText: 'Începe să vinzi online',
    gradient: 'from-teal-500/10 to-green-500/10',
    border: 'border-teal-500/30',
    hover: 'hover:border-teal-400/60 hover:shadow-teal-400/20',
    isPopular: false,
    badge: { text: 'PENTRU PROFIT MAXIM' }
  },
];

const customServices: CustomService[] = [
    { name: 'Branding de Impact', price: '+150€', desc: 'O identitate vizuală care te face remarcat și de neuitat.', icon: <Palette className="w-6 h-6 text-teal-400" /> },
    { name: 'Automatizare & Eficiență', price: '+200€', desc: 'Sisteme care lucrează pentru tine, economisind timp și bani.', icon: <Zap className="w-6 h-6 text-blue-400" /> },
    { name: 'Mentenanță & Suport', price: 'de la 50€/lună', desc: 'Liniștea ta digitală. Ne ocupăm de update-uri, securitate și backup-uri.', icon: <Wrench className="w-6 h-6 text-teal-400" /> },
];

const faqs: FAQ[] = [
  {
  question: 'Cât costă un site?',
  answer: 'Avem prețuri fixe pentru pachete standard: Landing Page – <strong class="text-white font-bold">749<sup class="font-light text-base">,99</sup> lei</strong>, Website de prezentare – <strong class="text-white font-bold">1999<sup class="font-light text-base">,99</sup> lei</strong>, Magazin online – <strong class="text-white font-bold">3999<sup class="font-light text-base">,99</sup> lei</strong>. Fiecare pachet include un set clar de livrabile. Dacă ai nevoie de ceva în plus, discutăm separat.'
  },
  {
  question: 'Ce se întâmplă dacă vreau mai multe funcționalități?',
  answer: 'Pachetele standard acoperă nevoile celor mai multe proiecte. Dacă vrei funcții personalizate sau integrări speciale, îți facem o ofertă clară, separat.'
  },
  {
    question: 'Cât durează realizarea unui site?',
answer: 'În general, un landing page se face în 3–6 zile, un website de prezentare în 1–2 săptămâni, iar un magazin online poate dura mai mult. Totul depinde de complexitate și cât de repede avem materialele.'
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
  const router = useRouter(); // Inițializează router-ul

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
        gsap.fromTo('.pricing-title', { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.2)', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } });
        gsap.fromTo('.pricing-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }, delay: 0.3 });
        gsap.fromTo('.pricing-card', { opacity: 0, y: 80, scale: 0.9, rotationX: 15 }, { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 0.8, ease: 'back.out(1.1)', stagger: 0.2, scrollTrigger: { trigger: '.pricing-grid', start: 'top 70%', once: true }, delay: 0.5 });
        gsap.fromTo('.custom-service', { opacity: 0, x: -30, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: '.custom-section', start: 'top 75%', once: true } });
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
        <div className="pricing-grid mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {mainPlans.map((plan: MainPlan) => (
            <div
              key={plan.name}
              className={`pricing-card h-full rounded-2xl p-8 flex flex-col transition-all duration-300 bg-gradient-to-br ${plan.gradient} border-2 ${plan.border} ${plan.hover} hover:scale-105 shadow-xl hover:shadow-2xl backdrop-blur-sm opacity-0 ${
                plan.isPopular ? 'scale-105 border-blue-400/60 shadow-blue-400/20' : ''
              } ${plan.name === 'Motor E-Commerce' ? 'shadow-lg shadow-teal-500/10' : ''}`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-fit">
                  <span className={`text-white text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap ${plan.isPopular ? 'bg-gradient-to-r from-teal-500 to-blue-500' : 'bg-gradient-to-r from-teal-600 to-green-500'}`}>
                    {plan.badge.text}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-center mb-4 pt-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${plan.gradient} border ${plan.border}`}>
                  {plan.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white text-center">{plan.name}</h3>
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
                  className="custom-service bg-slate-800/80 border border-slate-600 rounded-xl p-6 hover:border-slate-500 transition-all duration-300 hover:scale-105 opacity-0"
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
