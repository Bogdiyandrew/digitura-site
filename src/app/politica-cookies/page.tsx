import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';

const PoliticaCookies: React.FC = () => (
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
          Politica Cookies
        </h1>
        <section className="space-y-6 text-lg leading-relaxed">
          <p>
            Site-ul Digitura nu folosește cookies și nu stochează sau accesează informații pe dispozitivul tău. Nu avem nevoie de cookies pentru funcționarea, analiza sau personalizarea experienței pe acest site.
          </p>
          <p>
            Datele introduse de tine în formularul de contact (nume, firmă, email, telefon etc.) nu sunt stocate pe site și nu sunt asociate cu cookies sau alte metode de urmărire. Informațiile sunt folosite strict pentru a te contacta în legătură cu solicitarea transmisă.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">1. De ce nu folosim cookies?</h2>
          <p>
            Am proiectat site-ul astfel încât să nu fie necesară utilizarea cookie-urilor. Nu colectăm date despre vizitatori și nu folosim instrumente de analiză sau marketing care să necesite cookies.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">2. Confidențialitatea ta</h2>
          <p>
            Respectăm confidențialitatea vizitatorilor. Nu urmărim activitatea ta și nu transmitem date către terți prin intermediul cookie-urilor.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">3. Contact</h2>
          <p>
            Pentru orice întrebări legate de confidențialitate sau cookies, ne poți contacta la <a href="mailto:contact@digitura.ro" className="text-teal-400 underline hover:text-teal-300 transition-colors duration-200">contact@digitura.ro</a>.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default PoliticaCookies;
