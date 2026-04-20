'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Mail, Phone } from 'lucide-react';
import gsap from 'gsap';

export default function AuditClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    deliveryMethod: 'email' as 'email' | 'phone', 
    phone: '',
    gdpr: false
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, x: -30, willChange: 'opacity, transform' },
        { opacity: 1, x: 0, duration: 1, clearProps: 'willChange' }
      ).fromTo(
        formRef.current,
        { opacity: 0, x: 30, willChange: 'opacity, transform' },
        { opacity: 1, x: 0, duration: 1, clearProps: 'willChange' },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, type, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    // Validări
    if (!formData.name.trim() || !formData.website.trim() || !formData.gdpr) {
      setErrorMessage('Te rugăm să completezi câmpurile obligatorii.');
      setStatus('error');
      return;
    }

    if (formData.deliveryMethod === 'phone' && (!formData.phone || formData.phone.length < 10)) {
      setErrorMessage('Te rugăm să introduci un număr de telefon valid.');
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
      setErrorMessage('Te rugăm să introduci o adresă de email validă.');
      setStatus('error');
      return;
    }

    // Payload EXACT așa cum îl așteaptă API-ul tău (cu "nume", nu cu "name")
    const payload = {
      formType: "audit",
      nume: formData.name, 
      email: formData.email,
      website: formData.website,
      deliveryMethod: formData.deliveryMethod,
      phone: formData.deliveryMethod === 'phone' ? formData.phone : 'N/A'
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Eroare la trimitere.');

      setStatus('success');
      setFormData({ name: '', email: '', website: '', deliveryMethod: 'email', phone: '', gdpr: false });
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Eroare la trimiterea mesajului. Încearcă din nou.');
    }
  };

  return (
    <main 
      ref={containerRef} 
      className="relative min-h-screen bg-slate-950 text-white flex items-center overflow-hidden py-20"
      style={{ fontFamily: 'Exo2, sans-serif' }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-teal-500/10 blur-[120px] rounded-full transform-gpu" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full transform-gpu" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Partea din STÂNGA */}
        <div ref={titleRef} className="text-left">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white">
            Audit gratuit <br /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
              pentru site-ul tǎu
            </span>
          </h1>
          <p className="mt-6 text-slate-400 text-lg md:text-xl max-w-md">
            Verificăm performanța site-ului, nivelul de securitate și conformitatea cu normele GDPR. Îți trimitem apoi raportul complet pe mail sau telefon.
          </p>
        </div>

        {/* Partea din DREAPTA: Formular */}
        <div ref={formRef} className="w-full">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-xl font-semibold mb-8 text-slate-200">Completează datele</h2>

            {status === 'success' && (
              <div className="mb-6 p-4 bg-teal-500/10 border border-teal-500/30 rounded-xl flex items-center gap-3 text-teal-300">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">Cerere trimisă! Te contactăm în curând.</p>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-300">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs uppercase tracking-wider font-bold text-slate-500 ml-1">Nume</label>
                  <input 
                    type="text" id="name" value={formData.name} onChange={handleChange} disabled={status === 'loading'}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-all" 
                    placeholder="Ion Popescu" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs uppercase tracking-wider font-bold text-slate-500 ml-1">Email</label>
                  <input 
                    type="email" id="email" value={formData.email} onChange={handleChange} disabled={status === 'loading'}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-all" 
                    placeholder="contact@email.ro" 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="website" className="text-xs uppercase tracking-wider font-bold text-slate-500 ml-1">URL Website</label>
                <input 
                  type="url" id="website" value={formData.website} onChange={handleChange} disabled={status === 'loading'}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-all" 
                  placeholder="https://site-ul-tau.ro" 
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider font-bold text-slate-500 ml-1">Unde vrei să primești rezultatul?</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, deliveryMethod: 'email' }))}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all cursor-pointer ${
                      formData.deliveryMethod === 'email' ? 'bg-teal-500/10 border-teal-500 text-teal-400' : 'bg-transparent border-slate-800 text-slate-500 hover:border-slate-700'
                    }`}
                  >
                    <Mail size={16} /> Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, deliveryMethod: 'phone' }))}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all cursor-pointer ${
                      formData.deliveryMethod === 'phone' ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'bg-transparent border-slate-800 text-slate-500 hover:border-slate-700'
                    }`}
                  >
                    <Phone size={16} /> Telefon
                  </button>
                </div>

                {formData.deliveryMethod === 'phone' && (
                  <input
                    type="tel" id="phone" value={formData.phone} onChange={handleChange}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none animate-in fade-in zoom-in-95 duration-300"
                    placeholder="07xx xxx xxx"
                  />
                )}
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  id="gdpr" type="checkbox" checked={formData.gdpr} onChange={handleChange}
                  className="mt-1 w-4 h-4 bg-slate-900 border-slate-700 rounded text-teal-500 focus:ring-teal-500 cursor-pointer"
                />
                <label htmlFor="gdpr" className="text-[13px] text-slate-500 leading-snug cursor-default select-none">
                  Sunt de acord cu prelucrarea datelor conform politicii de confidențialitate.
                </label>
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-teal-400 transition-all duration-300 disabled:opacity-50 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  status === 'success' ? 'Trimis' : 'Solicită auditul'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}