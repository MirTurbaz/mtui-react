import * as React from 'react';
import { ReactElement } from 'react';
export interface AccordionProps {
    className?: string;
    children?: ReactElement | React.ReactNode;
    header: string | ReactElement;
    opened?: boolean;
    onToggle?: () => void;
    showExpand?: boolean;
    scrollOnOpen?: boolean;
    dataId?: string | number;
}
export declare const Accordion: React.FC<AccordionProps>;
