import { useEffect } from 'react';

// Hook care blochează scroll-ul pe desktop și mobil (inclusiv iOS)
const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const body = document.body;
    const html = document.documentElement;
    const originalBodyOverflow = body.style.overflow;
    const originalHtmlOverflow = html.style.overflow;

    const preventTouch = (e: TouchEvent) => e.preventDefault();

    if (isLocked) {
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
      document.addEventListener('touchmove', preventTouch, { passive: false });
    } else {
      body.style.overflow = originalBodyOverflow;
      html.style.overflow = originalHtmlOverflow;
      document.removeEventListener('touchmove', preventTouch);
    }

    return () => {
      body.style.overflow = originalBodyOverflow;
      html.style.overflow = originalHtmlOverflow;
      document.removeEventListener('touchmove', preventTouch);
    };
  }, [isLocked]);
};

export default useScrollLock;