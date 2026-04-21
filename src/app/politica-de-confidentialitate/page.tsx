import { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: {
    absolute: 'Politica de confidențialitate - Digitura',
  },
  description:
    'Află cum colectează, utilizează și protejează Digitura datele personale ale utilizatorilor site-ului digitura.ro.',
};

export default function PoliticaDeConfidentialitatePage() {
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
              Politica de confidențialitate
            </h1>
            <p className="text-sm text-slate-400">
              Ultima actualizare: 21.04.2026
            </p>
          </header>

          <div className="space-y-10 text-base leading-7">
            <section>
              <p>
                Această pagină explică modul în care <strong>Digitura</strong>,
                prin <strong>VOLTARISS S.R.L.</strong>, colectează, utilizează și
                protejează datele personale ale utilizatorilor site-ului
                <strong> digitura.ro</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                1. Cine suntem
              </h2>
              <p>
                Operatorul datelor cu caracter personal este
                <strong> VOLTARISS S.R.L.</strong>, entitatea care administrează
                brandul Digitura și website-ul digitura.ro.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                2. Ce date colectăm
              </h2>
              <p className="mb-3">
                Prin intermediul formularelor de contact sau al altor mijloace de
                comunicare disponibile pe site, putem colecta date furnizate în mod
                voluntar de utilizatori, precum:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>nume și prenume;</li>
                <li>adresă de email;</li>
                <li>număr de telefon;</li>
                <li>numele companiei, dacă este furnizat;</li>
                <li>informații despre proiect, cerere sau obiectivele comunicate.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                3. Cum folosim datele
              </h2>
              <p>
                Datele personale sunt utilizate pentru a răspunde solicitărilor
                primite, pentru a transmite oferte, pentru comunicarea legată de
                serviciile noastre și, după caz, pentru inițierea sau derularea unei
                colaborări contractuale.
              </p>
              <p className="mt-3">
                În funcție de context, prelucrarea se poate baza pe consimțământul
                persoanei vizate, pe demersuri făcute la cererea acesteia înainte de
                încheierea unui contract sau pe interesul legitim al operatorului de a
                răspunde solicitărilor comerciale.
              </p>
              <p className="mt-3">
                Nu vindem datele personale și nu le divulgăm către terți, cu excepția
                situațiilor în care acest lucru este necesar pentru funcționarea
                serviciilor, pentru respectarea obligațiilor legale sau pentru
                protejarea drepturilor noastre legitime.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                4. Stocarea și securitatea datelor
              </h2>
              <p>
                Luăm măsuri tehnice și organizatorice rezonabile pentru a proteja
                datele personale împotriva accesului neautorizat, pierderii,
                distrugerii sau divulgării nepermise.
              </p>
              <p className="mt-3">
                Datele vor fi păstrate doar pentru perioada necesară îndeplinirii
                scopurilor pentru care au fost colectate, precum și pentru perioadele
                impuse de obligațiile legale aplicabile, dacă este cazul.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                5. Drepturile persoanelor vizate
              </h2>
              <p className="mb-3">
                În condițiile prevăzute de legislația aplicabilă, aveți următoarele
                drepturi:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>dreptul de acces la date;</li>
                <li>dreptul la rectificare;</li>
                <li>dreptul la ștergere;</li>
                <li>dreptul la restricționarea prelucrării;</li>
                <li>dreptul la opoziție;</li>
                <li>dreptul la portabilitatea datelor;</li>
                <li>dreptul de a retrage consimțământul, atunci când prelucrarea se bazează pe acesta;</li>
                <li>dreptul de a depune o plângere la autoritatea competentă.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                6. Contact
              </h2>
              <p>
                Pentru întrebări, solicitări sau exercitarea drepturilor legate de
                prelucrarea datelor personale, ne puteți contacta la:
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

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                7. Modificări ale politicii
              </h2>
              <p>
                Ne rezervăm dreptul de a actualiza această politică de
                confidențialitate ori de câte ori este necesar. Versiunea actualizată
                va fi publicată pe această pagină.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}