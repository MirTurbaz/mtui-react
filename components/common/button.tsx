import * as React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

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

export const Button: React.FC<ButtonProps> = ({
  variant = 'link',
  height = 'default',
  color = 'default',
  toggled = false,
  ...props
}) => {
  const [clicked, setClicked] = useState(false);

  const classes = ['button', `button_variant_${variant}`, `button_height_${height}`, `button_color_${color}`];

  if (props.size) classes.push(`button_size_${props.size}`);
  if (props.padding) classes.push(`button_p_${props.padding}`);
  if (props.className) classes.push(props.className);
  if (props.disabled) classes.push('disabled');
  if (toggled) classes.push('button_pressed');
  if (clicked) classes.push('clicked');
  const className = classes.join(' ');

  if (props.href && !props.native) {
    return (
      <NavLink
        style={props.style}
        to={props.href}
        ref={props.btnRef}
        onClick={(e) => {
          props.onClick?.(e);
          setClicked(true);
          setTimeout(() => setClicked(false), 100);
        }}
        className={className}
        target={props.target}
      >
        {props.children}
      </NavLink>
    );
  } else {
    return (
      <a
        style={props.style}
        href={props.href}
        ref={props.btnRef}
        onClick={(e) => {
          props.onClick?.(e);
          setClicked(true);
          setTimeout(() => setClicked(false), 100);
        }}
        className={className}
        target={props.target}
        title={props.title}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        {props.children}
      </a>
    );
  }
};
