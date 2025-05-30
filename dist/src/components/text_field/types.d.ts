import * as React from 'react';
import { HTMLInputTypeAttribute, ReactElement } from 'react';
interface ITextFieldFocusProps {
    focus?: boolean;
    autofocus?: boolean;
}
interface ITextFieldValueProps {
    value?: string;
    onChange?: (value: string) => void;
    onClear?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Игнорируется, если не задано `TextField[onClear]` */
    clearIcon?: ReactElement;
}
interface ITextFieldHandlersProps {
    onFocus?: () => void;
    onBlur?: () => void;
    onMouseDown?: (event: React.MouseEvent<HTMLInputElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onEnter?: () => void;
}
export interface TextFieldProps extends ITextFieldFocusProps, ITextFieldValueProps, ITextFieldHandlersProps {
    className?: string;
    style?: React.CSSProperties;
    wrapperStyle?: React.CSSProperties;
    icon?: ReactElement | string;
    disabled?: boolean;
    placeholder?: string;
    size?: 'default' | 'mini';
    readonly?: boolean;
    wrapperRef?: any;
    inputRef?: any;
    type?: HTMLInputTypeAttribute;
    isInteger?: boolean;
    bottomLabel?: string;
    min?: number;
    max?: number;
    key?: any;
    mask?: string | string[];
    error?: string | boolean;
    wrapperClassName?: string;
    hideSpinButtons?: boolean;
    required?: boolean;
    uncontrolled?: boolean;
    borderless?: boolean;
}
export {};
