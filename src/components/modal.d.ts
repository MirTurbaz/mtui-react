import * as React from 'react';
import { ReactElement } from 'react';
import { ScreenSize } from '../hooks/use_resize';
export interface ModalProps {
    className?: string;
    children?: ReactElement | ReactElement[];
    open: boolean;
    onClose: Function;
    title?: string | ReactElement;
    size?: ScreenSize;
    titleClassName?: string;
    bodyRef?: any;
    overlayClassName?: string;
    bodyProps?: any;
}
export declare const Modal: React.FC<ModalProps>;
