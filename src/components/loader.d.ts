import * as React from 'react';
import { ReactElement } from 'react';
export interface LoaderProps {
    className?: string;
    width: number | string;
    height?: number | string;
    style?: React.CSSProperties;
    variant?: 'circle' | 'square' | 'text';
    radius?: number;
    children?: ReactElement;
}
export declare const Loader: React.FC<LoaderProps>;
