import { useEffect, useState } from 'react';

const SCREEN_XS = 400;
const SCREEN_SM = 576;
const SCREEN_MD = 768;
const SCREEN_LG = 992;
const SCREEN_XL = 1200;
const SCREEN_XXL = 1600;

interface ResizeState {
  isMobile: boolean;
  isHugeScreen: boolean;
  isExtraLargeScreen: boolean;
  isLargeScreen: boolean;
  isSmallScreen: boolean;
  isTinyScreen: boolean;
  isTouchDevice: boolean;
}

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator['msMaxTouchPoints'] > 0;
}

export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const useResize = (): ResizeState => {
  const [resizeState, setResizeState] = useState<ResizeState>({
    isMobile: window.innerWidth <= SCREEN_MD,
    isHugeScreen: window.innerWidth <= SCREEN_XXL,
    isExtraLargeScreen: window.innerWidth <= SCREEN_XL,
    isLargeScreen: window.innerWidth <= SCREEN_LG,
    isSmallScreen: window.innerWidth <= SCREEN_SM,
    isTinyScreen: window.innerWidth <= SCREEN_XS,
    isTouchDevice: isTouchDevice(),
  });

  useEffect(() => {
    const handleResize = () => {
      setResizeState({
        isMobile: window.innerWidth <= SCREEN_MD,
        isHugeScreen: window.innerWidth <= SCREEN_XXL,
        isExtraLargeScreen: window.innerWidth <= SCREEN_XL,
        isLargeScreen: window.innerWidth <= SCREEN_LG,
        isSmallScreen: window.innerWidth <= SCREEN_SM,
        isTinyScreen: window.innerWidth <= SCREEN_XS,
        isTouchDevice: isTouchDevice(),
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return resizeState;
};
