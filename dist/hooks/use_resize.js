import { useEffect, useState } from 'react';
const SCREEN_XS = 400;
const SCREEN_SM = 576;
const SCREEN_MD = 768;
const SCREEN_LG = 992;
const SCREEN_XL = 1200;
const SCREEN_XXL = 1600;
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator['msMaxTouchPoints'] > 0;
}
export const useResize = () => {
    const [resizeState, setResizeState] = useState({
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
//# sourceMappingURL=use_resize.js.map