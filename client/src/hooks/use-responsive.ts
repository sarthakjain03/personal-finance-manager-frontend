import { useEffect, useState } from 'react';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const useResponsive = (): ResponsiveState => {
  const getMatches = (): ResponsiveState => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 0;
    return {
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
    };
  };

  const [state, setState] = useState<ResponsiveState>(getMatches);

  useEffect(() => {
    const handleResize = () => {
      setState(getMatches());
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Run on mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return state;
};

export default useResponsive;
