import * as React from 'react';
import { HTMLProps, forwardRef } from 'react';

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

export const Flex = forwardRef<HTMLDivElement, IFlexProps>(
  (
    {
      vertical = false,
      wrap = false,
      flex,
      align,
      justify,
      gap,
      className = '',
      style = {},
      component: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    let flexClassName = `${className} flex-container ${vertical ? 'flex-container_vertical' : ''} ${wrap ? 'flex-container_wrap' : ''}`;

    const styles: React.CSSProperties = { ...style };

    if (justify) flexClassName += ` flex-container_justify_${justify}`;
    if (align) flexClassName += ` flex-container_align_${align}`;

    if (typeof gap === 'string') {
      flexClassName += ` flex-container_gap_${gap}`;
    } else if (gap != null) {
      styles.gap = gap;
    }

    if (flex) styles.flex = flex;

    return (
      <Component ref={ref} className={flexClassName} style={styles} {...props}>
        {children}
      </Component>
    );
  }
);
