import * as React from 'react';
export interface TextAreaProps {
    className?: string;
    style?: React.CSSProperties;
    wrapperStyle?: React.CSSProperties;
    value?: string;
    disabled?: boolean;
    placeholder?: string;
    onChange?: (value: string) => void;
    onClick?: (e: any) => void;
    readonly?: boolean;
    bottomLabel?: string;
    onBlur?: () => void;
}
export declare const TextArea: React.FC<TextAreaProps>;
