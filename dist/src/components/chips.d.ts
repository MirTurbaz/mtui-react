import * as React from 'react';
export interface ChipsProps {
    className?: string;
    chips: ChipType[];
    style?: React.CSSProperties;
    onDelete?: (value: any, label: string) => void;
}
export interface ChipType {
    label: string;
    value: any;
}
export declare const Chips: React.FC<ChipsProps>;
