import * as React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IButtonProps, TypeBtnVariant, TypeBtnSize, TypeBtnType, TypeBtnColor, TypeBtnHtmlType } from './types';
import { Expand } from '../icons';

export const Button: React.FC<IButtonProps> = ({
  variant = 'link' as TypeBtnVariant,
  size = 'middle' as TypeBtnSize,
  color = 'default' as TypeBtnColor,
  htmlType = 'button' as TypeBtnHtmlType,
  toggled = false,
  icon = null as React.ReactElement,
  ...props
}) => {
  const [clicked, setClicked] = useState(false);

  let buttonType: TypeBtnType;
  if (!props.children && icon) {
    buttonType = 'icon-only';
  } else if (props.children && icon) {
    buttonType = 'label-with-icon';
  } else {
    buttonType = 'label-only';
  }

  const classes = [
    'button',
    `button_variant_${variant}`,
    `button_size_${size}`,
    `button_color_${color}`,
    `button_type_${buttonType}`,
  ];

  if (props.className) classes.push(props.className);
  if (props.disabled) classes.push('button--disabled');
  if (props.fullWidth) classes.push('button--full-width');
  if (props.dropdown) classes.push('button--with-dropdown');
  if (props.dropdown && props.opened) classes.push('button--dropdown-opened');
  if (toggled) classes.push('button--pressed');
  if (clicked) classes.push('button--clicked');
  const className = classes.join(' ');

  const renderChildren = () => (
    <>
      {icon}
      {props.children ? <span>{props.children}</span> : null}
      {props.dropdown ? <Expand rotated={props.opened} /> : null}
    </>
  );

  if (!props.href) {
    return (
      <button
        className={className}
        style={props.style}
        type={htmlType}
        ref={props.btnRef}
        title={props.title}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onClick={(e) => {
          props.onClick?.(e);
          setClicked(true);
          setTimeout(() => setClicked(false), 100);
        }}
      >
        {renderChildren()}
      </button>
    );
  } else if (!props.native) {
    return (
      <NavLink
        className={className}
        style={props.style}
        ref={props.btnRef}
        to={props.href}
        target={props.target}
        onClick={(e) => {
          props.onClick?.(e);
          setClicked(true);
          setTimeout(() => setClicked(false), 100);
        }}
      >
        {renderChildren()}
      </NavLink>
    );
  } else {
    return (
      <a
        className={className}
        style={props.style}
        ref={props.btnRef}
        title={props.title}
        href={props.href}
        target={props.target}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onClick={(e) => {
          props.onClick?.(e);
          setClicked(true);
          setTimeout(() => setClicked(false), 100);
        }}
      >
        {renderChildren()}
      </a>
    );
  }
};
