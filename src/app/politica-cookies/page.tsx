import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';
import { Cookie, ShieldCheck, ServerOff, Mail, Info } from 'lucide-react';

const PoliticaCookies: React.FC = () => (
  <>
    <Header />
    <main
      className="min-h-screen bg-slate-950 text-slate-300 py-24 px-4 relative overflow-hidden"
      style={{ fontFamily: 'Exo2, sans-serif' }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-4xl w-full mx-auto relative z-10">

        <div className="text-center mb-12">
          <h1
            className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent"
            style={{
              fontFamily: 'Ethnocentric, Exo2, sans-serif',
              letterSpacing: 1
            }}
          >
            Politica Cookies
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-sm font-semibold">
            <ShieldCheck size={16} />
            <span>Site fără urmărire (Tracking-Free)</span>
          </div>
        </div>

        <div className="space-y-8 text-lg leading-relaxed">

          <section className="bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-800 backdrop-blur-sm shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-800 rounded-xl hidden sm:block">
                <Cookie className="text-slate-400" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Pe scurt: Nu folosim Cookies.</h3>
                <p className="text-slate-300">
                  Site-ul <strong>Digitura</strong> este construit având confidențialitatea ta ca prioritate.
                  Nu folosim module cookie, nu stocăm și nu accesăm informații pe dispozitivul tău (computer, telefon sau tabletă).
                  Navigarea pe acest site este complet privată.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <ServerOff className="text-blue-400" size={24} /> 1. De ce nu folosim cookies?
            </h2>
            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700/50 text-slate-300 text-base">
              <p className="mb-3">
                Am proiectat arhitectura tehnică a site-ului astfel încât să funcționeze perfect fără a avea nevoie de stocare locală pe dispozitivul utilizatorului.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-400">
                <li>Nu avem conturi de utilizator sau zone de logare.</li>
                <li>Nu folosim Google Analytics sau Facebook Pixel pentru a te urmări.</li>
                <li>Nu afișăm reclame personalizate.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Info className="text-purple-400" size={24} /> 2. Datele din formulare
            </h2>
            <p className="text-slate-300 text-base">
              Datele introduse de tine în formularul de contact (nume, firmă, email, telefon) sunt transmise securizat direct către serverele noastre de email pentru a putea răspunde solicitării. Aceste date <strong>nu sunt salvate în cookies</strong> și nu sunt folosite pentru a crea profiluri de marketing.
            </p>
          </section>


          <div className="mt-8 p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl flex items-center gap-4">
            <Mail className="text-teal-400 flex-shrink-0" />
            <p className="text-base">
              Dacă ai întrebări tehnice despre cum protejăm confidențialitatea, scrie-ne la: <br className="sm:hidden" />
              <a href="mailto:contact@digitura.ro" className="text-teal-400 font-bold underline hover:text-teal-300 transition-colors duration-200">
                contact@digitura.ro
              </a>
            </p>
          </div>

        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default PoliticaCookies;