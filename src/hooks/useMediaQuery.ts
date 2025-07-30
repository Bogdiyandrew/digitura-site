import { useState, useEffect } from 'react';

export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Protecție pentru SSR - verifică dacă suntem în browser
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia(query);
    
    // Setează starea inițială
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    // Funcția listener pentru schimbările media query
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Adaugă listener-ul pentru schimbări
    if (media.addEventListener) {
      media.addEventListener('change', listener);
    } else {
      // Fallback pentru browsere mai vechi
      media.addListener(listener);
    }
    
    // Cleanup function
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener);
      } else {
        // Fallback pentru browsere mai vechi
        media.removeListener(listener);
      }
    };
  }, [matches, query]);

  return matches;
}