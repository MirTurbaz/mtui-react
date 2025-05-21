import * as React from 'react';
import { ReactElement } from 'react';
export type TypePopupPlacement = 'bottom-end' | 'bottom-start' | 'bottom' | 'left-end' | 'left-start' | 'left' | 'right-end' | 'right-start' | 'right' | 'top-end' | 'top-start' | 'top';
export interface PopupProps {
    className?: string;
    children?: ReactElement | ReactElement[] | React.ReactNode;
    anchor?: HTMLElement;
    open: boolean;
    onClose: Function;
    onMouseUp?: Function;
    onMouseDown?: Function;
    onCloseBtn?: Function;
    id: string;
    title?: string | ReactElement;
    offset?: number;
    level?: number;
    placement?: TypePopupPlacement;
    /** Если задано true, в мобильной версии будет выглядеть и позиционироваться так же, как и на Desktop */
    preventMobileStyle?: boolean;
    container?: HTMLElement;
    disablePortal?: boolean;
    style?: React.CSSProperties;
    initContentHeight?: number;
}
export declare const Popup: React.FC<PopupProps>;
