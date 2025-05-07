import * as React from 'react';
import { ButtonProps, TypeBtnColor, TypeBtnHeight, TypeBtnVariant } from './types';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Button: React.FC<ButtonProps> = ({
  variant = 'link' as TypeBtnVariant,
  height = 'default' as TypeBtnHeight,
  color = 'default' as TypeBtnColor,
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
