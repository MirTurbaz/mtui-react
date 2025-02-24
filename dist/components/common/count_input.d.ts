import * as React from 'react';
export interface CountInputProps {
    className?: string;
    value?: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
}
export declare const CountInput: React.FC<CountInputProps>;
