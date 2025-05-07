import * as React from 'react';
import 'tiny-slider/dist/tiny-slider.css';
interface PhotoSliderPopupProps {
    pictures: Picture[];
    open: boolean;
    onClose: () => void;
    anchor?: HTMLElement;
    id: string;
}
export interface Picture {
    src: string;
    description: string;
}
export declare const PhotoSliderPopup: React.FC<PhotoSliderPopupProps>;
export {};
