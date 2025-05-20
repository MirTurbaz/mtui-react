import * as React from 'react';
import { HTMLProps } from 'react';
/**
 * - 'small' stands for `gap: 8px`
 * - 'middle' stands for `gap: 16px`
 * - 'large' stands for `gap: 24px`
 */
export type TypeFlexGap = number | 'unset' | 'small' | 'middle' | 'large';
export interface IFlexProps extends Omit<HTMLProps<any>, 'wrap'> {
    /** If direction of the flex vertical, `flex-direction: column` is used */
    vertical?: boolean;
    /** flex CSS shorthand properties */
    flex?: number | string | 'unset';
    /** Sets the alignment of elements in the direction of the cross axis */
    align?: 'normal' | 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    /** Sets the alignment of elements in the direction of the main axis */
    justify?: 'normal' | 'start' | 'end' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'center';
    /** Sets the gap between grids */
    gap?: TypeFlexGap;
    /** If true `flex-wrap: wrap` is used */
    wrap?: boolean;
    className?: string;
    /** @default div */
    component?: React.ElementType;
    children: any;
}
export declare const Flex: React.ForwardRefExoticComponent<Omit<IFlexProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
