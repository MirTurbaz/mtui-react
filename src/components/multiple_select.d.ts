import * as React from 'react';
import { ReactElement } from 'react';
import { SelectOption } from './select';
export interface SelectProps {
    className?: string;
    style?: React.CSSProperties;
    value?: (string | number)[];
    label?: string;
    options: SelectOption[];
    disabled?: boolean;
    onChange?: (value: (string | number)[]) => void;
    forcePositionBottom?: boolean;
    placeholder?: string;
    wrapperStyle?: React.CSSProperties;
    wrapperClassName?: string;
    renderOption?: (option: SelectOption, selected: boolean) => ReactElement | string;
    icon?: ReactElement | string;
    size?: 'default' | 'mini';
}
export declare const MultipleSelect: React.FC<SelectProps>;
