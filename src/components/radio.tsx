import * as React from 'react';
import { ReactElement, useState } from 'react';

export interface RadioProps {
  className?: string;
  label?: ReactElement | string;
  checked: boolean;
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  variant?: 'default' | 'button';
}

export const Radio: React.FC<RadioProps> = (props) => {
  const [clicked, setClicked] = useState(false);

  let className = `radio__wrapper ${props.className} radio__wrapper-${props.variant ?? 'default'}`;
  if (props.disabled) className += ' radio__wrapper-disabled';
  if (clicked) className += ' clicked';
  if (props.checked) className += ' radio__wrapper-checked';

  return (
    <div
      style={props.style}
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        props.onClick();
        setClicked(true);
        setTimeout(() => setClicked(false), 200);
      }}
    >
      <div
        className={`radio__input ${props.checked && 'radio__input-checked'} ${props.disabled && 'radio__input-disabled'}`}
      ></div>
      <div className={'radio__label'}>{props.label}</div>
    </div>
  );
};
