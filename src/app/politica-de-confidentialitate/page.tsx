import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';
import { Shield, Lock, FileText, UserCheck, Eye, Mail } from 'lucide-react';

const PoliticaDeConfidentialitate: React.FC = () => (
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
            Politica de Confidențialitate
          </h1>
          <p className="text-slate-400">Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}</p>
        </div>

        <div className="space-y-8 text-lg leading-relaxed">

          <section className="bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-800 backdrop-blur-sm shadow-xl">
            <p className="mb-4">
              Această pagină explică modul în care <strong>Digitura</strong> (prin entitatea sa juridică) colectează, folosește și protejează datele personale ale utilizatorilor site-ului <strong>digitura.ro</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Shield className="text-teal-400" size={24} /> 1. Cine suntem?
            </h2>
            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700/50 text-slate-300 text-base">
              <p>
                Operatorul datelor tale cu caracter personal este <strong>Voltariss S.R.L.</strong>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <FileText className="text-blue-400" size={24} /> 2. Ce date colectăm?
            </h2>
            <p className="mb-3">Prin intermediul formularelor de contact, colectăm următoarele date pe care ni le furnizați voluntar:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>Nume și prenume</li>
              <li>Adresă de email</li>
              <li>Număr de telefon</li>
              <li>Informații despre proiectul dumneavoastră</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <UserCheck className="text-purple-400" size={24} /> 3. Cum folosim datele?
            </h2>
            <p>
              Datele sunt folosite <strong>exclusiv</strong> pentru a răspunde solicitărilor și pentru comunicare legată de serviciile noastre (ofertare, consultanță).
              Temeiul legal este consimțământul dumneavoastră.
              <br /><br />
              <span className="text-teal-400 font-semibold">Nu vindem și nu distribuim datele către terți.</span>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Lock className="text-emerald-400" size={24} /> 4. Securitatea și Păstrarea Datelor
            </h2>
            <p>
              Luăm măsuri tehnice și organizatorice pentru a proteja datele personale împotriva accesului neautorizat.
              Datele vor fi păstrate doar pe durata necesară soluționării cererii sau pe durata relației contractuale.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Eye className="text-orange-400" size={24} /> 5. Drepturile dumneavoastră
            </h2>
            <p className="mb-4">Conform GDPR, aveți următoarele drepturi:</p>
            <ul className="grid sm:grid-cols-2 gap-2 text-base mb-6">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span> Acces la date</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span> Rectificarea datelor</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span> Ștergerea datelor</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span> Retragerea consimțământului</li>
            </ul>

            <div className="mt-6 p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl flex items-center gap-4">
              <Mail className="text-teal-400 flex-shrink-0" />
              <p className="text-base">
                Pentru orice solicitare, ne puteți contacta la: <br className="sm:hidden" />
                <a href="mailto:contact@digitura.ro" className="text-teal-400 font-bold underline hover:text-teal-300 transition-colors duration-200">
                  contact@digitura.ro
                </a>
              </p>
            </div>
          </section>

          <section className="pt-8 border-t border-slate-800">
            <h2 className="text-xl font-bold text-white mb-2">6. Modificări</h2>
            <p className="text-slate-400 text-base">
              Ne rezervăm dreptul de a actualiza această politică. Orice modificare va fi publicată pe această pagină.
            </p>
          </section>

        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default PoliticaDeConfidentialitate;