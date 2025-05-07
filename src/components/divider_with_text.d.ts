import * as React from 'react';
import { HTMLAttributes, ReactElement } from 'react';
interface DividerWithTextProps extends HTMLAttributes<HTMLDivElement> {
    text: string | ReactElement | React.ReactNode;
}
export declare const DividerWithText: React.FC<DividerWithTextProps>;
export {};
