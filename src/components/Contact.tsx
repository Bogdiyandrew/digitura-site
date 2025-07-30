'use client';

import React, { useRef, useState, useEffect, FormEvent, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Phone, Send, User, Building, Briefcase, Target, Globe, ShoppingCart, CheckCircle, AlertTriangle, X, Loader2, LucideIcon } from 'lucide-react';

// --- Interfețe TypeScript pentru claritate ---
interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

interface PricingPackage {
  id: string;
  name: string;
  icon: React.ReactElement;
}

interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

// --- Componenta pentru Notificări (Toast) ---
const ToastNotification: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Notificarea dispare automat după 5 secunde
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-gradient-to-r from-teal-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-orange-500';
  const Icon = isSuccess ? CheckCircle : AlertTriangle;

  return (
    <div className="fixed top-5 right-5 z-[100] w-full max-w-sm animate-slide-in-right">
      <div className={`flex items-center p-4 rounded-xl text-white ${bgColor} shadow-2xl`}>
        <Icon className="w-7 h-7 mr-3 flex-shrink-0" />
        <p className="flex-1 font-semibold text-base">{message}</p>
        <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

// --- Componenta Principală de Contact ---
const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' });
  
  const searchParams = useSearchParams();

  const pricingPackages: PricingPackage[] = [
    { id: 'lansare-rapida', name: 'Lansare Rapidă', icon: <Target className="w-6 h-6 mx-auto mb-2" /> },
    { id: 'partener-digital', name: 'Partener Digital', icon: <Globe className="w-6 h-6 mx-auto mb-2" /> },
    { id: 'motor-ecommerce', name: 'Motor E-Commerce', icon: <ShoppingCart className="w-6 h-6 mx-auto mb-2" /> },
  ];

  const contactItems: ContactItem[] = [
    { icon: Mail, label: 'Email', value: 'suport@digitura.ro', href: 'mailto:suport@digitura.ro' },
    { icon: Phone, label: 'WhatsApp & Telefon', value: '+40 750 488 329', href: 'https://wa.me/40750488329' },
  ];
  
  // Efect pentru animația de apariție la scroll
  useEffect(() => {
    const sectionElement = document.getElementById('contact');
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

  // Efect pentru a pre-selecta pachetul din URL
  useEffect(() => {
    const packageParam = searchParams.get('package');
    if (packageParam) {
      setSelectedPackage(decodeURIComponent(packageParam));
    }
  }, [searchParams]);

  // --- Funcția de trimitere a formularului (CORECȚIE MAJORĂ) ---
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault(); // Previne reîncărcarea paginii
    if (!selectedPackage) {
      setToast({ show: true, message: 'Te rugăm să selectezi un pachet.', type: 'error' });
      return;
    }
    
    setIsSending(true);

    if (!formRef.current) {
      setIsSending(false);
      return;
    }

    // 1. Extrage datele din formular într-un obiect simplu
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    
    // 2. Adaugă pachetul selectat în obiectul de date
    data.package = selectedPackage;

    try {
      // 3. Trimite datele către noua rută API în format JSON
      const response = await fetch('/api/send-email', { // <-- Aici este schimbarea critică!
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Convertim obiectul în string JSON
      });

      if (!response.ok) {
        // Dacă serverul returnează o eroare, o preluăm și o afișăm
        const errorData = await response.json();
        throw new Error(errorData.message || 'A apărut o eroare de la server.');
      }

      // Dacă totul a mers bine
      setToast({ show: true, message: 'Solicitare trimisă cu succes! Te vom contacta în curând.', type: 'success' });
      if (formRef.current) formRef.current.reset(); // Golește formularul
      setSelectedPackage(''); // Resetează pachetul selectat

    } catch (error) {
      console.error('Eroare la trimiterea formularului:', error);
      const errorMessage = error instanceof Error ? error.message : 'A apărut o eroare. Te rugăm să încerci din nou.';
      setToast({ show: true, message: errorMessage, type: 'error' });
    } finally {
      setIsSending(false); // Oprește indicatorul de încărcare
    }
  };

  // Funcție ajutătoare pentru a crea câmpurile de input
  const renderInputField = (name: string, placeholder: string, type: string, required: boolean, icon: LucideIcon) => {
    const Icon = icon;
    return (
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type={type} 
          name={name} 
          placeholder={placeholder} 
          required={required}
          className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl py-4 pl-12 pr-6 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/50 transition-all duration-300"
        />
      </div>
    );
  };

  return (
    <section 
      id="contact" 
      className="w-full py-24 md:py-32 bg-slate-950 text-white relative flex items-center justify-center overflow-hidden"
    >
      {toast.show && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}
      
      <div className="absolute inset-0 bg-grid-slate-800/[0.2]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>

      <div className="relative max-w-6xl mx-auto px-6 w-full z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Transformă Ideea în Realitatea vietii tale
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Alege pachetul, completează formularul sau contactează-ne direct. Suntem gata să construim împreună.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* --- Formularul --- */}
          <form 
            onSubmit={handleSubmit} 
            ref={formRef}
            className={`lg:col-span-3 bg-slate-900/50 backdrop-blur-lg rounded-2xl p-8 flex flex-col gap-6 shadow-2xl border border-slate-800 transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div>
              <h3 className="text-slate-200 font-semibold mb-4 text-lg">1. Alege Pachetul de Start</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {pricingPackages.map((pkg) => (
                  <button 
                    key={pkg.id} 
                    type="button" 
                    onClick={() => setSelectedPackage(pkg.name)}
                    className={`text-center p-4 border-2 rounded-xl transition-all duration-300 ${selectedPackage === pkg.name ? 'bg-teal-500/10 border-teal-400 scale-105' : 'bg-slate-800 border-slate-700 hover:border-slate-500'}`}
                  >
                    <div className={selectedPackage === pkg.name ? 'text-teal-300' : 'text-slate-400'}>{pkg.icon}</div>
                    <span className="font-bold block text-sm mt-1">{pkg.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-slate-200 font-semibold mb-4 text-lg">2. Completează Detaliile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderInputField('nume', 'Nume complet', 'text', true, User)}
                {renderInputField('company_name', 'Numele firmei', 'text', true, Building)}
                {renderInputField('email', 'Email de contact', 'email', true, Mail)}
                {renderInputField('phone', 'Telefon (Opțional)', 'tel', false, Phone)}
              </div>
            </div>

            <div>
              <h3 className="text-slate-200 font-semibold mb-4 text-lg">3. Spune-ne mai multe</h3>
              <div className="flex flex-col gap-4">
                {renderInputField('activity_field', 'Domeniul de activitate', 'text', true, Briefcase)}
                <textarea 
                  name="project_details" 
                  placeholder="Descrie pe scurt proiectul tău..." 
                  rows={4} 
                  required
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/50 transition-all duration-300 resize-none"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSending} 
              className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/30 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Se trimite...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Trimite Solicitarea</span>
                </>
              )}
            </button>
          </form>

          {/* --- Detalii de Contact Direct --- */}
          <div className={`lg:col-span-2 flex flex-col gap-6 transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-xl font-bold text-white text-center lg:text-left">Sau contactează-ne direct</h3>
            {contactItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="p-3 rounded-lg bg-slate-800">
                   <item.icon className="text-teal-400" size={24} />
                </div>
                <div>
                  <div className="text-slate-400 text-sm">{item.label}</div>
                  <div className="text-slate-100 font-semibold text-base">{item.value}</div>
                </div>
              </a>
            ))}
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
