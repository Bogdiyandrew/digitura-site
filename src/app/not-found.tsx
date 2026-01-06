"use client";
import React from 'react';
import Link from 'next/link';
import { Home, AlertOctagon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <>
      <Header />
      <div
        className="min-h-screen w-full flex items-center justify-center bg-slate-900 text-white relative overflow-hidden"
        style={{ fontFamily: 'Exo2, sans-serif' }}
      >
        <div className="absolute top-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] border-4 border-slate-700/50 rounded-full animate-spin-slow" />

        <div className="text-center relative z-10 p-8">
          <div className="flex justify-center items-center mb-6">
            <AlertOctagon className="w-16 h-16 text-red-500/80 animate-bounce" />
          </div>

          <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500">
            404
          </h1>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-100">
            Pagină negăsită
          </h2>

          <p className="mt-4 text-lg text-slate-300 max-w-md mx-auto">
            Se pare că link-ul pe care l-ai urmat este invalid sau pagina a fost mutată.
          </p>

          <Link
            href="/"
            className="mt-10 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-teal-400/40 transition-all duration-300 transform hover:scale-105 group"
          >
            <Home className="transition-transform" />
            <span>Înapoi la acasă</span>
          </Link>
        </div>

        <style jsx>{`
          :global(.animation-delay-4000) {
            animation-delay: 4s;
          }
          @keyframes spin-slow {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }
          :global(.animate-spin-slow) {
            animation: spin-slow 60s linear infinite;
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
