import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <div className="mt-12 p-6 bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-slate-800 rounded-xl text-center">
      <h3 className="text-xl font-bold text-white mb-2">
        Ți-a plăcut acest concept?
      </h3>
      <p className="text-slate-300 mb-4 max-w-xl mx-auto">
        Hai să-l transformăm în realitate! Echipa Digitura poate crea un website complet sau o campanie de branding pornind exact de la această idee.
      </p>
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors"
      >
        Contactează-ne pentru o ofertă
        <ArrowRight size={18} />
      </Link>
    </div>
  );
};

export default CallToAction;