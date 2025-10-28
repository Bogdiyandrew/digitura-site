'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Check, ArrowRight, ChevronDown, Target, Globe, ShoppingCart, Wrench, Layers, Sparkles, Zap, Shield } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

type OldPrice = {
  lei: number;
  cents?: number;
};

type PricingPlan = {
  name: string;
  price: string;
  cents: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  features: string[];
  ctaText: string;
  gradient: string;
  iconGradient: string;
  isPopular: boolean;
  oldPrice?: OldPrice;
  savings?: string;
  badge?: { text: string };
};

const mainPlans: PricingPlan[] = [
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
  oldPrice: { lei: 1300 },
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
    oldPrice: { lei: 3199, cents: 99 },
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
  oldPrice: { lei: 5999, cents: 99 },
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
    price: 'de la 150 lei/lună',
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
    price: 'de la 300 lei/lună',
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
    price: '400 lei (one-time)',
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
    question: 'Dacă nu am toți banii acum, putem începe totuși?',
    answer: 'Da, desigur. Înțelegem că fiecare afacere are ritmul ei, așa că putem împărți plata în mai multe etape – de exemplu, un avans pentru începerea proiectului și restul la final. Important e să pornim și să construim ceva bun împreună, nu să te blochezi din cauza bugetului.'
  },
  {
    question: 'Cum iau legătura cu voi și cum se face plata?',
    answer: 'Pentru a lua legătura cu noi, poți merge la secțiunea <strong>Contact</strong> de pe site — acolo poți completa formularul sau ne poți suna direct. După ce discutăm detaliile proiectului, stabilim împreună modul de plată. În general, lucrăm cu un avans pentru pornirea proiectului, iar restul se achită la final, după livrare.'
  },
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
    answer: 'Ai <strong>30 de zile de suport gratuit</strong> pentru orice problemă tehnică sau întrebări. Dacă ai ales pachetul <strong>Website + Branding</strong>, primești <strong>60 de zile de suport</strong> gratuit, iar pentru pachetul <strong>Motor E-Commerce</strong> oferim <strong>90 de zile de suport</strong> fără costuri suplimentare. După această perioadă, poți continua cu un plan de mentenanță lunar sau suport la cerere, în funcție de nevoile tale.'
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
      className="w-full flex justify-between items-start text-left group py-4 sm:py-6 cursor-pointer hover:bg-slate-800/30 transition-colors duration-200 rounded-lg px-2 sm:px-0"
    >
      <h3 className="text-base sm:text-lg font-semibold text-slate-100 group-hover:text-white transition-colors pr-3 sm:pr-4 leading-relaxed">
        {faq.question}
      </h3>
      <ChevronDown
        className={`transform transition-all duration-300 text-slate-400 group-hover:text-teal-400 flex-shrink-0 mt-1 w-4 h-4 sm:w-5 sm:h-5 ${
          isOpen ? 'rotate-180 text-teal-400' : ''
        }`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-[500px] pb-4 sm:pb-6' : 'max-h-0'
      }`}
    >
      <p
        className="text-slate-300 leading-relaxed text-sm sm:text-base px-2 sm:px-0"
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

  const parsePlanPrice = (price: string, cents?: string): number | null => {
    const integerPart = price.replace(/[^\d]/g, '');
    if (!integerPart) {
      return null;
    }

    const base = Number(integerPart);
    if (Number.isNaN(base)) {
      return null;
    }

    const centsValue = cents
      ? Number(cents.replace(/[^\d]/g, '').padEnd(2, '0').slice(0, 2))
      : 0;

    return base + centsValue / 100;
  };

  const formatOldPrice = (oldPrice?: { lei: number; cents?: number }): string => {
    if (!oldPrice) {
      return '';
    }

    const centsValue = typeof oldPrice.cents === 'number' ? oldPrice.cents : 0;
    const decimals = centsValue > 0 ? 2 : 0;
    const value = oldPrice.lei + centsValue / 100;

    return value.toLocaleString('ro-RO', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <section ref={sectionRef} id="preturi" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden" style={{ fontFamily: 'Exo2, sans-serif' }}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-0 w-0.5 sm:w-1 h-48 sm:h-64 bg-gradient-to-b from-transparent via-teal-500/30 to-transparent"></div>
      <div className="absolute top-1/3 right-0 w-0.5 sm:w-1 h-48 sm:h-64 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
            <span className="text-teal-400 text-xs sm:text-sm font-semibold">Prețuri Transparente</span>
          </div>

          <h2 className="pricing-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight opacity-0 px-4 sm:px-0">
            O <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 animate-gradient">
              Investiție
            </span>,<br className="hidden sm:block" /> Nu o Cheltuială
          </h2>

          <p className="pricing-subtitle text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed opacity-0 px-4 sm:px-0">
            Credem în parteneriate pe termen lung. De aceea, oferim pachete de o valoare excepțională
            la început, pentru a crește <strong className="text-white">împreună</strong> cu afacerea ta.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-5 lg:gap-6 mb-20 px-2 sm:px-0">
          {mainPlans.map((plan, index: number) => {
            const priceValue = parsePlanPrice(plan.price, plan.cents);
            const oldPriceValue = plan.oldPrice
              ? plan.oldPrice.lei + ((plan.oldPrice.cents ?? 0) / 100)
              : null;
            const savingsAmount =
              oldPriceValue !== null && priceValue !== null
                ? Math.max(oldPriceValue - priceValue, 0)
                : null;
            const computedSavingsLabel =
              savingsAmount && savingsAmount >= 0.5
                ? `Economisești ${Math.round(savingsAmount).toLocaleString('ro-RO')} lei`
                : plan.savings;

            return (
            <div
              key={plan.name}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`pricing-card relative group ${plan.isPopular ? 'lg:-mt-4 lg:mb-4' : ''} opacity-0`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className={`text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full whitespace-nowrap shadow-lg
                    ${plan.isPopular ? 'bg-gradient-to-r from-teal-500 to-blue-500' :
                    plan.name.includes('Personalizat') ? 'bg-gradient-to-r from-violet-500 to-purple-500' :
                    'bg-gradient-to-r from-emerald-500 to-teal-500'}`}>
                    {plan.badge.text}
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`h-full rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 flex flex-col transition-all duration-300 relative overflow-hidden
                ${plan.isPopular ? 'bg-slate-800/50 border-2 border-teal-500/50 shadow-2xl shadow-teal-500/20' :
                'bg-slate-800/30 border-2 border-slate-700/50 hover:border-slate-600/80'}
                ${hoveredCard === index ? 'lg:scale-[1.03] shadow-2xl' : ''}`}
                style={{
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300 rounded-xl sm:rounded-2xl lg:rounded-3xl pointer-events-none`}></div>

                {/* Animated border glow effect */}
                <div className={`absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                  style={{
                    background: `linear-gradient(135deg, transparent 0%, ${plan.isPopular ? 'rgba(20, 184, 166, 0.1)' : 'rgba(71, 85, 105, 0.1)'} 50%, transparent 100%)`,
                    animation: 'shimmer 2s infinite'
                  }}
                ></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${plan.gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {plan.icon}
                      </div>
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center mb-2">
                    {plan.name}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-slate-400 text-center text-xs sm:text-sm mb-4 sm:mb-6 font-medium leading-relaxed px-2">
                    {plan.subtitle}
                  </p>

                  {/* Price */}
                  <div className="text-center mb-4 sm:mb-6">
                    {plan.price !== 'La cerere' ? (
                      <div>
                        {plan.oldPrice && (
                          <div className="flex justify-center mb-1 sm:mb-2">
                            <span className="text-slate-500/80 text-xs sm:text-sm font-semibold line-through decoration-2 decoration-rose-400/70">
                              {formatOldPrice(plan.oldPrice)} lei
                            </span>
                          </div>
                        )}
                        <div className="flex items-end justify-center gap-1">
                          <span className="text-slate-400 text-xs sm:text-sm mt-1 sm:mt-2">de la</span>
                          <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white">
                            {plan.price}
                          </span>
                          <div className="flex flex-col items-start">
                            <span className="text-xl sm:text-2xl font-bold text-white">,{plan.cents}</span>
                            <span className="text-slate-400 text-[10px] sm:text-xs">lei</span>
                          </div>
                        </div>
                        {(computedSavingsLabel || plan.savings) && (
                          <div className="mt-2 sm:mt-3 inline-flex items-center gap-1 bg-teal-500/10 border border-teal-500/20 rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1">
                            <span className="text-[10px] sm:text-xs text-teal-400 font-semibold">
                              {computedSavingsLabel || plan.savings}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-3xl sm:text-4xl font-bold text-white py-3 sm:py-4">
                        {plan.price}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p
                    className="text-slate-300 text-xs sm:text-sm text-center mb-6 sm:mb-8 leading-relaxed px-1"
                    dangerouslySetInnerHTML={{ __html: plan.description }}
                  />

                  {/* Features */}
                  <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3">
                        <div className={`p-0.5 sm:p-1 rounded-full bg-gradient-to-br ${plan.iconGradient} flex-shrink-0 mt-0.5`}>
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                        </div>
                        <span
                          className="text-slate-200 text-xs sm:text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: feature }}
                        />
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={(e) => handlePlanClick(e, plan.name)}
                    className={`w-full font-bold px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-300 group/btn cursor-pointer text-sm sm:text-base
                      ${plan.isPopular
                        ? `bg-gradient-to-r ${plan.gradient} text-white shadow-lg hover:shadow-xl hover:scale-[1.02] sm:hover:scale-105`
                        : 'bg-slate-700 text-white hover:bg-slate-600'
                      }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {plan.ctaText}
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Custom Services Section */}
        <div className="custom-section mb-16 sm:mb-20 relative px-2 sm:px-0">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-transparent to-blue-500/5 rounded-2xl sm:rounded-3xl"></div>
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-14 border border-slate-700/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-teal-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="text-center sm:text-left mb-8 sm:mb-12">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  Construiește <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
                  pachetul perfect</span> pentru tine
                </h3>
                <p className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto sm:mx-0">
                  Adaugă servicii extra — branding, SEO, mentenanță sau automatizări — ca să-ți transformi website-ul într-un instrument complet de business.
                </p>
              </div>

              <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {customServices.map((service) => (
                  <div
                    key={service.name}
                    className="custom-service bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:border-teal-500/50 transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 group opacity-0"
                  >
                    <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-3 sm:gap-4">
                      <div className="p-2.5 sm:p-3 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg sm:rounded-xl shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                        <div className="text-white">{service.icon}</div>
                      </div>
                      <div className="flex-1 w-full">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between mb-2 gap-1 sm:gap-2">
                          <h4 className="font-bold text-lg sm:text-xl text-white">{service.name}</h4>
                          <span className="text-teal-400 font-bold text-base sm:text-lg whitespace-nowrap">
                            {service.price}
                          </span>
                        </div>
                        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{service.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-2 sm:px-0 faq-section">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
              <span className="text-blue-400 text-xs sm:text-sm font-semibold">Răspunsuri Clare</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
                Întrebări
              </span>{' '}
              Frecvente
            </h2>
            <p className="text-slate-400 text-base sm:text-lg px-4 sm:px-0">
              Tot ce trebuie să știi despre serviciile noastre
            </p>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-slate-700/50">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
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

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </section>
  );
};

export default Pricing;
