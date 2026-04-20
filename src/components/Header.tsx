'use client';

import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import gsap from 'gsap';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] });

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

interface MenuLink {
  href: string;
  label: string;
  isCTA?: boolean;
  mobileOnly?: boolean;
}

const menuLinks: MenuLink[] = [
  { href: '/', label: 'Acasa', mobileOnly: true },
  { href: '#servicii', label: 'Servicii' },
  { href: '#preturi', label: 'Preturi' },
  { href: '#contact', label: 'Contact' },
  { href: '/portofoliu', label: 'Studii de caz', },
  { href: '/audit', label: 'Audit gratuit', isCTA: true },
];

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(true);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  
  const lastScrollY = useRef<number>(0);
  const pathname = usePathname();
  const router = useRouter();

  const navRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const isFirstHover = useRef<boolean>(true);

  const movePillTo = (target: HTMLElement, href: string) => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;

    setHoveredPath(href);

    const navRect = nav.getBoundingClientRect();
    const linkRect = target.getBoundingClientRect();
    const left = linkRect.left - navRect.left;
    const width = linkRect.width;

    if (isFirstHover.current) {
      gsap.fromTo(
        pill,
        { left: left + width / 2, width: 0, opacity: 0 },
        { left, width, opacity: 1, duration: 0.35, ease: 'power3.out', overwrite: true }
      );
      isFirstHover.current = false;
    } else {
      gsap.to(pill, { left, width, opacity: 1, duration: 0.35, ease: 'power3.out', overwrite: true });
    }
  };

  const hidePill = () => {
    isFirstHover.current = true;
    setHoveredPath(null);
    gsap.to(pillRef.current, { opacity: 0, duration: 0.25, ease: 'power2.out', overwrite: true });
  };

  useEffect(() => {
    const handleHashScroll = () => {
      if (!window.location.hash) return;
      const id = window.location.hash.substring(1);
      let attempts = 0;
      const maxAttempts = 50;
      const tryScroll = () => {
        const element = document.getElementById(id);
        if (element) {
          if (window.lenis) {
            window.lenis.scrollTo(element, { offset: -24 });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(tryScroll, 100);
        }
      };
      setTimeout(tryScroll, 100);
    };
    handleHashScroll();
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 12);
      if (currentScrollY > lastScrollY.current && currentScrollY > 120 && !mobileOpen) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = mobileOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileOpen]);

  const handleLinkClick = (
    href: string,
    e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    isMobile: boolean = false
  ): void => {
    e.preventDefault();
    if (isMobile) setMobileOpen(false);

    if (href.startsWith('#')) {
      if (pathname !== '/') {
        router.push(`/${href}`);
      } else {
        const id = href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          if (window.lenis) {
            window.lenis.scrollTo(element, { offset: -24 });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
      return;
    }

    if (href === '/') {
      if (pathname === '/') {
        if (window.lenis) {
          window.lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        router.push('/');
      }
      return;
    }

    router.push(href);
  };

  const desktopLinks = menuLinks.filter((link) => !link.mobileOnly && !link.isCTA);
  const ctaLink = menuLinks.find((link) => link.isCTA);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[60] transition-transform duration-500 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="px-4 md:px-6 pt-4">
          <div
            className={`mx-auto max-w-6xl rounded-[22px] border transition-all duration-300 ${
              scrolled
                ? 'border-white/12 bg-slate-950/78 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.28)]'
                : 'border-white/8 bg-slate-950/58 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.18)]'
            }`}
          >
            <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-3.5">
              <Link
                href="/"
                onClick={(e: MouseEvent<HTMLAnchorElement>) => handleLinkClick('/', e)}
                className="flex items-center gap-3 md:gap-4 shrink-0"
              >
                <Image
                  src="/digituralogo.png"
                  alt="Digitura Logo"
                  width={40}
                  height={40}
                  className="h-9 w-9 md:h-10 md:w-10"
                />
                <span
                  className="text-base md:text-lg font-bold text-white tracking-[0.12em] select-none"
                  style={{
                    fontFamily: 'Ethnocentric, sans-serif',
                    textShadow: '0 2px 12px rgba(0,0,0,0.18)',
                  }}
                >
                  DIGITURA
                </span>
              </Link>

              <nav className={`hidden lg:flex items-center gap-1 xl:gap-2 ${poppins.className}`}>
                <div
                  ref={navRef}
                  onMouseLeave={hidePill}
                  className="relative flex items-center gap-1 xl:gap-2"
                >
                  <div
                    ref={pillRef}
                    className="pointer-events-none absolute top-0 h-full rounded-[12px] bg-white opacity-0"
                    style={{ willChange: 'left, width, opacity' }}
                  />

                  {desktopLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.href, e)}
                      onMouseEnter={(e) => movePillTo(e.currentTarget, link.href)}
                      className={`relative z-10 px-4 xl:px-5 py-2.5 text-[15px] font-medium transition-colors duration-300 ${
                        hoveredPath === link.href ? 'text-slate-900' : 'text-slate-200'
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                {ctaLink && (
                  <>
                    <div className="mx-2 h-6 w-px bg-white/10" />
                    <a
                      href={ctaLink.href}
                      onClick={(e) => handleLinkClick(ctaLink.href, e)}
                      className="inline-flex items-center justify-center rounded-[14px] border border-teal-400/20 bg-white text-slate-950 px-5 xl:px-6 py-2.5 text-[15px] font-semibold shadow-[0_8px_24px_rgba(255,255,255,0.12)] hover:scale-[1.02] transition-all duration-200"
                    >
                      {ctaLink.label}
                    </a>
                  </>
                )}
              </nav>

              <button
                className="lg:hidden inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 text-white hover:bg-white/10 transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Deschide meniul"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[70] transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        <nav
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-slate-950/92 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <span
              className="text-lg font-bold text-white tracking-[0.12em]"
              style={{ fontFamily: 'Ethnocentric, sans-serif' }}
            >
              MENIU
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              aria-label="Inchide meniul"
            >
              <X size={26} />
            </button>
          </div>

          <div className="flex flex-col gap-2 p-6">
            {menuLinks.map((link, index) =>
              link.isCTA ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.href, e, true)}
                  className="mt-3 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3.5 text-slate-950 text-base font-semibold"
                  style={{
                    transform: mobileOpen ? 'translateX(0)' : 'translateX(40px)',
                    opacity: mobileOpen ? 1 : 0,
                    transition: `transform 0.45s ${index * 0.06}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.45s ${index * 0.06}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                  }}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.href, e, true)}
                  className="rounded-2xl px-4 py-3 text-lg font-medium text-slate-200 hover:bg-white/5 hover:text-white transition-colors"
                  style={{
                    transform: mobileOpen ? 'translateX(0)' : 'translateX(40px)',
                    opacity: mobileOpen ? 1 : 0,
                    transition: `transform 0.45s ${index * 0.06}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.45s ${index * 0.06}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                  }}
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;