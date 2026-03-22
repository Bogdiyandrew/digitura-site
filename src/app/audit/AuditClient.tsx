'use client';

import React, { useEffect, useRef, useState, FormEvent } from 'react';
import { ArrowRight, Activity, Target, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import gsap from 'gsap';

export default function AuditClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    goals: '',
    gdpr: false
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');

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
    const { id, type, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));

    if (id === 'email') setEmailError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    setEmailError('');

    if (!formData.name.trim() || !formData.website.trim() || !formData.gdpr) {
      setErrorMessage('Numele, link-ul website-ului și acordul GDPR sunt obligatorii.');
      setStatus('error');
      return;
    }

    if (!formData.website.includes('.') || formData.website.length < 4) {
      setErrorMessage('Te rugăm să introduci un link valid pentru website.');
      setStatus('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      setEmailError('Te rugăm să introduci o adresă de email validă (ex: nume@domeniu.ro).');
      setStatus('error');
      return;
    }

    const payload = {
      formType: "audit", //
      nume: formData.name,
      email: formData.email,
      website: formData.website, // <-- Trimitem website-ul curat
      goals: formData.goals,     // <-- Trimitem goals-urile curate
      // project_details și package nu mai sunt necesare aici dacă refacem API-ul
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Eroare la trimiterea mesajului. Te rugăm să încerci din nou.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', website: '', goals: '', gdpr: false });
    } catch (error: any) {
      console.error('Eroare trimitere formular:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Eroare la trimiterea mesajului. Te rugăm să încerci din nou.');
    }
  };

  const handleInvalid = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    e.preventDefault(); 
    if (target.id === 'email' && target.validity.typeMismatch) {
      setEmailError('Te rugăm să introduci o adresă de email validă (ex: nume@domeniu.ro).');
      setStatus('error');
    }
  };

  return (
    <main 
      ref={containerRef} 
      className="relative min-h-screen bg-slate-950 text-white pt-28 pb-12 overflow-hidden flex flex-col justify-center"
      style={{ fontFamily: 'Exo2, sans-serif' }}
    >
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

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 w-full">
        
        <div ref={titleRef} className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-white to-blue-400 drop-shadow-lg leading-tight">
            Audit gratuit pentru <br className="hidden md:block" /> site-ul tǎu
          </h1>
          
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Identificăm problemele de performanță, SEO și experiența utilizatorului (UX). Află problemele site-ului în mai puțin de 48h.
          </p>
        </div>

        <div 
          ref={formRef}
          className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-teal-500/5 group hover:border-teal-500/30 transition-colors duration-500 max-w-3xl mx-auto"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <Activity className="text-teal-400 w-5 h-5" />
              <h2 className="text-xl font-bold text-white">Completează datele</h2>
            </div>

            {status === 'success' && (
              <div className="mb-6 p-4 bg-teal-500/10 border border-teal-500/30 rounded-xl flex items-start gap-3 text-teal-200">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-teal-400" />
                <div>
                  <h3 className="font-semibold text-teal-300">Cerere trimisă cu succes!</h3>
                  <p className="text-sm mt-1">Echipa Digitura va analiza site-ul tău și te vom contacta în cel mai scurt timp pe email.</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-200">
                <AlertCircle className="w-6 h-6 flex-shrink-0 text-red-400" />
                <div>
                  <h3 className="font-semibold text-red-300">A apărut o problemă</h3>
                  <p className="text-sm mt-1">{errorMessage}</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-1.5 pl-1">
                    Numele tău <span className="text-teal-400">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all duration-300 disabled:opacity-50" 
                    placeholder="Ex: Ion Popescu" 
                  />
                </div>
                
                <div className="flex flex-col">
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-1.5 pl-1">
                    Adresa de email <span className="text-teal-400">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    onInvalid={handleInvalid}
                    disabled={status === 'loading'}
                    className={`w-full bg-slate-950/50 border ${emailError ? 'border-red-500/50 focus:border-red-400 focus:ring-red-400' : 'border-slate-700/50 focus:border-blue-400 focus:ring-blue-400'} rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all duration-300 disabled:opacity-50`} 
                    placeholder="contact@email.ro" 
                  />
                  {emailError && (
                    <div className="flex items-center gap-1.5 mt-2 pl-1">
                      <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                      <p className="text-xs font-medium text-red-400 leading-tight">{emailError}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-semibold text-slate-300 mb-1.5 pl-1">
                  Link-ul website-ului <span className="text-teal-400">*</span>
                </label>
                <input 
                  type="url" 
                  id="website" 
                  value={formData.website}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all duration-300 disabled:opacity-50" 
                  placeholder="site-ul-tau.ro" 
                />
              </div>

              <div>
                <label htmlFor="goals" className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-1.5 pl-1">
                  <Target size={16} className="text-slate-400" />
                  Ce dorești să îmbunătățești? (Opțional)
                </label>
                <textarea 
                  id="goals" 
                  value={formData.goals}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  rows={3} 
                  className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all duration-300 resize-none disabled:opacity-50" 
                  placeholder="Vreau mai mult trafic, un design mai modern, să atrag mai multe lead-uri etc."
                ></textarea>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    id="gdpr"
                    type="checkbox"
                    checked={formData.gdpr}
                    onChange={handleChange}
                    className="w-4 h-4 bg-slate-950/50 border-slate-700 rounded text-teal-500 focus:ring-teal-500 focus:ring-offset-slate-900 transition-colors"
                  />
                </div>
                <label htmlFor="gdpr" className="text-sm text-slate-400 cursor-pointer select-none leading-tight">
                  Sunt de acord cu <a href="/politica-de-confidentialitate" className="text-teal-400 hover:text-teal-300 underline transition-colors">Politica de confidențialitate</a> și cu prelucrarea datelor cu caracter personal în scopul procesării cererii mele.
                </label>
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className="group relative w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-teal-500/30 hover:scale-[1.02] cursor-pointer overflow-hidden mt-6 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10">
                  {status === 'loading' ? 'Se trimite...' : status === 'success' ? 'Trimis!' : 'Solicită auditul'}
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