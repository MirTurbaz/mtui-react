import * as React from 'react';
import { CSSProperties, ReactElement } from 'react';
export interface SwitchProps {
    className?: string;
    label?: ReactElement | string;
    value: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
    color?: 'green' | 'blue';
    style?: CSSProperties;
}
export declare const Switch: React.FC<SwitchProps>;
