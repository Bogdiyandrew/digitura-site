import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';

const PoliticaDeConfidentialitate: React.FC = () => (
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
          Politica de Confidențialitate
        </h1>
        <section className="space-y-6 text-lg leading-relaxed">
          <p>
            Această pagină explică modul în care Digitura colectează, folosește și protejează datele personale ale utilizatorilor.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">1. Ce date colectăm?</h2>
          <p>
            Putem colecta date precum nume, adresă de email, număr de telefon și orice alte informații trimise prin formularele de contact.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">2. Cum folosim datele?</h2>
          <p>
            Datele sunt folosite exclusiv pentru a răspunde solicitărilor și pentru comunicare legată de serviciile noastre. Nu vindem și nu distribuim datele către terți.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">3. Securitatea datelor</h2>
          <p>
            Luăm măsuri tehnice și organizatorice pentru a proteja datele personale împotriva accesului neautorizat sau pierderii.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">4. Drepturile utilizatorilor</h2>
          <p>
            Aveți dreptul să solicitați accesul, rectificarea sau ștergerea datelor personale. Pentru orice solicitare, ne puteți contacta la <a href="mailto:contact@digitura.ro" className="text-teal-400 underline hover:text-teal-300 transition-colors duration-200">contact@digitura.ro</a>.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">5. Modificări</h2>
          <p>
            Ne rezervăm dreptul de a actualiza această politică. Orice modificare va fi publicată pe această pagină.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default PoliticaDeConfidentialitate;
