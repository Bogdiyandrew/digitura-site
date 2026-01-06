import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';
import { Scale, ShieldAlert, FileCheck, Copyright, Gavel, Mail } from 'lucide-react';

const TermeniSiConditii: React.FC = () => (
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
            Termeni și Condiții
          </h1>
          <p className="text-slate-400">Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}</p>
        </div>

        <div className="space-y-8 text-lg leading-relaxed">

          <section className="bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-800 backdrop-blur-sm shadow-xl">
            <p className="mb-4">
              Bine ați venit pe site-ul <strong>Digitura</strong>. Accesarea și utilizarea acestui website presupune acceptarea implicită și în totalitate a termenilor și condițiilor de mai jos. Vă recomandăm citirea cu atenție a acestora.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <FileCheck className="text-teal-400" size={24} /> 1. Date de Identificare
            </h2>
            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700/50 text-slate-300 text-base">
              <p>
                Site-ul <strong>digitura.ro</strong> este proprietatea comercială a: <br />
                <strong>VOLTARISS S.R.L</strong>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Copyright className="text-blue-400" size={24} /> 2. Drepturi de proprietate intelectuală
            </h2>
            <p className="text-slate-300 text-base">
              Întregul conținut al site-ului Digitura (texte, imagini, grafică, logo-uri, elemente de design web, scripturi) este proprietatea <strong>[NUME FIRMA]</strong> și este protejat de Legea drepturilor de autor și de legile privind proprietatea intelectuală și industrială. Folosirea fără acordul scris a oricăror elemente enumerate mai sus se pedepsește conform legilor în vigoare.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <ShieldAlert className="text-orange-400" size={24} /> 3. Limitarea răspunderii
            </h2>
            <p className="text-slate-300 text-base">
              Digitura nu garantează că site-ul va funcționa neîntrerupt sau fără erori. Nu ne asumăm răspunderea pentru eventualele daune (directe sau indirecte) cauzate de utilizarea sau imposibilitatea utilizării informațiilor de pe site.
              De asemenea, nu suntem responsabili pentru conținutul altor site-uri la care se poate ajunge prin link-uri de pe acest site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Gavel className="text-purple-400" size={24} /> 4. Legislație și Litigii
            </h2>
            <p className="text-slate-300 text-base">
              Termenii și condițiile de utilizare se supun legislației române. În caz de litigiu, se va încerca mai întâi o rezolvare pe cale amiabilă, în termen de 30 de zile lucrătoare de la înregistrarea reclamației. În cazul în care nu se poate ajunge la o înțelegere, va fi considerată competentă instanța judecătorească din raza teritorială unde își are sediul <strong>VOLTARISS S.R.L</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Scale className="text-emerald-400" size={24} /> 5. Modificări finale
            </h2>
            <p className="text-slate-300 text-base">
              Ne rezervăm dreptul de a modifica structura site-ului și acești termeni oricând, fără notificare prealabilă. Continuarea utilizării site-ului după modificări implică acceptarea acestora.
            </p>
          </section>

          <div className="mt-8 p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl flex items-center gap-4">
            <Mail className="text-teal-400 flex-shrink-0" />
            <p className="text-base">
              Pentru orice nelămuriri privind acești termeni, contactați-ne la: <br className="sm:hidden" />
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

export default TermeniSiConditii;