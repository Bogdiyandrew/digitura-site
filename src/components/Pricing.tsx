'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Check,
  ArrowRight,
  ChevronDown,
  Target,
  Globe,
  ShoppingCart,
  Calendar,
  CreditCard,
  Info
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type PricingMode = {
  price: string;
  cents: string;
  subtitle: string;
  features: string[];
};

type PricingPlan = {
  id: string;
  name: string;
  icon: ReactNode;
  gradient: string;
  iconGradient: string;
  isPopular: boolean;
  monthly: PricingMode;
  onetime: PricingMode;
};

const esentialFeatures = [
  'O pagină de prezentare (landing page)',
  'Adaptată pentru telefon și desktop',
  'Elemente de contact (formular, WhatsApp sau apel)',
  'Configurare și indexare în Google (Search Console)'
];

const profesionalFeatures = [
  'Include tot ce este în pachetul Esențial',
  'Pagini separate pentru servicii sau produse',
  'Configurare Google Business Profile',
  'Email profesional pe domeniul tău',
  'Configurare Google Analytics (GA4)',
  'Optimizare SEO de bază pentru paginile principale'
];

const ecommerceFeatures = [
  'Include tot ce este în pachetul Profesional',
  'Magazin online pregătit pentru vânzare',
  'Administrare produse, comenzi și stocuri dintr-un singur panou',
  'Integrare cu plăți online, livrare și facturare',
  'Optimizare SEO pentru produse și categorii'
];

const mainPlans: PricingPlan[] = [
  {
    id: 'esential',
    name: 'ESENȚIAL',
    icon: <Target className="w-8 h-8" />,
    gradient: 'from-slate-600 via-slate-700 to-slate-800',
    iconGradient: 'from-teal-400 to-cyan-500',
    isPopular: false,
    monthly: {
      price: '300',
      cents: '00',
      subtitle: 'Pentru afaceri care au nevoie de o prezență online simplă și profesionistă.',
      features: esentialFeatures
    },
    onetime: {
      price: '2.000',
      cents: '',
      subtitle: 'Pentru afaceri care au nevoie de o prezență online simplă și profesionistă.',
      features: esentialFeatures
    }
  },
  {
    id: 'profesional',
    name: 'PROFESIONAL',
    icon: <Globe className="w-8 h-8" />,
    gradient: 'from-blue-600 via-cyan-600 to-teal-600',
    iconGradient: 'from-blue-400 to-cyan-400',
    isPopular: true,
    monthly: {
      price: '500',
      cents: '00',
      subtitle: 'Pentru afaceri care au nevoie de un site complet, cu o prezentare clară și mai mult spațiu pentru informațiile importante.',
      features: profesionalFeatures
    },
    onetime: {
      price: '5.000',
      cents: '',
      subtitle: 'Pentru afaceri care au nevoie de un site complet, cu o prezentare clară și mai mult spațiu pentru informațiile importante.',
      features: profesionalFeatures
    }
  },
  {
    id: 'ecommerce',
    name: 'E-COMMERCE',
    icon: <ShoppingCart className="w-8 h-8" />,
    gradient: 'from-emerald-600 via-green-600 to-lime-600',
    iconGradient: 'from-emerald-400 to-lime-400',
    isPopular: false,
    monthly: {
      price: '1000',
      cents: '00',
      subtitle: 'Pentru afaceri care vor să vândă online printr-un magazin web.',
      features: ecommerceFeatures
    },
    onetime: {
      price: '10.000',
      cents: '',
      subtitle: 'Pentru afaceri care vor să vândă online printr-un magazin web.',
      features: ecommerceFeatures
    }
  }
];

const faqs = [
  {
    question: 'Care este diferența dintre abonament și plată unică?',
    answer:
      'La <strong>plata unică</strong>, achiți proiectul de la început și site-ul îți aparține după livrare. <strong>Abonamentul</strong> este potrivit dacă vrei un cost lunar, fără o investiție inițială mare, cu suport și mentenanță incluse.'
  },
  {
    question: 'Există o perioadă contractuală minimă pentru abonament?',
    answer: 'Da. Pentru varianta de abonament, perioada minimă contractuală este de <strong>3 luni</strong>.'
  },
  {
    question: 'Ce se întâmplă dacă vreau modificări?',
    answer:
      'Dacă ai abonament sau mentenanță activă, modificările minore sunt incluse. Pentru modificări mai ample sau funcționalități noi, facem o estimare separată.'
  },
  {
    question: 'Pot trece de la abonament la plată unică ulterior?',
    answer:
      'Da. Dacă vrei să achiziționezi site-ul integral și să oprești abonamentul, putem calcula o sumă de achiziție în funcție de perioada deja parcursă.'
  },
  {
    question: 'Site-ul este optimizat pentru mobil și viteză?',
    answer:
      'Da. Toate proiectele sunt realizate responsive și optimizate pentru performanță, astfel încât să funcționeze bine pe mobil, desktop și tabletă.'
  },
  {
    question: 'Ce suport primesc după livrare?',
    answer:
      'La abonament ai <strong>suport continuu</strong> și mentenanță inclusă. La plata unică, ai <strong>30 de zile suport gratuit</strong>, după care poți opta pentru mentenanță separată.'
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
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'onetime'>('monthly');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
      gsap.fromTo(
        '.pricing-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      );

      gsap.fromTo(
        '.pricing-subtitle',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          delay: 0.2
        }
      );

      gsap.fromTo(
        '.pricing-toggle',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
          delay: 0.35
        }
      );

      gsap.fromTo(
        '.pricing-card',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 70%', once: true },
          delay: 0.4
        }
      );

      gsap.fromTo(
        '.faq-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.faq-section', start: 'top 80%', once: true }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleFaqToggle = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="preturi"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
      style={{ fontFamily: 'Exo2, sans-serif' }}
    >
      <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />
      <div className="absolute top-1/2 left-0 w-0.5 sm:w-1 h-48 sm:h-64 bg-gradient-to-b from-transparent via-teal-500/30 to-transparent" />
      <div className="absolute top-1/3 right-0 w-0.5 sm:w-1 h-48 sm:h-64 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
          <h2 className="pricing-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight opacity-0 px-4 sm:px-0">
            Două moduri de a lucra <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 animate-gradient">
              cu noi
            </span>
          </h2>

          <p className="pricing-subtitle text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed opacity-0 px-4 sm:px-0 max-w-2xl mx-auto">
          Îți punem la dispoziție <strong className="text-slate-200">două opțiuni de plată </strong> 
        adaptate pentru <strong className="text-slate-200">proiectul tău</strong>.
      </p>
        </div>

        <div className="pricing-toggle flex justify-center mb-10 sm:mb-16 opacity-0 relative z-20">
          <div className="bg-slate-800/80 backdrop-blur-md p-1.5 rounded-full border border-slate-700 shadow-xl inline-flex relative">
            <div
              className={`absolute top-1.5 bottom-1.5 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 transition-all duration-300 ease-out shadow-lg ${
                billingCycle === 'monthly'
                  ? 'left-1.5 w-[calc(50%-6px)]'
                  : 'left-[50%] w-[calc(50%-6px)]'
              }`}
            />

            <button
              onClick={() => toggleBilling('monthly')}
              className={`relative z-10 px-6 sm:px-8 py-2.5 rounded-full text-sm sm:text-base font-bold transition-colors duration-300 flex items-center gap-2 cursor-pointer ${
                billingCycle === 'monthly' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Abonament
            </button>

            <button
              onClick={() => toggleBilling('onetime')}
              className={`relative z-10 px-6 sm:px-8 py-2.5 rounded-full text-sm sm:text-base font-bold transition-colors duration-300 flex items-center gap-2 cursor-pointer ${
                billingCycle === 'onetime' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              Plată unică
            </button>
          </div>
        </div>

        {/* --- AICI ESTE MODIFICAREA PRINCIPALĂ PENTRU RESPONSIVITATE --- */}
        <div className="relative w-full max-w-6xl mx-auto">
          {/* Un indicator vizual subtil pe mobil că poți face swipe */}
          <div className="md:hidden text-center text-slate-500 text-xs mb-3 animate-pulse">
            ← Glisează pentru a vedea pachetele →
          </div>

          <div
            ref={cardsRef}
            className="pricing-grid flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-4 md:gap-5 lg:gap-8 mb-8 pb-6 md:pb-0 px-4 md:px-0 -mx-4 md:mx-0 hide-scrollbar"
          >
            {mainPlans.map((plan, index) => {
              const activeData = plan[billingCycle];

              let cardStyle =
                'bg-slate-800/30 border-slate-700/50 hover:border-slate-600/80';
              let shimmerColor = 'rgba(71, 85, 105, 0.1)';

              if (plan.id === 'profesional') {
                cardStyle =
                  'bg-slate-800/50 border-teal-500/50 shadow-2xl shadow-teal-500/20';
                shimmerColor = 'rgba(20, 184, 166, 0.1)';
              } else if (plan.id === 'ecommerce') {
                cardStyle =
                  'bg-slate-800/35 border-emerald-500/30 hover:border-emerald-500/45';
                shimmerColor = 'rgba(16, 185, 129, 0.05)';
              }

              return (
                <div
                  key={plan.id}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`pricing-card relative group flex-shrink-0 w-[85vw] sm:w-[320px] md:w-auto snap-center opacity-0 ${
                    plan.isPopular ? 'lg:-mt-4 lg:mb-4' : ''
                  }`}
                >
                  <div
                    className={`h-full rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 flex flex-col transition-all duration-300 relative overflow-hidden border-2 ${cardStyle} ${
                      hoveredCard === index ? 'lg:scale-[1.03] shadow-2xl' : ''
                    }`}
                    style={{ backdropFilter: 'blur(20px)' }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300 rounded-xl sm:rounded-2xl lg:rounded-3xl pointer-events-none`}
                    />

                    <div
                      className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
                        animation: 'shimmer 2s infinite'
                      }}
                    />

                    <div className="pricing-card-content relative z-10 flex flex-col h-full">
                      <div className="flex justify-center mb-4 sm:mb-6">
                        <div
                          className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${plan.gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
                        >
                          <div className="text-white">{plan.icon}</div>
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center mb-2">
                        {plan.name}
                      </h3>

                      <p className="text-slate-400 text-center text-xs sm:text-sm mb-4 sm:mb-6 font-medium leading-relaxed px-2 min-h-[64px] flex items-center justify-center">
                        {activeData.subtitle}
                      </p>

                      <div className="text-center mb-6 sm:mb-8 min-h-[60px] flex flex-col justify-center">
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
                              <span className="text-xl sm:text-2xl font-bold">
                                ,{activeData.cents}
                              </span>
                            )}
                            <span className="text-slate-400 text-[10px] sm:text-xs uppercase font-medium mt-1">
                              {billingCycle === 'monthly' ? 'Lei / Lună' : 'Lei'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                        {activeData.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 sm:gap-3">
                            <div
                              className={`p-0.5 sm:p-1 rounded-full bg-gradient-to-br ${plan.iconGradient} flex-shrink-0 mt-0.5`}
                            >
                              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                            </div>
                            <span
                              className="text-slate-200 text-xs sm:text-sm leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: feature }}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* --- SFÂRȘIT MODIFICARE --- */}

        <div className="text-center mb-16 sm:mb-20">
          <p className="text-red-400 text-sm sm:text-base mb-5">
             Prețurile afișate sunt orientative și variază în funcție de cerințele proiectului.
            După o discuție, îți putem face oferta finală.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base sm:text-lg font-semibold text-slate-950 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
          >
            Discută cu noi
            <ArrowRight className="w-4 h-4" />
          </button>
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
        /* Ascunde scrollbar-ul pentru un design curat pe mobil */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
};

export default Pricing;