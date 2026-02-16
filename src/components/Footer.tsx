'use client';

import React, { useState, useEffect, MouseEvent } from 'react';
import { Facebook, Instagram, Mail, Phone, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

interface LenisScrollToOptions {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
  immediate?: boolean;
  lock?: boolean;
  force?: boolean;
}

interface LenisInstance {
  scrollTo(target: HTMLElement | string | number, options?: LenisScrollToOptions): void;
  stop(): void;
  start(): void;
}

declare global {
  interface Window {
    lenis: LenisInstance;
  }
}

interface MousePosition {
  x: number;
  y: number;
}

const Footer: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const pathname = usePathname();
  const router = useRouter();

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

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string): void => {
    e.preventDefault();

    if (href.startsWith('#')) {
      if (pathname === '/') {
        const id = href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          if (window.lenis) {
            window.lenis.scrollTo(element, { offset: -20 });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else {
        router.push(`/${href}`);
      }
    } else {
      router.push(href);
    }
  };

  const scrollToTop = (): void => {
    if (typeof window === 'undefined') return;
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    if (pathname === '/') {
      scrollToTop();
    } else {
      router.push('/');
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
              href="/"
              onClick={handleLogoClick}
              className="flex items-center gap-3 text-2xl font-bold text-white mb-2"
              style={{ fontFamily: 'Ethnocentric, sans-serif' }}
            >
              <Image
                src="/digituralogo.png"
                alt="Digitura Logo"
                width={40}
                height={40}
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
                href="#despre"
                onClick={(e) => handleLinkClick(e, '#despre')}
                className="hover:text-teal-400 transition-colors duration-300 hover:translate-x-1"
              >
                Despre noi
              </Link>
              <Link
                href="#servicii"
                onClick={(e) => handleLinkClick(e, '#servicii')}
                className="hover:text-teal-400 transition-colors duration-300 hover:translate-x-1"
              >
                Servicii
              </Link>
              <Link
                href="#portofoliu"
                onClick={(e) => handleLinkClick(e, pathname === '/' ? '#portofoliu' : '/portofoliu')}
                className="hover:text-teal-400 transition-colors duration-300 hover:translate-x-1"
              >
                Portofoliu
              </Link>
              <Link
                href="#preturi"
                onClick={(e) => handleLinkClick(e, '#preturi')}
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
                onClick={(e) => handleLinkClick(e, '/termeni')}
                className="hover:text-teal-400 transition-colors duration-300 hover:translate-x-1"
              >
                Termeni și condiții
              </Link>
              <Link
                href="/politica-de-confidentialitate"
                onClick={(e) => handleLinkClick(e, '/politica-de-confidentialitate')}
                className="hover:text-teal-400 transition-colors duration-300 hover:translate-x-1"
              >
                Politica de confidențialitate
              </Link>
              <Link
                href="/politica-cookies"
                onClick={(e) => handleLinkClick(e, '/politica-cookies')}
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
              <a href="tel:+40750414296" className="flex items-center gap-3 group">
                <Phone size={20} className="text-slate-400 group-hover:text-teal-400 transition-colors duration-300" />
                <span className="group-hover:text-teal-400 transition-colors duration-300">(+40) 750 414 296</span>
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