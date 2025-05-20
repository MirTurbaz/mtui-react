import * as React from 'react';
import { ReactElement } from 'react';
import { ScreenSize } from '../hooks';
export interface ModalProps {
    className?: string;
    children?: ReactElement | ReactElement[];
    open: boolean;
    onClose: Function;
    title?: string | ReactElement;
    size?: ScreenSize;
    titleClassName?: string;
    bodyClassName?: string;
    bodyRef?: any;
    overlayClassName?: string;
    bodyProps?: any;
    footer?: ReactElement | ReactElement[];
}
export declare const Modal: React.FC<ModalProps>;
