import * as React from 'react';
import { HTMLAttributes } from 'react';
interface DividerProps extends HTMLAttributes<HTMLDivElement> {
    outerPadding?: number;
    marginVertical?: number;
    vertical?: boolean;
}
export declare const Divider: React.FC<DividerProps>;
export {};
