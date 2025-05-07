import * as React from 'react';
import { ReactElement } from 'react';

export interface LoaderProps {
  className?: string;
  width: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  variant?: 'circle' | 'square' | 'text';
  radius?: number;
  children?: ReactElement;
}

export const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <div
      className={`loader ${props.className ?? ''} loader-${props.variant ?? 'square'}`}
      style={{ ...props.style, height: props.height, width: props.width, borderRadius: props.radius }}
    >
      {props.children}
    </div>
  );
};
