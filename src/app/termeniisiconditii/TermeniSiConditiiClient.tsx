import Header from '@/components/Header';
import React from 'react';

const TermeniSiConditiiPage: React.FC = () => (
  <>
    <Header />
    <main
      className="min-h-screen bg-slate-950 text-slate-300 py-20 px-4"
      style={{ fontFamily: 'Exo2, sans-serif' }}
    >
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-slate-800 pb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Termeni și Condiții
          </h1>
          <p className="text-sm text-slate-400">
            Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}
          </p>
        </header>

        <div className="space-y-10 text-base leading-7">
          <section>
            <p>
              Bine ați venit pe site-ul <strong>Digitura</strong>. Utilizarea acestui website
              implică acceptarea prezentelor termeni și condiții. Vă recomandăm să le citiți cu
              atenție înainte de utilizarea site-ului.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Date de identificare
            </h2>
            <p>
              Website-ul <strong>digitura.ro</strong> este operat de <strong>VOLTARISS S.R.L.</strong>,
              denumită în continuare și „Digitura”.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Obiectul site-ului
            </h2>
            <p>
              Site-ul Digitura are rolul de a prezenta serviciile oferite de VOLTARISS S.R.L., inclusiv servicii de web design, dezvoltare website-uri, landing pages, magazine online, branding, automatizări și servicii conexe. Prin intermediul site-ului, utilizatorii pot solicita informații, pot transmite cereri de ofertă, pot fi contactați în vederea stabilirii unei colaborări și pot accesa informații despre pachetele și modalitățile de lucru disponibile.

Informațiile prezentate pe site au caracter informativ și comercial. Prețurile afișate sunt orientative, dacă nu se prevede în mod expres altfel, iar oferta finală poate varia în funcție de cerințele, complexitatea și specificul fiecărui proiect. Condițiile comerciale finale vor fi stabilite de comun acord între părți, în baza unei oferte, a unui contract sau a altui document comercial aplicabil.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Drepturi de proprietate intelectuală
            </h2>
            <p>
              Întregul conținut al site-ului, incluzând fără a se limita la texte, imagini,
              elemente grafice, logo-uri, structură, design, scripturi și orice alte materiale,
              aparține <strong>VOLTARISS S.R.L.</strong> sau partenerilor săi și este protejat de
              legislația aplicabilă în materia drepturilor de autor și a proprietății intelectuale.
            </p>
            <p className="mt-3">
              Este interzisă copierea, distribuirea, publicarea, transmiterea, modificarea sau
              utilizarea în orice scop comercial a conținutului site-ului fără acordul prealabil,
              expres și scris al titularului drepturilor.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Utilizarea site-ului
            </h2>
            <p>
              Utilizatorii se obligă să folosească site-ul în mod legal, cu bună-credință și fără a
              aduce prejudicii societății, altor utilizatori sau terților. Este interzisă orice
              utilizare a site-ului care ar putea afecta funcționarea acestuia, securitatea lui sau
              integritatea conținutului publicat.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Limitarea răspunderii
            </h2>
            <p>
              Societatea depune eforturi rezonabile pentru ca informațiile publicate pe site să fie
              corecte și actualizate, însă nu garantează că site-ul va funcționa permanent, fără
              întreruperi, erori sau vulnerabilități tehnice.
            </p>
            <p className="mt-3">
              În măsura permisă de lege, <strong>VOLTARISS S.R.L.</strong> nu poate fi ținută
              răspunzătoare pentru prejudicii directe sau indirecte rezultate din utilizarea sau
              imposibilitatea utilizării site-ului ori a informațiilor disponibile pe acesta.
            </p>
            <p className="mt-3">
              De asemenea, Societatea nu răspunde pentru conținutul, politica sau practicile altor
              website-uri către care pot exista link-uri externe.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Servicii și conținut generate cu ajutorul inteligenței artificiale
            </h2>
            <p>
              În măsura în care site-ul sau serviciile Digitura includ funcționalități bazate pe
              inteligență artificială, utilizatorul înțelege și acceptă că rezultatele generate pot
              avea caracter orientativ și pot conține erori, omisiuni sau neconcordanțe.
            </p>
            <p className="mt-3">
              Utilizatorul este responsabil pentru verificarea, evaluarea și utilizarea finală a
              oricărui conținut generat prin astfel de funcționalități. Digitura nu garantează
              acuratețea, caracterul complet sau adecvarea rezultatelor pentru un anumit scop.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Modificarea termenilor
            </h2>
            <p>
              Societatea își rezervă dreptul de a actualiza sau modifica prezentele termeni și
              condiții ori de câte ori este necesar. Versiunea actualizată va fi publicată pe
              această pagină, iar continuarea utilizării site-ului după publicare va constitui
              acceptarea modificărilor.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              8. Legea aplicabilă și soluționarea litigiilor
            </h2>
            <p>
              Prezentele termeni și condiții sunt guvernate de legislația română. Eventualele
              litigii vor fi soluționate pe cale amiabilă, iar în cazul în care acest lucru nu este
              posibil, competența revine instanțelor judecătorești competente din România, conform
              legii.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              9. Contact
            </h2>
            <p>
              Pentru întrebări sau solicitări legate de acești termeni și condiții, ne puteți
              contacta la:
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

export default TermeniSiConditiiPage;