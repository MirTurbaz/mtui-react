import * as React from 'react';
export interface WysiwygProps {
    className?: string;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
}
export declare const Wysiwyg: React.FC<WysiwygProps>;
