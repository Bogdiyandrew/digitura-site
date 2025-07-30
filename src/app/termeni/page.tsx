import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';

const TermeniSiConditii: React.FC = () => (
  <>
    <Header />
    <main 
      className="min-h-screen bg-slate-950 text-slate-100 py-24 px-4 flex flex-col items-center" 
      style={{ fontFamily: 'Exo2, sans-serif' }}
    >
      <div className="max-w-3xl w-full">
        <h1 
          className="text-3xl md:text-4xl font-bold mb-8 text-center" 
          style={{ 
            fontFamily: 'Ethnocentric, Exo2, sans-serif', 
            letterSpacing: 1 
          }}
        >
          Termeni și Condiții
        </h1>
        <section className="space-y-6 text-lg leading-relaxed">
          <p>
            Bine ați venit pe site-ul Digitura! Vă rugăm să citiți cu atenție termenii și condițiile de utilizare înainte de a folosi acest site.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-2">
            1. Acceptarea termenilor
          </h2>
          <p>
            Prin accesarea și utilizarea acestui site, sunteți de acord cu acești termeni și condiții. Dacă nu sunteți de acord, vă rugăm să nu utilizați site-ul.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-2">
            2. Drepturi de autor
          </h2>
          <p>
            Conținutul acestui site (texte, imagini, logo-uri, design) este proprietatea Digitura și este protejat de legea drepturilor de autor. Orice utilizare neautorizată este interzisă.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-2">
            3. Limitarea răspunderii
          </h2>
          <p>
            Digitura nu răspunde pentru eventuale erori sau omisiuni din conținutul site-ului și nici pentru eventuale daune rezultate din utilizarea acestuia.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-2">
            4. Modificarea termenilor
          </h2>
          <p>
            Ne rezervăm dreptul de a modifica acești termeni oricând, fără notificare prealabilă. Vă recomandăm să verificați periodic această pagină.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-2">
            5. Contact
          </h2>
          <p>
            Pentru întrebări sau clarificări, ne puteți contacta la{' '}
            <a 
              href="mailto:contact@digitura.ro" 
              className="text-teal-400 underline hover:text-teal-300 transition-colors duration-200"
            >
              contact@digitura.ro
            </a>
            .
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default TermeniSiConditii;
