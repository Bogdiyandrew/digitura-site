'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Check, ArrowRight, ChevronDown, Target, Globe, ShoppingCart, Wrench, Calendar, CreditCard, Lightbulb } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}


type PricingMode = {
  price: string;
  cents: string;
  subtitle: string;
  description: string;
  features: string[];
  ctaText: string;
};

type PricingPlan = {
  id: string;
  name: string;
  icon: ReactNode;
  gradient: string;
  iconGradient: string;
  isPopular: boolean;
  badge?: { text: string };
  monthly: PricingMode;
  onetime: PricingMode;
};

const mainPlans: PricingPlan[] = [
  {
    id: 'esential',
    name: 'ESENTIAL',
    icon: <Target className="w-8 h-8" />,
    gradient: 'from-slate-600 via-slate-700 to-slate-800',
    iconGradient: 'from-teal-400 to-cyan-500',
    isPopular: false,
    monthly: {
      price: '350',
      cents: '00',
      subtitle: 'Firma ta arată profesionist și poate fi găsită ușor de clienți.',
      description: '',
      features: [
        'Prezență online clară, ușor de înțeles pentru clienți',
        'Pagină unică structurată pentru conversie și contact rapid',
        'Design profesional adaptat brandului tău',
        'Încărcare rapidă și experiență optimă pe mobil',
        'Vizibilitate locală prin Google Business Profile',
        '30 de zile suport pentru ajustări și întrebări'
      ],
      ctaText: 'Abonează-te acum'
    },
    onetime: {
      price: '2.000',
      cents: '',
      subtitle: 'Un website simplu care îți face firma vizibilă și credibilă online.',
      description: '',
      features: [
        'Prezență online clară, ușor de înțeles pentru clienți',
        'Pagină unică structurată pentru conversie și contact rapid',
        'Design profesional adaptat brandului tău',
        'Încărcare rapidă și experiență optimă pe mobil',
        'Vizibilitate locală prin Google Business Profile',
        '30 de zile suport pentru ajustări și întrebări'
      ],
      ctaText: 'Pornește acum'
    }
  },
  {
    id: 'profesional',
    name: 'PROFESIONAL',
    icon: <Globe className="w-8 h-8" />,
    gradient: 'from-blue-600 via-cyan-600 to-teal-600',
    iconGradient: 'from-blue-400 to-cyan-400',
    isPopular: true,
    badge: { text: 'BEST SELLER' },
    monthly: {
      price: '650',
      cents: '00',
      subtitle: 'Transformăm vizitatorii în cereri și contacte reale.',
      description: '',
      features: [
        '<strong>Tot ce e în Esential, plus:</strong>',
        'Structură gândită să transforme vizitatorii în clienți',
        'Pagini dedicate pentru servicii/produse',
        'Optimizare SEO pentru intenție comercială',
        'Monitorizare trafic și conversii (GA4 + Search Console)',
        'Raport lunar clar, pe înțelesul tău'
      ],
      ctaText: 'Vreau abonament pro'
    },
    onetime: {
      price: '5.000',
      cents: '',
      subtitle: 'Pentru firme care vor trafic, conversii și date reale despre clienți.',
      description: '',
      features: [
        '<strong>Include tot ce este în ESENTIAL, plus:</strong>',
        'Structură gândită să transforme vizitatorii în clienți',
        'Pagini dedicate pentru servicii/produse',
        'Optimizare SEO pentru intenție comercială',
        'Monitorizare trafic și conversii (GA4 + Search Console)',
        'Raport lunar clar, pe înțelesul tău'
      ],
      ctaText: 'Vreau website profesionist'
    }
  },
  {
    id: 'ecommerce',
    name: 'E-COMMERCE',
    icon: <ShoppingCart className="w-8 h-8" />,
    gradient: 'from-emerald-600 via-green-600 to-lime-600',
    iconGradient: 'from-emerald-400 to-lime-400',
    isPopular: false,
    badge: { text: 'PENTRU VÂNZĂRI' },
    monthly: {
      price: '1100',
      cents: '00',
      subtitle: 'Sistem complet de vânzare online, gata să producă comenzi.',
      description: '',
      features: [
        '<strong>Tot ce e în Profesional, plus:</strong>',
        'Vânzări online complet automatizate, fără bătăi de cap',
        'Gestionare simplă a stocurilor și comenzilor dintr-un singur dashboard',
        'Integrare cu curieri și facturare automată',
        'Comunicare rapidă cu clienții prin WhatsApp Business',
        'SEO pentru produse, ca să fii găsit exact când oamenii caută să cumpere'
      ],
      ctaText: 'Start vânzări'
    },
    onetime: {
      price: '12.500',
      cents: '',
      subtitle: 'Magazin online propriu, automatizat complet.',
      description: '',
      features: [
        '<strong>Tot ce e în Profesional, plus:</strong>',
        'Vânzări online complet automatizate, fără bătăi de cap',
        'Gestionare simplă a stocurilor și comenzilor dintr-un singur dashboard',
        'Integrare cu curieri și facturare automată',
        'Comunicare rapidă cu clienții prin WhatsApp Business',
        'SEO pentru produse, ca să fii găsit exact când oamenii caută să cumpere'
      ],
      ctaText: 'Începe să vinzi'
    }
  }
];

const customServices = [
  {
    name: 'Mentenanță și suport',
    price: 'de la 200 lei/lună',
    desc: 'Pentru clienții care aleg plata unică, asigurǎm mentenanța pentru afacerea ta',
    icon: <Wrench className="w-6 h-6" />,
  },
  {
    name: 'Soluții Custom & Optimizare',
    price: 'La cerere',
    desc: 'Ai nevoie de funcționalități extra? Doar spune-ne şi vom gǎsi soluția.',
    icon: <Lightbulb className="w-6 h-6" />,
  }
];

const faqs = [
  {
    question: 'Care este diferența dintre abonament și plată unică?',
    answer: 'La <strong>plata unică</strong> achiți site-ul complet de la bun început și proiectul îți aparține. <strong>Abonamentul</strong> este pentru cei care preferă să plătească o taxă lunară pentru serviciu, fără o investiție inițială mare.'
  },
  {
    question: 'Dacă nu am toți banii acum, putem începe totuși?',
    answer: 'Da, desigur. Poți alege varianta de <strong>abonament</strong> pentru a începe cu un cost minim, sau putem împărți <strong>plata unică</strong> în etape.'
  },
  {
    question: 'Există o perioadă contractuală minimă pentru abonament?',
    answer: 'Da, pentru varianta de abonament, perioada contractuală minimă este de <strong>3 luni</strong>.'
  },
  {
    question: 'Ce se întâmplă dacă vreau modificări?',
    answer: 'Dacǎ ai abonament sau pachet de mentenanțǎ, modificările minore sunt incluse. Pentru modificări majore sau funcționalități noi, se va face o estimare separată.'
  },
  {
    question: 'Pot trece de la abonament la platǎ unică ulterior?',
    answer: 'Sigur! Dacă la un moment dat dorești să achiziționezi site-ul integral și să oprești abonamentul, se poate calcula o sumă de "buy-out" (achiziție) în funcție de vechimea contractului.'
  },
  {
    question: 'Site-ul e optimizat pentru mobil și viteză?',
    answer: 'Da. Orice livrăm e responsive și testat pentru performanță. Viteză, UX, mobile — sunt standard, nu opțiuni extra.'
  },
  {
    question: 'Ce suport primesc după livrare?',
    answer: 'La abonament ai <strong>suport continuu</strong>. La plata unică, ai <strong>30-60 de zile suport gratuit</strong>, după care poți opta pentru mentenanță la cerere.'
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
      className="w-full flex justify-between items-start text-left group py-4 sm:py-6 cursor-pointer hover:bg-slate-800/30 transition-colors duration-200 rounded-lg px-2 sm:px-2"
    >
      <h3 className="text-base sm:text-lg font-semibold text-slate-100 group-hover:text-white transition-colors pr-3 sm:pr-4 leading-relaxed">
        {faq.question}
      </h3>
      <ChevronDown
        className={`transform transition-all duration-300 text-slate-400 group-hover:text-teal-400 flex-shrink-0 mt-1 w-4 h-4 sm:w-5 sm:h-5 ${isOpen ? 'rotate-180 text-teal-400' : ''
          }`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] pb-4 sm:pb-6' : 'max-h-0'
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
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'onetime'>('onetime');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handlePlanClick = (e: React.MouseEvent<HTMLButtonElement>, planName: string) => {
    e.preventDefault();
    const newUrl = `?package=${encodeURIComponent(planName)}&billing=${billingCycle}#contact`;
    router.push(newUrl, { scroll: false });
    gsap.to(window, {
      duration: 1.2,
      scrollTo: "#contact",
      ease: "power2.inOut",
    });
  };

  const toggleBilling = (cycle: 'monthly' | 'onetime') => {
    if (billingCycle === cycle) return;

    const cards = document.querySelectorAll('.pricing-card-content');
    gsap.to(cards, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      onComplete: () => {
        setBillingCycle(cycle);
        gsap.to(cards, { opacity: 1, y: 0, duration: 0.3, delay: 0.1 });
      }
    });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-title', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } });
      gsap.fromTo('.pricing-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }, delay: 0.2 });

      gsap.fromTo('.pricing-toggle',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }, delay: 0.3 }
      );

      gsap.fromTo('.pricing-card',
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15, scrollTrigger: { trigger: cardsRef.current, start: 'top 70%', once: true }, delay: 0.4 }
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
    <section ref={sectionRef} id="preturi" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden" style={{ fontFamily: 'Exo2, sans-serif' }}>
      <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-0 w-0.5 sm:w-1 h-48 sm:h-64 bg-gradient-to-b from-transparent via-teal-500/30 to-transparent"></div>
      <div className="absolute top-1/3 right-0 w-0.5 sm:w-1 h-48 sm:h-64 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">

          <h2 className="pricing-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight opacity-0 px-4 sm:px-0">
            Alege planul care ți se <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 animate-gradient">
              potrivește perfect
            </span>
          </h2>

          <p className="pricing-subtitle text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed opacity-0 px-4 sm:px-0 max-w-2xl mx-auto">
            Fie că preferi un <strong className="text-slate-200">abonament lunar</strong> cu totul inclus sau o <strong className="text-slate-200">plată unică</strong>, avem soluția ideală pentru stadiul afacerii tale.
          </p>
        </div>

        <div className="pricing-toggle flex justify-center mb-14 sm:mb-16 opacity-0 relative z-20">
          <div className="bg-slate-800/80 backdrop-blur-md p-1.5 rounded-full border border-slate-700 shadow-xl inline-flex relative">
            <div className={`absolute top-1.5 bottom-1.5 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 transition-all duration-300 ease-out shadow-lg ${billingCycle === 'monthly' ? 'left-1.5 w-[calc(50%-6px)]' : 'left-[50%] w-[calc(50%-6px)]'
              }`}></div>

            <button
              onClick={() => toggleBilling('monthly')}
              className={`relative z-10 px-6 sm:px-8 py-2.5 rounded-full text-sm sm:text-base font-bold transition-colors duration-300 flex items-center gap-2 cursor-pointer ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              <Calendar className="w-4 h-4" />
              Abonament
            </button>

            <button
              onClick={() => toggleBilling('onetime')}
              className={`relative z-10 px-6 sm:px-8 py-2.5 rounded-full text-sm sm:text-base font-bold transition-colors duration-300 flex items-center gap-2 cursor-pointer ${billingCycle === 'onetime' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              <CreditCard className="w-4 h-4" />
              Plată unicǎ
            </button>
          </div>

          <div className={`absolute -top-3 left-[calc(50%-130px)] sm:left-[calc(50%-150px)] transition-opacity duration-300 ${billingCycle === 'monthly' ? 'opacity-100' : 'opacity-0'}`}>
            <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg transform -rotate-6 block">
              Mentenanță inclusă
            </span>
          </div>
        </div>

        <div ref={cardsRef} className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-5 lg:gap-8 mb-20 px-2 sm:px-0 max-w-6xl mx-auto">
          {mainPlans.map((plan, index: number) => {
            const activeData = plan[billingCycle];

            let cardStyle = 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600/80';
            let shimmerColor = 'rgba(71, 85, 105, 0.1)';

            if (plan.id === 'profesional') {
              cardStyle = 'bg-slate-800/50 border-teal-500/50 shadow-2xl shadow-teal-500/20';
              shimmerColor = 'rgba(20, 184, 166, 0.1)';
            } else if (plan.id === 'ecommerce') {
              cardStyle = 'bg-slate-800/50 border-emerald-500/50 shadow-2xl shadow-emerald-500/20';
              shimmerColor = 'rgba(16, 185, 129, 0.1)';
            }

            return (
              <div
                key={plan.id}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`pricing-card relative group ${plan.isPopular ? 'lg:-mt-4 lg:mb-4' : ''} opacity-0`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className={`text-white text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full whitespace-nowrap shadow-lg
                    ${plan.id === 'profesional' ? 'bg-gradient-to-r from-teal-500 to-blue-500' : 'bg-gradient-to-r from-emerald-500 to-lime-500'}`}>
                      {plan.badge.text}
                    </div>
                  </div>
                )}

                <div className={`h-full rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 flex flex-col transition-all duration-300 relative overflow-hidden border-2
                ${cardStyle}
                ${hoveredCard === index ? 'lg:scale-[1.03] shadow-2xl' : ''}`}
                  style={{
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300 rounded-xl sm:rounded-2xl lg:rounded-3xl pointer-events-none`}></div>

                  <div className={`absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                    style={{
                      background: `linear-gradient(135deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
                      animation: 'shimmer 2s infinite'
                    }}
                  ></div>

                  <div className="pricing-card-content relative z-10 flex flex-col h-full">
                    <div className="flex justify-center mb-4 sm:mb-6">
                      <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${plan.gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {plan.icon}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center mb-2">
                      {plan.name}
                    </h3>

                    <p className="text-slate-400 text-center text-xs sm:text-sm mb-4 sm:mb-6 font-medium leading-relaxed px-2 min-h-[40px] flex items-center justify-center">
                      {activeData.subtitle}
                    </p>

                    <div className="text-center mb-6 sm:mb-8 min-h-[60px] flex flex-col justify-center">
                      {activeData.price !== 'La cerere' ? (
                        <div className="flex items-center justify-center text-white">


                          {billingCycle === 'onetime' && (
                            <span className="text-slate-400 text-xs sm:text-sm mr-2 font-medium">
                              de la
                            </span>
                          )}

                          <span className="text-5xl sm:text-6xl font-extrabold tracking-tight">
                            {activeData.price}
                          </span>
                          <div className="flex flex-col items-start ml-2 leading-none">
                            {activeData.cents && (
                              <span className="text-xl sm:text-2xl font-bold">,{activeData.cents}</span>
                            )}
                            <span className="text-slate-400 text-[10px] sm:text-xs uppercase font-medium mt-1">
                              {billingCycle === 'monthly' ? 'Lei / Lună' : 'Lei'}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-3xl sm:text-4xl font-bold text-white py-3 sm:py-4">
                          {activeData.price}
                        </div>
                      )}
                    </div>

                    <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                      {activeData.features.map((feature, i) => (
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

                    <button
                      onClick={(e) => handlePlanClick(e, plan.name)}
                      className={`w-full font-bold px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-300 group/btn cursor-pointer text-sm sm:text-base
                      ${plan.id === 'profesional' || plan.id === 'ecommerce'
                          ? `bg-gradient-to-r ${plan.gradient} text-white shadow-lg hover:shadow-xl hover:scale-[1.02] sm:hover:scale-105`
                          : 'bg-slate-700 text-white hover:bg-slate-600'
                        }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {activeData.ctaText}
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="custom-section mb-16 sm:mb-20 relative px-2 sm:px-0">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-transparent to-blue-500/5 rounded-2xl sm:rounded-3xl"></div>
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-14 border border-slate-700/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-teal-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="text-center mb-8 sm:mb-12">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  Construiește <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
                    pachetul perfect</span> pentru tine
                </h3>
              </div>

              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                {customServices.map((service) => (
                  <div
                    key={service.name}
                    className="custom-service bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-xl sm:rounded-2xl p-6 md:p-8 hover:border-teal-500/50 transition-all duration-300 hover:scale-[1.02] group opacity-0 flex flex-col h-full"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                        <div className="text-white">{service.icon}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xl text-white mb-1">{service.name}</h4>
                        <span className="text-teal-400 font-bold text-lg">{service.price}</span>
                      </div>
                    </div>

                    <p className="text-slate-300 leading-relaxed text-base">{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-2 sm:px-0 faq-section">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
                Întrebări
              </span>{' '}
              frecvente
            </h2>
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
      `}</style>
    </section>
  );
};

export default Pricing;