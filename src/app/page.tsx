import { Suspense } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

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
      <Pricing />
      <Suspense fallback={<ContactLoading />}>
        <Contact />
      </Suspense>
      <Footer />
    </main>
  );
}
