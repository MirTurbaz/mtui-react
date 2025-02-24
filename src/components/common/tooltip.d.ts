import * as React from 'react';
import { ReactElement } from 'react';
export interface TooltipProps {
    className?: string;
    content: string | ReactElement | ReactElement[];
    title?: string | ReactElement | ReactElement[];
    children?: ReactElement | ReactElement[] | string | number;
    animated?: boolean;
    onChange?: (value: boolean) => void;
}
export declare const Tooltip: React.FC<TooltipProps>;
