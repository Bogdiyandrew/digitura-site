'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Search, Activity, Target, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import gsap from 'gsap';

export default function AuditClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Stările pentru formular
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    goals: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2 }
      ).fromTo(
        formRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1 },
        "-=0.8"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Construim payload-ul exact cum îl așteaptă route.ts-ul tău
    const payload = {
      nume: formData.name,
      email: formData.email,
      package: "Audit Gratuit", // Hardcodăm pachetul pentru a trece de validarea de pe server
      project_details: `Website de auditat: ${formData.website}\n\nCe dorește să îmbunătățească:\n${formData.goals || 'Nu a specificat detalii suplimentare.'}`,
    };

    try {
      // ATENȚIE: Asigură-te că '/api/contact' este calea corectă către route.ts-ul tău
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ceva nu a mers bine.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', website: '', goals: '' }); // Resetăm formularul
    } catch (error: any) {
      console.error('Eroare trimitere formular:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Eroare la trimiterea mesajului. Te rugăm să încerci din nou.');
    }
  };

  return (
    <main 
      ref={containerRef} 
      className="relative min-h-screen bg-slate-950 text-white pt-32 pb-24 overflow-hidden"
      style={{ fontFamily: 'Exo2, sans-serif' }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(20,184,166,0.05) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Header Secțiune */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-teal-400/30 bg-teal-500/10 px-5 py-2.5 text-sm font-medium text-teal-200 backdrop-blur-sm">
            <Search size={16} />
            <span>Analiză detaliată și personalizată</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-white to-blue-400 drop-shadow-lg leading-tight">
            Audit Gratuit pentru <br className="hidden md:block" /> Site-ul Tău
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Identificăm problemele de performanță, SEO și experiența utilizatorului (UX). Află exact ce te reține din a atrage mai mulți clienți.
          </p>
        </div>

        {/* Formular Container */}
        <div 
          ref={formRef}
          className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-teal-500/5 group hover:border-teal-500/30 transition-colors duration-500"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-800">
              <Activity className="text-teal-400 w-6 h-6" />
              <h2 className="text-2xl font-bold text-white">Completează datele</h2>
            </div>

            {/* Mesaj de Succes */}
            {status === 'success' && (
              <div className="mb-8 p-4 bg-teal-500/10 border border-teal-500/30 rounded-xl flex items-start gap-3 text-teal-200">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-teal-400" />
                <div>
                  <h3 className="font-semibold text-teal-300">Cerere trimisă cu succes!</h3>
                  <p className="text-sm mt-1">Echipa Digitura va analiza site-ul tău și te vom contacta în cel mai scurt timp pe email.</p>
                </div>
              </div>
            )}

            {/* Mesaj de Eroare */}
            {status === 'error' && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-200">
                <AlertCircle className="w-6 h-6 flex-shrink-0 text-red-400" />
                <div>
                  <h3 className="font-semibold text-red-300">A apărut o problemă</h3>
                  <p className="text-sm mt-1">{errorMessage}</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2 pl-1">Numele tău</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all duration-300 disabled:opacity-50" 
                    placeholder="Ex: Ion Popescu" 
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2 pl-1">Adresa de email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300 disabled:opacity-50" 
                    placeholder="contact@email.ro" 
                    required 
                  />
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-semibold text-slate-300 mb-2 pl-1">Link-ul website-ului</label>
                <input 
                  type="url" 
                  id="website" 
                  value={formData.website}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all duration-300 disabled:opacity-50" 
                  placeholder="https://site-ul-tau.ro" 
                  required 
                />
              </div>

              <div>
                <label htmlFor="goals" className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2 pl-1">
                  <Target size={16} className="text-slate-400" />
                  Ce dorești să îmbunătățești? (Opțional)
                </label>
                <textarea 
                  id="goals" 
                  value={formData.goals}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  rows={4} 
                  className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all duration-300 resize-none disabled:opacity-50" 
                  placeholder="Vreau mai mult trafic, un design mai modern, să atrag mai multe lead-uri etc."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className="group relative w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-teal-500/30 hover:scale-[1.02] cursor-pointer overflow-hidden mt-8 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10">
                  {status === 'loading' ? 'Se trimite...' : status === 'success' ? 'Trimis!' : 'Solicită Auditul Gratuit'}
                </span>
                {status === 'loading' ? (
                  <Loader2 size={20} className="relative z-10 animate-spin" />
                ) : (
                  <ArrowRight size={20} className={`relative z-10 transition-transform ${status !== 'success' && 'group-hover:translate-x-1'}`} />
                )}
              </button>
            </form>
          </div>
        </div>
        
      </div>
    </main>
  );
}