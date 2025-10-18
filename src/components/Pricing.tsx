'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Check, ArrowRight, ChevronDown, Target, Globe, ShoppingCart, Wrench, Layers, Sparkles, Zap, Shield } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const mainPlans = [
    {
  name: 'Lansare Rapidă',
  price: '999',
  cents: '99',
  subtitle: 'Intră online în 7 zile — fără bătăi de cap.',
  description: 'Ideal pentru <strong>freelanceri</strong> sau <strong>afaceri la început</strong>. Obții rapid o prezență online clară, gata să atragă clienți.',
  icon: <Target className="w-8 h-8" />,
  features: [
    'Site complet funcțional, într-o singură pagină',
    'Conținut clar și orientat pe conversie',
    'Formular de contact eficient, conectat direct la e-mailul tău',
    'Încărcare rapidă – sub 2 secunde',
    'Design responsive (mobil, tabletă, desktop)',
    '<strong>Bonus:</strong> 30 de zile de mentenanță și suport',
  ],
  ctaText: 'Pornește Acum',
  gradient: 'from-slate-600 via-slate-700 to-slate-800',
  iconGradient: 'from-teal-400 to-cyan-500',
  isPopular: false,
  savings: 'Economisești 300 lei',
},
  {
    name: 'Website + Branding',
    price: '2499',
    cents: '99',
    subtitle: 'Identitate vizuală completă și website profesionist.',
    description: 'Perfect pentru afaceri care vor o <strong>imagine clară</strong>, <strong>identitate coerentă</strong> și un <strong>website modern</strong> care inspiră încredere.',
    icon: <Globe className="w-8 h-8" />,
    features: [
      'Website complet de prezentare, fără limită de pagini prestabilită',
      'Design personalizat care reflectă brandul tău',
      'Branding complet – logo, culori și elemente vizuale coerente',
      'Optimizare SEO de bază pentru vizibilitate online',
      'Consultanță și ghidaj pe tot parcursul proiectului',
      '<strong>Bonus:</strong> 60 de zile de mentenanță și suport dedicate',
    ],
    ctaText: 'Construiește-ți Brandul',
    gradient: 'from-blue-600 via-cyan-600 to-teal-600',
    iconGradient: 'from-blue-400 to-cyan-400',
    isPopular: true,
    badge: { text: 'CEL MAI CĂUTAT' },
    savings: 'Economisești 700 lei',
  },
  {
  name: 'Motor E-Commerce',
  price: '4999',
  cents: '99',
  subtitle: 'Magazin online complet, gata să vândă din prima zi.',
  description: 'Transformă-ți afacerea într-un <strong>motor de vânzări automat</strong>, care <strong>lucrează pentru tine</strong> zi și noapte.',
  icon: <ShoppingCart className="w-8 h-8" />,
  features: [
  'Magazin online complet, pregătit de vânzare',
  'Design personalizat adaptat identității brandului tău',
  'Optimizare SEO tehnică de bază pentru produse și pagini',
  'Integrare plăți online, curieri și facturare automată',
  'Automatizări pentru comenzi, e-mailuri și stocuri',
  '<strong>Bonus:</strong> 90 de zile de suport și optimizare post-lansare',
],
  ctaText: 'Începe să Vinzi',
  gradient: 'from-emerald-600 via-green-600 to-lime-600',
  iconGradient: 'from-emerald-400 to-lime-400',
  isPopular: false,
  badge: { text: 'PENTRU PROFIT MAXIM' },
  savings: 'Economisești 1.000 lei',
  },
  {
    name: 'Soluție Personalizată',
    price: 'La cerere',
    cents: '',
    subtitle: 'Pentru idei care nu încap în cutii.',
    description: 'Ai o viziune unică sau o nevoie complexă? Construim o soluție digitală exact pe măsura ideii tale.',
    icon: <Layers className="w-8 h-8" />,
    features: [
        'Dezvoltare complet personalizată – fără limitări de funcționalitate',
        'Design și structură adaptate obiectivelor tale de business',
        'Scalabilitate reală – baza tehnică pregătită să crească oricât',
        'Integrare cu platforme, API-uri și automatizări avansate',
        'Comunicare directă cu dezvoltatorul pe tot parcursul proiectului',
        '<strong>Bonus:</strong> Suport tehnic dedicat după lansare',
    ],
    ctaText: 'Hai să Discutăm',
    gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
    iconGradient: 'from-violet-400 to-purple-400',
    isPopular: false,
    badge: { text: '100% CUSTOM' }
  },
];

const customServices = [
  {
    name: 'Mentenanță & Suport',
    price: 'de la 100 lei/lună',
    desc: 'Ne ocupăm de actualizări, securitate și backup-uri, astfel încât site-ul tău să funcționeze perfect, fără întreruperi.',
    icon: <Wrench className="w-6 h-6" />,
    features: [
      'Update-uri regulate pentru WordPress și pluginuri',
      'Backup automat zilnic și restaurare rapidă',
      'Monitorizare uptime și performanță 24/7',
      'Verificare lunară a securității și integrității datelor',
      'Suport tehnic pentru erori și optimizări minore',
      'Raport lunar cu statusul site-ului și recomandări'
    ]
  },
  {
    name: 'Automatizare Digitală',
    price: 'de la 200 lei/lună',
    desc: 'Transformă-ți site-ul într-un sistem care lucrează singur: colectează date, trimite notificări și economisește timp prețios.',
    icon: <Zap className="w-6 h-6" />,
    features: [
      'Automatizări pentru formulare – trimit leadurile direct în e-mail, Google Sheets sau CRM',
      'Notificări automate pe WhatsApp, Slack sau e-mail',
      'E-mailuri automate pentru cereri primite, coșuri abandonate sau confirmări',
      'Integrare cu platforme externe – Mailerlite, Airtable, Notion etc.',
      'Automatizări personalizate pentru procesele interne ale afacerii',
      'Setup, testare și documentație completă la livrare'
    ]
  },
  {
    name: 'Branding Vizual',
    price: '300 lei (one-time)',
    desc: 'Logo, paletă de culori și ghid vizual profesionist pentru orice tip de afacere.',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    name: 'Optimizare SEO',
    price: '300 lei (one-time)',
    desc: 'Analiză, meta tag-uri și structură semantică pentru poziționare mai bună în Google.',
    icon: <Target className="w-6 h-6" />,
  }
];

const faqs = [
  {
  question: 'Cât costă un site?',
  answer: 'Avem prețuri fixe pentru pachete standard: Landing Page – <strong class="text-white font-bold">999<sup class="font-light text-base">,99</sup> lei</strong>, Website de prezentare – <strong class="text-white font-bold">2499<sup class="font-light text-base">,99</sup> lei</strong>, Magazin online – <strong class="text-white font-bold">4999<sup class="font-light text-base">,99</sup> lei</strong>. Pentru proiecte complet personalizate, prețul se stabilește în funcție de complexitate.'
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

interface FaqItemProps {
  faq: {
    question: string;
    answer: string;
  };
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ faq, isOpen, onClick }) => (
  <div className="border-b border-slate-700/50 last:border-0">
    <button 
      onClick={onClick} 
      className="w-full flex justify-between items-start text-left group py-6 cursor-pointer"
    >
      <h3 className="text-lg font-semibold text-slate-100 group-hover:text-white transition-colors pr-4 leading-relaxed">
        {faq.question}
      </h3>
      <ChevronDown 
        className={`transform transition-all duration-300 text-slate-400 group-hover:text-teal-400 flex-shrink-0 mt-1 ${
          isOpen ? 'rotate-180 text-teal-400' : ''
        }`} 
      />
    </button>
    <div 
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-96 pb-6' : 'max-h-0'
      }`}
    >
      <p 
        className="text-slate-300 leading-relaxed text-base" 
        dangerouslySetInnerHTML={{ __html: faq.answer }}
      />
    </div>
  </div>
);

const Pricing: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const handlePlanClick = (e: React.MouseEvent<HTMLButtonElement>, planName: string) => {
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
    <section ref={sectionRef} id="preturi" className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden" style={{ fontFamily: 'Exo2, sans-serif' }}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-0 w-1 h-64 bg-gradient-to-b from-transparent via-teal-500/30 to-transparent"></div>
      <div className="absolute top-1/3 right-0 w-1 h-64 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-teal-400 text-sm font-semibold">Prețuri Transparente</span>
          </div>
          
          <h2 className="pricing-title text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight opacity-0">
            O <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 animate-gradient">
              Investiție
            </span>,<br className="hidden sm:block" /> Nu o Cheltuială
          </h2>
          
          <p className="pricing-subtitle text-lg md:text-xl text-slate-400 leading-relaxed opacity-0">
            Credem în parteneriate pe termen lung. De aceea, oferim pachete de o valoare excepțională 
            la început, pentru a crește <strong className="text-white">împreună</strong> cu afacerea ta.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {mainPlans.map((plan, index: number) => (
            <div
              key={plan.name}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`pricing-card relative group ${plan.isPopular ? 'lg:-mt-4 lg:mb-4' : ''} opacity-0`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className={`text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg
                    ${plan.isPopular ? 'bg-gradient-to-r from-teal-500 to-blue-500' : 
                    plan.name.includes('Personalizat') ? 'bg-gradient-to-r from-violet-500 to-purple-500' : 
                    'bg-gradient-to-r from-emerald-500 to-teal-500'}`}>
                    {plan.badge.text}
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`h-full rounded-2xl lg:rounded-3xl p-6 lg:p-8 flex flex-col transition-all duration-500 relative overflow-hidden
                ${plan.isPopular ? 'bg-slate-800/50 border-2 border-teal-500/50 shadow-2xl shadow-teal-500/20' : 
                'bg-slate-800/30 border-2 border-slate-700/50 hover:border-slate-600'}
                ${hoveredCard === index ? 'scale-105 shadow-2xl' : ''}`}
                style={{
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl lg:rounded-3xl`}></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${plan.gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {plan.icon}
                      </div>
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-white text-center mb-2">
                    {plan.name}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-slate-400 text-center text-sm mb-6 font-medium">
                    {plan.subtitle}
                  </p>

                  {/* Price */}
                  <div className="text-center mb-6">
                    {plan.price !== 'La cerere' ? (
                      <div>
                        <div className="flex items-start justify-center gap-1">
                          <span className="text-slate-400 text-sm mt-2">de la</span>
                          <span className="text-5xl lg:text-6xl font-black text-white">
                            {plan.price}
                          </span>
                          <div className="flex flex-col items-start">
                            <span className="text-2xl font-bold text-white">,{plan.cents}</span>
                            <span className="text-slate-400 text-xs">lei</span>
                          </div>
                        </div>
                        {plan.savings && (
                          <div className="mt-3 inline-flex items-center gap-1 bg-teal-500/10 border border-teal-500/20 rounded-full px-3 py-1">
                            <Zap className="w-3 h-3 text-teal-400" />
                            <span className="text-xs text-teal-400 font-semibold">
                              {plan.savings}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-4xl font-bold text-white py-4">
                        {plan.price}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p
                    className="text-slate-300 text-sm text-center mb-8 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: plan.description }}
                  />

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`p-1 rounded-full bg-gradient-to-br ${plan.iconGradient} flex-shrink-0 mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span 
                          className="text-slate-200 text-sm leading-relaxed" 
                          dangerouslySetInnerHTML={{ __html: feature }}
                        />
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={(e) => handlePlanClick(e, plan.name)}
                    className={`w-full font-bold px-6 py-4 rounded-xl transition-all duration-300 group/btn cursor-pointer
                      ${plan.isPopular
                        ? `bg-gradient-to-r ${plan.gradient} text-white shadow-lg hover:shadow-xl hover:scale-105`
                        : 'bg-slate-700 text-white hover:bg-slate-600'
                      }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {plan.ctaText}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Services Section */}
        <div className="custom-section mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-transparent to-blue-500/5 rounded-3xl"></div>
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 lg:p-14 border border-slate-700/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-left mb-12">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Construiește <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
                  pachetul perfect</span> pentru tine
                </h3>
                <p className="text-slate-300 text-lg lg:text-xl max-w-2xl">
                  Adaugă servicii extra — branding, SEO, mentenanță sau automatizări — ca să-ți transformi website-ul într-un instrument complet de business.
                </p>
              </div>

              <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
                {customServices.map((service) => (
                  <div
                    key={service.name}
                    className="custom-service bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-6 md:p-8 hover:border-teal-500/50 transition-all duration-300 hover:scale-105 group opacity-0"
                  >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                      <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                        <div className="text-white">{service.icon}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-xl text-white">{service.name}</h4>
                          <span className="text-teal-400 font-bold text-lg whitespace-nowrap ml-4">
                            {service.price}
                          </span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{service.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-semibold">Răspunsuri Clare</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
                Întrebări
              </span>{' '}
              Frecvente
            </h2>
            <p className="text-slate-400 text-lg">
              Tot ce trebuie să știi despre serviciile noastre
            </p>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-slate-700/50">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                faq={faq}
                isOpen={openFaq === index}
                onClick={() => handleFaqToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Pricing;