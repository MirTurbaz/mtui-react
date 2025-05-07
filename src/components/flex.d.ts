import * as React from 'react';
import { HTMLProps } from 'react';
export interface IFlexProps extends Omit<HTMLProps<any>, 'wrap'> {
    /** Is direction of the flex vertical, use flex-direction: column */
    vertical?: boolean;
    /** flex CSS shorthand properties */
    flex?: number | string | 'unset';
    /** Sets the alignment of elements in the direction of the cross axis */
    align?: 'normal' | 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    /** Sets the alignment of elements in the direction of the main axis */
    justify?: 'normal' | 'start' | 'end' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'center';
    /** Sets the gap between grids */
    gap?: number | 'unset' | 'small' | 'middle' | 'large';
    wrap?: boolean;
    className?: string;
    component?: React.ElementType;
    children: any;
}
export declare const Flex: React.ForwardRefExoticComponent<Omit<IFlexProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
