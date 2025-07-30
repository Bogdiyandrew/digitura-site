import { Suspense } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Benefits from '@/components/Benefits';
import Portfolio from '@/components/Portfolio';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

// O componentă simplă de încărcare pentru a fi afișată în timpul așteptării
const ContactLoading = () => {
  return (
    <div className="w-full py-32 bg-slate-950 flex items-center justify-center min-h-[50vh]">
      <p className="text-white text-xl animate-pulse">Se încarcă formularul de contact...</p>
    </div>
  );
};

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Services />
      <Benefits />
      <Portfolio />
      <Pricing />
      {/* Am înfășurat componenta Contact în Suspense */}
      {/* Acest lucru îi permite lui Next.js să randeze pagina pe server */}
      {/* fără a aștepta componenta Contact, care depinde de browser. */}
      <Suspense fallback={<ContactLoading />}>
        <Contact />
      </Suspense>
      <Footer />
      {/* Alte componente sau secțiuni pot fi adăugate aici */}
    </main>
  );
}
