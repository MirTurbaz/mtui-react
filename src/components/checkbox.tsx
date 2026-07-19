import * as React from 'react';
import { ReactElement, useState } from 'react';

export interface CheckboxProps {
  className?: string;
  label?: ReactElement | string;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  withBackground?: boolean;
  style?: React.CSSProperties;
}

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const [clicked, setClicked] = useState(false);
  return (
    <div
      className={`checkbox__wrapper ${props.className} ${props.disabled && 'checkbox__wrapper-disabled'} ${clicked && 'clicked'}`}
      style={props.style}
      onClick={(e) => {
        e.stopPropagation();
        props.onChange(!props.value);
        setClicked(true);
        setTimeout(() => setClicked(false), 200);
      }}
    >
      <div
        className={`checkbox__input ${props.value && 'checkbox__input-checked'} ${props.disabled && 'checkbox__input-disabled'} ${props.withBackground && 'checkbox__input-with_background'}`}
      >
        <div className={'checkbox__checkmark-first'} />
        <div className={'checkbox__checkmark-second'} />
      </div>
      {props.label && <div className={'checkbox__label'}>{props.label}</div>}
    </div>
  );
};
