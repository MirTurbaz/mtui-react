interface ResizeState {
    isMobile: boolean;
    isHugeScreen: boolean;
    isExtraLargeScreen: boolean;
    isLargeScreen: boolean;
    isSmallScreen: boolean;
    isTinyScreen: boolean;
    isTouchDevice: boolean;
}
export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export declare const useResize: () => ResizeState;
export {};
