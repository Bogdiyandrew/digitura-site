'use client';

import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { Send, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

// --- MODIFICARE 1: Am adăugat proprietatea 'isSpecial' la interfață ---
interface MenuLink {
  href: string;
  label: string;
  isSpecial?: boolean; // Proprietate opțională pentru a marca link-ul
}

interface MousePosition {
  x: number;
  y: number;
}

// Lista de linkuri pentru meniu
const menuLinks: MenuLink[] = [
  { href: '#despre', label: 'Despre' },
  { href: '#servicii', label: 'Servicii' },
  { href: '#preturi', label: 'Prețuri' },
  { href: '#contact', label: 'Contact' },
  { href: '/portofoliu', label: 'Portofoliu', isSpecial: true },
  { href: '/ai', label: 'Laborator AI', isSpecial: true },
];

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(true);
  const lastScrollY = useRef<number>(0);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const pathname = usePathname();

  // Efect pentru ascundere/afișare la scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100 && !mobileOpen) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);

  // Efect pentru parallax pe fundal
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: globalThis.MouseEvent): void => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Blochează scroll-ul paginii când meniul mobil este deschis
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = mobileOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileOpen]);

  // Funcție centralizată pentru navigare
  const handleLinkClick = (href: string, e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>, isMobile: boolean = false): void => {
    e.preventDefault();

    if (isMobile) {
      setMobileOpen(false);
    }
    
    if (href.startsWith('#')) {
      if (pathname !== '/') {
        window.location.href = `/${href}`;
      } else {
        const id = href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (href === '/') {
        if (pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.location.href = '/';
        }
    } else {
      window.location.href = href;
    }
  };


  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full transition-all duration-500 z-50 ${visible ? 'translate-y-0' : '-translate-y-full'} ${
          scrolled
            ? 'bg-slate-950/95 backdrop-blur-xl border-b border-slate-700/80 shadow-2xl shadow-teal-400/10'
            : 'bg-slate-950/60 backdrop-blur-sm border-b border-slate-800/40'
        }`}
        style={{
          background: scrolled
            ? `radial-gradient(ellipse at ${mousePosition.x}% ${mousePosition.y}%, rgba(20,184,166,0.1) 0%, rgba(15,23,42,0.95) 50%)`
            : `radial-gradient(ellipse at ${mousePosition.x}% ${mousePosition.y}%, rgba(20,184,166,0.05) 0%, rgba(15,23,42,0.6) 50%)`,
          fontFamily: 'Exo2, sans-serif'
        }}
      >
        <div className="relative max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link 
            href="/" 
            onClick={(e: MouseEvent<HTMLAnchorElement>) => handleLinkClick('/', e)}
            className="group flex-shrink-0 flex items-center gap-3 md:gap-4 transform transition-all duration-300 hover:scale-105"
          >
            <Image 
              src="/favicon.ico" 
              alt="Digitura Logo" 
              width={48}
              height={48}
              className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-full shadow-lg bg-slate-900 border-2 border-slate-800" 
              style={{ boxShadow: '0 2px 16px 0 rgba(20,184,166,0.10)' }} 
            />
            <span 
              className="text-lg md:text-xl font-bold select-none text-white tracking-widest" 
              style={{ 
                fontFamily: 'Ethnocentric, sans-serif', 
                letterSpacing: '0.12em', 
                textShadow: '0 2px 12px rgba(0,0,0,0.18)' 
              }}
            >
              DIGITURA
            </span>
          </Link>

          {/* --- MODIFICARE 3: Am adăugat logica pentru stilul special în meniul Desktop --- */}
          <nav className={`hidden lg:flex items-center gap-6 mx-auto ${poppins.className}`}>
            {menuLinks.filter(link => !link.isSpecial).map((link: MenuLink) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative transition-colors duration-300 font-medium px-5 py-2.5 leading-none group overflow-hidden ${
                  link.label === 'Contact'
                    ? 'text-teal-300 hover:text-white'
                    : 'text-slate-200 hover:text-white'
                }`}
                onClick={(e) => handleLinkClick(link.href, e)}
              >
                <span className="magic-span absolute w-0 h-0 rounded-full bg-teal-400/60 blur-xl group-hover:w-40 group-hover:h-40 transition-all duration-500" style={{ transform: 'translate(-50%, -50%)' }}/>
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
            <div className="h-6 border-l border-slate-700/40 mx-4"></div>
            {menuLinks.filter(link => link.isSpecial).map((link: MenuLink) => (
              <a
                key={link.href}
                href={link.href}
                className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-300 font-semibold px-5 py-2.5 rounded-xl border border-teal-400/30 shadow-md shadow-teal-500/10 transition-all duration-300 hover:from-teal-500/30 hover:to-cyan-500/30 hover:text-white hover:shadow-lg hover:shadow-teal-500/20 leading-none"
                onClick={(e) => handleLinkClick(link.href, e)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button 
            className="lg:hidden flex-shrink-0 p-2 text-teal-300" 
            onClick={() => setMobileOpen(true)} 
            aria-label="Deschide meniul"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-950 animated-gradient" onClick={() => setMobileOpen(false)} />
        <nav className={`absolute top-0 right-0 h-full w-full max-w-sm bg-slate-900/80 backdrop-blur-2xl border-l border-slate-700/50 shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center p-6 border-b border-slate-800">
            <span 
              className="text-xl font-bold text-white" 
              style={{ fontFamily: 'Ethnocentric, sans-serif' }}
            >
              MENIU
            </span>
            <button 
              onClick={() => setMobileOpen(false)} 
              className="p-2 text-slate-400 hover:text-white transition-colors"
              aria-label="Închide meniul"
            >
              <X size={28} />
            </button>
          </div>
          
          {/* --- MODIFICARE 4: Am adăugat logica pentru stilul special în meniul Mobil --- */}
          <div className="flex flex-col p-6 gap-2">
            {menuLinks.map((link: MenuLink, index: number) => (
              link.isSpecial ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="group w-full text-center bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-300 font-semibold px-5 py-3 rounded-xl border border-teal-400/30 shadow-md shadow-teal-500/10 transition-all duration-300 hover:from-teal-500/30 hover:to-cyan-500/30 hover:text-white hover:shadow-lg hover:shadow-teal-500/20 text-lg"
                  style={{
                    transform: mobileOpen ? 'translateX(0)' : 'translateX(50px)',
                    opacity: mobileOpen ? 1 : 0,
                    transition: `transform 0.5s ${index * 0.07}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ${index * 0.07}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                  }}
                  onClick={(e) => handleLinkClick(link.href, e, true)}
                >
                   {link.label}
                </a>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative text-xl font-semibold text-slate-200 hover:text-white transition-all duration-300"
                  style={{
                    transform: mobileOpen ? 'translateX(0)' : 'translateX(50px)',
                    opacity: mobileOpen ? 1 : 0,
                    transition: `transform 0.5s ${index * 0.07}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ${index * 0.07}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                  }}
                  onClick={(e) => handleLinkClick(link.href, e, true)}
                >
                  <div className="absolute -inset-x-3 -inset-y-2 z-0 rounded-full bg-slate-800/0 group-hover:bg-slate-800/80 scale-95 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <span className="relative z-10 block p-3">{link.label}</span>
                </a>
              )
            ))}
          </div>

        </nav>
      </div>

      <style jsx>{`
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-gradient {
          background: linear-gradient(-45deg, #0f172a, #1e293b, #0284c7, #14b8a6);
          background-size: 400% 400%;
          animation: gradient-animation 15s ease infinite;
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px -5px rgba(20, 184, 166, 0.4), 0 0 30px -10px rgba(10, 150, 130, 0.3);
          }
          50% {
            box-shadow: 0 0 30px 0px rgba(20, 184, 166, 0.6), 0 0 45px -5px rgba(10, 150, 130, 0.5);
          }
        }
        :global(.cta-button-glow) {
          animation: pulse-glow 3s infinite ease-in-out;
        }
      `}</style>
    </>
  );
};

export default Header;