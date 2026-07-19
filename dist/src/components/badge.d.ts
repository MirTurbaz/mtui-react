import * as React from 'react';
import { ReactElement } from 'react';
export interface BadgeProps {
    className?: string;
    children?: ReactElement;
    value?: string | number;
}
export declare const Badge: React.FC<BadgeProps>;
