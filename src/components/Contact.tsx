'use client';

import React, { useRef, useState, useEffect, FormEvent } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Mail, Phone, Send, User, Building, Briefcase, Target, Globe, ShoppingCart, CheckCircle, AlertTriangle, X, Loader2, LucideIcon, Calendar, CreditCard } from 'lucide-react';

// --- INTERFEȚE ---
interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

interface PricingPackage {
  id: string;
  name: string;
  icon: React.ReactElement;
  activeClass: string;
  textClass: string;
}

interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  color: 'teal' | 'blue';
}

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

// --- COMPONENTE MICI ---
const ToastNotification: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-gradient-to-r from-teal-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-orange-500';
  const Icon = isSuccess ? CheckCircle : AlertTriangle;

  return (
    <div className="fixed top-4 right-4 left-4 md:left-auto md:w-full md:max-w-sm z-[100] animate-slide-in-right">
      <div className={`flex items-center p-4 rounded-xl text-white ${bgColor} shadow-2xl`}>
        <Icon className="w-6 h-6 mr-3 flex-shrink-0" />
        <p className="flex-1 font-semibold text-sm md:text-base">{message}</p>
        <button onClick={onClose} className="ml-3 p-1 rounded-full hover:bg-white/20 transition-colors">
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

// --- COMPONENTA PRINCIPALĂ ---
const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [billingCycle, setBillingCycle] = useState<string>(''); 
  
  const [isSending, setIsSending] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' });

  const searchParams = useSearchParams();
  const router = useRouter();      
  const pathname = usePathname();  

  const pricingPackages: PricingPackage[] = [
    { 
      id: 'esential', 
      name: 'ESENTIAL', 
      icon: <Target className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 md:mb-2" />,
      activeClass: 'bg-slate-700/60 border-slate-400 shadow-[0_0_20px_rgba(148,163,184,0.2)]', 
      textClass: 'text-slate-200'
    },
    { 
      id: 'profesional', 
      name: 'PROFESIONAL', 
      icon: <Globe className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 md:mb-2" />,
      activeClass: 'bg-blue-600/20 border-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.25)]',
      textClass: 'text-blue-300'
    },
    { 
      id: 'e-commerce', 
      name: 'E-COMMERCE', 
      icon: <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 md:mb-2" />,
      activeClass: 'bg-emerald-600/20 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.25)]',
      textClass: 'text-emerald-300'
    },
  ];

  const contactItems: ContactItem[] = [
    { icon: Mail, label: 'Email', value: 'suport@digitura.ro', href: 'mailto:suport@digitura.ro', color: 'teal' },
    { icon: Phone, label: 'WhatsApp & telefon', value: '+40 750 488 329', href: 'https://wa.me/40750488329', color: 'blue' },
  ];

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    observer.observe(sectionElement);
    return () => observer.unobserve(sectionElement);
  }, []);

  useEffect(() => {
    const packageParam = searchParams.get('package');
    const billingParam = searchParams.get('billing');

    if (packageParam) {
      const decodedParam = decodeURIComponent(packageParam);
      const matchedPackage = pricingPackages.find(pkg =>
        pkg.id.toLowerCase() === decodedParam.toLowerCase() || 
        pkg.name.toLowerCase() === decodedParam.toLowerCase()
      );
      if (matchedPackage) setSelectedPackage(matchedPackage.name);
    }
    if (billingParam) setBillingCycle(billingParam);
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!selectedPackage) {
      setToast({ show: true, message: 'Te rugăm să selectezi un pachet.', type: 'error' });
      return;
    }
    if (!billingCycle) {
       setToast({ show: true, message: 'Te rugăm să selectezi tipul de plată.', type: 'error' });
       return;
    }

    setIsSending(true);
    if (!formRef.current) { setIsSending(false); return; }

    const formData = new FormData(formRef.current);
    const data: Record<string, any> = Object.fromEntries(formData.entries());
    data.package = selectedPackage;
    data.billing = billingCycle === 'monthly' ? 'Lunar (Abonament)' : 'Plată Unică';

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Eroare server.');

      setToast({ show: true, message: 'Solicitare trimisă cu succes!', type: 'success' });
      if (formRef.current) formRef.current.reset();
      setSelectedPackage('');
      setBillingCycle('');
      router.replace(pathname, { scroll: false });

    } catch (error) {
      setToast({ show: true, message: 'A apărut o eroare. Încearcă din nou.', type: 'error' });
    } finally {
      setIsSending(false);
    }
  };

  const togglePackage = (pkgName: string) => {
    if (selectedPackage === pkgName) {
      setSelectedPackage('');
      setBillingCycle('');
      router.replace(pathname, { scroll: false }); 
    } else {
      setSelectedPackage(pkgName);
      // Nu mai selectăm automat billing-ul
    }
  };

  const toggleBilling = (type: 'monthly' | 'onetime') => {
      if (billingCycle === type) {
          setBillingCycle(''); 
      } else {
          setBillingCycle(type); 
      }
  };

  const renderInputField = (name: string, placeholder: string, type: string, required: boolean, icon: LucideIcon) => {
    const Icon = icon;
    return (
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-400 transition-colors duration-300" size={18} />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl py-3 md:py-4 pl-11 pr-4 md:pl-12 md:pr-6 text-sm md:text-base text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50 transition-all duration-300"
        />
      </div>
    );
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full py-16 md:py-24 lg:py-32 bg-slate-950 text-white relative flex items-center justify-center overflow-hidden scroll-mt-20"
    >
      {toast.show && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}

      <div className="absolute inset-0 bg-grid-slate-800/[0.2]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full z-10">
        
        {/* Header Section */}
        <div className={`text-center mb-10 md:mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-teal-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Contacteazǎ-ne
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Alege pachetul, completează formularul sau contactează-ne direct.
          </p>
        </div>

        {/* Main Grid: Pe mobil 1 col, pe LG 5 col */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          
          {/* FORMULARUL */}
          <form
            onSubmit={handleSubmit}
            ref={formRef}
            className={`lg:col-span-3 bg-slate-900/50 backdrop-blur-lg rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col gap-5 md:gap-6 shadow-2xl border border-slate-800 transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* --- SECTIUNEA 1: PACHET + FACTURARE --- */}
            <div>
              <h3 className="text-slate-200 font-semibold mb-3 md:mb-4 text-base md:text-lg flex items-center gap-2">
                1. Configurare Pachet
              </h3>
              
              {/* Selectie Pachet - 2 coloane mobil, 3 tableta+ */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {pricingPackages.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => togglePackage(pkg.name)}
                    // AICI ESTE LOGICA PENTRU CENTRARE E-COMMERCE PE MOBIL (col-span-2)
                    className={`text-center p-2 sm:p-4 border-2 rounded-xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[90px] md:min-h-[110px] 
                      ${pkg.id === 'e-commerce' ? 'col-span-2 sm:col-span-1' : ''}
                      ${selectedPackage === pkg.name 
                        ? `${pkg.activeClass} scale-[1.02] md:scale-105 z-10` 
                        : 'bg-slate-800/80 border-slate-700/60 hover:border-slate-500 hover:bg-slate-800'
                    }`}
                  >
                    <div className={`${selectedPackage === pkg.name ? pkg.textClass : 'text-slate-400'} mb-1 md:mb-2`}>
                        {pkg.icon}
                    </div>
                    <span className={`font-bold text-[10px] sm:text-xs md:text-sm uppercase ${selectedPackage === pkg.name ? pkg.textClass : 'text-slate-300'}`}>
                        {pkg.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Selectie Billing */}
              <div className="grid grid-cols-2 gap-3">
                 <button
                    type="button"
                    onClick={() => toggleBilling('monthly')}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 p-3 rounded-xl border transition-all duration-300 font-semibold text-xs sm:text-sm cursor-pointer
                    ${billingCycle === 'monthly' 
                        ? 'bg-teal-500/10 border-teal-500 text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.15)]' 
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-slate-800'}`}
                 >
                    <Calendar className="w-4 h-4" />
                    <span>Abonament lunar</span>
                 </button>

                 <button
                    type="button"
                    onClick={() => toggleBilling('onetime')}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 p-3 rounded-xl border transition-all duration-300 font-semibold text-xs sm:text-sm cursor-pointer
                    ${billingCycle === 'onetime' 
                        ? 'bg-blue-500/10 border-blue-500 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:border-slate-600 hover:bg-slate-800'}`}
                 >
                    <CreditCard className="w-4 h-4" />
                    <span>Plată unicǎ</span>
                 </button>
              </div>
            </div>

            {/* --- SECTIUNEA 2: FORMULAR --- */}
            <div>
              <h3 className="text-slate-200 font-semibold mb-3 md:mb-4 text-base md:text-lg">2. Completează Detaliile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {renderInputField('nume', 'Nume complet', 'text', true, User)}
                {renderInputField('company_name', 'Numele firmei', 'text', true, Building)}
                {renderInputField('email', 'Email', 'email', true, Mail)}
                {renderInputField('phone', 'Telefon', 'tel', false, Phone)}
              </div>
            </div>

            {/* --- SECTIUNEA 3: MESAJ --- */}
            <div>
              <h3 className="text-slate-200 font-semibold mb-3 md:mb-4 text-base md:text-lg">3. Spune-ne mai multe</h3>
              <div className="flex flex-col gap-3 md:gap-4">
                {renderInputField('activity_field', 'Domeniul de activitate', 'text', true, Briefcase)}
                <div className="relative group">
                    <div className="absolute left-4 top-4 text-slate-400 group-focus-within:text-teal-400 transition-colors duration-300">
                        <Briefcase size={18} />
                    </div>
                    <textarea
                    name="project_details"
                    placeholder="Descrie pe scurt proiectul tău..."
                    rows={4}
                    required
                    className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl py-3 md:py-4 pl-11 md:pl-12 pr-4 text-sm md:text-base text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50 transition-all duration-300 resize-none"
                    />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full mt-2 bg-gradient-to-r from-teal-500 via-blue-500 to-cyan-500 text-white font-bold px-6 py-3 md:py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg transition-all duration-300 text-base md:text-lg hover:shadow-xl hover:shadow-teal-500/40 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSending ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Se trimite...</span>
                </>
              ) : (
                <>
                  <Send className="w-[18px] h-[18px] md:w-5 md:h-5" />
                  <span>Trimite solicitarea</span>
                </>
              )}
            </button>
          </form>

          {/* SIDEBAR - CONTACT DIRECT */}
          <div className={`lg:col-span-2 flex flex-col gap-4 md:gap-8 transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-xl md:text-2xl font-bold text-white text-center lg:text-left mt-4 lg:mt-0">Sau contactează-ne direct</h3>
            
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
                {contactItems.map((item) => {
                const Icon = item.icon;
                const isWhatsApp = item.label === 'WhatsApp & telefon';
                return (
                    <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex-1 flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] cursor-pointer ${isWhatsApp
                        ? 'bg-gradient-to-br from-blue-600/20 to-slate-800/30 border-2 border-blue-500/50 shadow-lg shadow-blue-500/10 hover:border-blue-400'
                        : 'bg-slate-800/30 border border-slate-700/30 hover:border-slate-500/50'
                        }`}
                    >
                    <div className={`p-2 md:p-3 rounded-full bg-${item.color}-500/10`}>
                        <Icon className={`text-${item.color}-400 group-hover:scale-110 transition-transform duration-300`} size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-slate-400 text-xs md:text-sm font-medium">{item.label}</div>
                        <div className="text-slate-200 font-semibold text-base md:text-lg truncate">{item.value}</div>
                    </div>
                    <Send size={16} className="text-slate-500 group-hover:text-teal-400 transition-all -rotate-45 group-hover:rotate-0 flex-shrink-0" />
                    </a>
                );
                })}
            </div>

            <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-slate-800/20 to-slate-900/20 backdrop-blur-sm border border-slate-700/30 text-center">
              <h4 className="text-lg md:text-xl font-bold mb-2 bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">
                Răspuns rapid
              </h4>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Timpul tău este prețios. Pentru un răspuns instant, 
                <a
                  href="https://api.whatsapp.com/send/?phone=40750488329&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 font-semibold block sm:inline sm:ml-1 mt-1 sm:mt-0 hover:underline"
                >
                  scrie-ne pe WhatsApp.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes slide-in-right { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .animate-slide-in-right { animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
        .bg-grid-slate-800\\[\\[0\\.2\\]] {
            background-image: linear-gradient(to right, rgba(203, 213, 225, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(203, 213, 225, 0.1) 1px, transparent 1px);
            background-size: 3rem 3rem;
        }
      `}</style>
    </section>
  );
};

export default Contact;