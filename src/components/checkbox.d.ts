import * as React from 'react';
import { ReactElement } from 'react';
export interface CheckboxProps {
    className?: string;
    label?: ReactElement | string;
    value: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
    withBackground?: boolean;
    style?: React.CSSProperties;
}
export declare const Checkbox: React.FC<CheckboxProps>;
