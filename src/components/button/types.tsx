import * as React from 'react';
import { MouseEventHandler } from 'react';

export type TypeBtnColor = 'default' | 'primary' | 'success' | 'danger';
export type TypeBtnSize = 'small' | 'middle' | 'big';
export type TypeBtnType = 'label-only' | 'label-with-icon' | 'icon-only';
export type TypeBtnVariant = 'link' | 'outline' | 'filled';
export type TypeBtnHtmlType = 'submit' | 'reset' | 'button';

interface IBtnWithLinkProps {
  href?: string;
  /** Только для Button[href!=null] */
  target?: string;
  /** Только для Button[href!=null] */
  native?: boolean;
}

interface IBtnWithoutLinkProps {
  /** Только для Button[href=null]
   * @default button */
  htmlType?: TypeBtnHtmlType;
}

interface IBtnDropdownProps {
  dropdown?: boolean;
  /** Только для Button[dropdown=true] */
  opened?: boolean;
}

export interface IButtonProps extends IBtnWithLinkProps, IBtnWithoutLinkProps, IBtnDropdownProps {
  /** @default default */
  color?: TypeBtnColor;
  /** @default middle */
  size?: TypeBtnSize;
  /** @default link */
  variant?: TypeBtnVariant;
  icon?: React.ReactElement;
  title?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  toggled?: boolean;
  className?: string;
  style?: any;
  btnRef?: any;
  onClick?: Function;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  children?: string | number;
}
