import { useEffect } from 'react';

// Acest hook blochează scroll-ul pe elementul <body>
// atunci când este activat.
const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    }

    // Când componenta este demontată sau isLocked devine false,
    // revenim la stilul original.
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLocked]); // Se re-execută doar când starea de blocare se schimbă
};

export default useScrollLock;