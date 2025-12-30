'use client';

import React, { useState, useEffect, MouseEvent } from 'react';
import { Facebook, Instagram, Mail, Phone, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface MousePosition {
  x: number;
  y: number;
}

const Footer: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const pathname = usePathname();

  const isOnTermsPage = pathname === '/termeni-si-conditii';
  const isOnConfPage = pathname === '/politica-de-confidentialitate';
  const isOnCookiesPage = pathname === '/politica-cookies';
  const isLegalPage = isOnTermsPage || isOnConfPage || isOnCookiesPage;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: globalThis.MouseEvent): void => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToTop = (): void => {
    if (typeof window === 'undefined') return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    if (isOnTermsPage) return;
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSectionLinkClick = (href: string) => (e: MouseEvent<HTMLAnchorElement>): void => {
    if (isLegalPage) {
      e.preventDefault();
      if (typeof window !== 'undefined') {
        window.location.href = `/${href}`;
      }
    }
  };

  return (
    <footer
      className="relative w-full bg-slate-950 border-t border-slate-800 text-slate-300 pt-16 pb-8 px-6 overflow-hidden"
      style={{ fontFamily: 'Exo2, sans-serif' }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(20, 184, 166, 0.15), transparent 80%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          <div className="flex flex-col gap-4">
            <Link
              href={isOnTermsPage ? "/" : "#"}
              onClick={handleLogoClick}
              className="flex items-center gap-3 text-2xl font-bold text-white mb-2"
              style={{ fontFamily: 'Ethnocentric, sans-serif' }}
            >
              <Image
                src="/favicon.ico"
                alt="Digitura Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              DIGITURA
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Transformăm idei în experiențe digitale de impact. Construim viitorul web, un proiect odată.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.facebook.com/profile.php?id=61575912824832"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-teal-400 transition-transform duration-300 hover:scale-110"
              >
                <Facebook size={22} />
              </a>
              <a
                href="https://www.instagram.com/digituraro/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-teal-400 transition-transform duration-300 hover:scale-110"
              >
                <Instagram size={22} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 tracking-wider">Link-uri utile</h3>
            <nav className="flex flex-col gap-3">
              <Link
                href={isLegalPage ? "/#despre" : "#despre"}
                onClick={handleSectionLinkClick('#despre')}
                className="hover:text-teal-400 transition-colors duration-300 hover:translate-x-1"
              >
                Despre noi
              </Link>
              <Link
                href={isLegalPage ? "/#servicii" : "#servicii"}
                onClick={handleSectionLinkClick('#servicii')}
                className="hover:text-teal-400 transition-colors duration-300 hover:translate-x-1"
              >
                Servicii
              </Link>
              <Link
                href={isLegalPage ? "/#portofoliu" : "#portofoliu"}
                onClick={handleSectionLinkClick('#portofoliu')}
                className="hover:text-teal-400 transition-colors duration-300 hover:translate-x-1"
              >
                Portofoliu
              </Link>
              <Link
                href={isLegalPage ? "/#preturi" : "#preturi"}
                onClick={handleSectionLinkClick('#preturi')}
                className="hover:text-teal-400 transition-colors duration-300 hover:translate-x-1"
              >
                Prețuri
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 tracking-wider">Legal & info</h3>
            <nav className="flex flex-col gap-3">
              <Link
                href="/termeni"
                className="hover:text-teal-400 transition-colors duration-300 hover:translate-x-1"
              >
                Termeni și condiții
              </Link>
              <Link
                href="/politica-de-confidentialitate"
                className="hover:text-teal-400 transition-colors duration-300 hover:translate-x-1"
              >
                Politica de confidențialitate
              </Link>
              <Link
                href="/politica-cookies"
                className="hover:text-teal-400 transition-colors duration-300 hover:translate-x-1"
              >
                Politica cookies
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 tracking-wider">Contact</h3>
            <div className="flex flex-col gap-4">
              <a href="mailto:suport@digitura.ro" className="flex items-center gap-3 group">
                <Mail size={20} className="text-slate-400 group-hover:text-teal-400 transition-colors duration-300" />
                <span className="group-hover:text-teal-400 transition-colors duration-300">suport@digitura.ro</span>
              </a>
              <a href="tel:+40750488329" className="flex items-center gap-3 group">
                <Phone size={20} className="text-slate-400 group-hover:text-teal-400 transition-colors duration-300" />
                <span className="group-hover:text-teal-400 transition-colors duration-300">(+40) 750 488 329</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-8">
          <p className="text-sm text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} Digitura. Toate drepturile rezervate.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="https://anpc.ro/ce-este-sal/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-105 transition-transform duration-300"
              aria-label="Soluționarea Alternativă a Litigiilor (ANPC)"
            >
              <img
                src="https://etamade-com.github.io/anpc-sal-sol-logo/anpc-sal.svg"
                alt="Soluționarea Alternativă a Litigiilor"
                width="250"
                height="50"
                style={{ height: '50px', width: '250px' }}
              />
            </a>
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-105 transition-transform duration-300"
              aria-label="Soluționarea Online a Litigiilor (UE)"
            >
              <img
                src="https://etamade-com.github.io/anpc-sal-sol-logo/anpc-sol.svg"
                alt="Soluționarea Online a Litigiilor"
                width="250"
                height="50"
                style={{ height: '50px', width: '250px' }}
              />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="group hidden lg:flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer"
            aria-label="Înapoi sus"
          >
            <span>Înapoi sus</span>
            <ArrowUp size={16} className="transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;