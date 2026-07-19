import * as React from 'react';
import { ReactElement } from 'react';
export interface RadioProps {
    className?: string;
    label?: ReactElement | string;
    checked: boolean;
    onClick: () => void;
    disabled?: boolean;
    style?: React.CSSProperties;
    variant?: 'default' | 'button';
}
export declare const Radio: React.FC<RadioProps>;
