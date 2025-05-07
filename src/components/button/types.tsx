import * as React from 'react';

export type TypeBtnVariant = 'link' | 'outline' | 'filled';

export type TypeBtnHeight = 'default' | 'small' | 'big';

export type TypeBtnColor = 'default' | 'primary' | 'success' | 'danger';

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  variant?: TypeBtnVariant;
  size?: 'full_width' | 'inline' | 'auto' | 'square';
  height?: TypeBtnHeight;
  color?: TypeBtnColor;
  toggled?: boolean;
  btnRef?: any;
  onClick?: Function;
  style?: any;
  disabled?: boolean;
  native?: boolean;
  target?: string;
  key?: any;
  padding?: 'small' | 'normal' | 'big';
  title?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
