import { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: {
    absolute: 'Politica cookies - Digitura',
  },
  description:
    'Informații privind utilizarea modulelor cookie și a tehnologiilor similare pe site-ul digitura.ro.',
};

export default function PoliticaCookiesPage() {
  return (
    <>
      <Header />
      <main
        className="min-h-screen bg-slate-950 text-slate-300 py-20 px-4"
        style={{ fontFamily: 'Exo2, sans-serif' }}
      >
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 border-b border-slate-800 pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Politica cookies
            </h1>
            <p className="text-sm text-slate-400">
              Ultima actualizare: 21.04.2026
            </p>
          </header>

          <div className="space-y-10 text-base leading-7">
            <section>
              <p>
                Această pagină explică dacă și în ce mod site-ul
                <strong> digitura.ro</strong>, operat de
                <strong> VOLTARISS S.R.L.</strong>, utilizează module cookie sau
                tehnologii similare.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                1. Utilizarea modulelor cookie
              </h2>
              <p>
               <strong>digitura.ro</strong> nu utilizează module cookie sau alte tehnologii similare pentru stocarea ori accesarea informațiilor pe dispozitivul utilizatorului în scopuri de analiză, publicitate, personalizare sau profilare.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                2. Funcționarea site-ului
              </h2>
              <p>
                Website-ul este conceput astfel încât să poată fi utilizat fără
                plasarea de module cookie pentru funcționalități esențiale, conturi
                de utilizator, autentificare persistentă sau măsurare a traficului
                bazată pe cookie-uri.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                3. Date transmise prin formulare
              </h2>
              <p>
                Datele completate de utilizator în formularele disponibile pe site,
                precum nume, email, telefon, website sau detalii despre proiect, sunt
                transmise pentru procesarea solicitării și nu sunt stocate în module
                cookie pe dispozitivul utilizatorului.
              </p>
              <p className="mt-3">
                Pentru detalii privind prelucrarea datelor personale, vă rugăm să
                consultați și Politica de confidențialitate.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                4. Posibile modificări ulterioare
              </h2>
              <p>
                În cazul în care, în viitor, site-ul va utiliza module cookie sau
                tehnologii similare, această pagină va fi actualizată în mod
                corespunzător, iar informațiile relevante vor fi puse la dispoziția
                utilizatorilor în mod clar și transparent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                5. Contact
              </h2>
              <p>
                Pentru întrebări privind această politică, ne puteți contacta la:
              </p>
              <p className="mt-3">
                <a
                  href="mailto:contact@digitura.ro"
                  className="text-teal-400 underline hover:text-teal-300 transition-colors"
                >
                  contact@digitura.ro
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}