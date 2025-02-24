import * as React from 'react';
import { ReactElement } from 'react';
export interface SelectProps {
    className?: string;
    style?: React.CSSProperties;
    value?: SelectOption;
    label?: string;
    size?: 'default' | 'mini';
    options: SelectOption[];
    disabled?: boolean;
    onChange?: (value: SelectOption) => void;
    forcePositionBottom?: boolean;
    placeholder?: string;
    error?: string | boolean;
    wrapperStyle?: React.CSSProperties;
    wrapperClassName?: string;
}
export interface SelectOption {
    value: string | number;
    label: string | ReactElement;
}
export declare const Select: React.FC<SelectProps>;
