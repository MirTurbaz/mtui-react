import * as React from 'react';
import { CSSProperties, ReactElement, useState } from 'react';

export interface SwitchProps {
  className?: string;
  label?: ReactElement | string;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  color?: 'green' | 'blue';
  style?: CSSProperties;
}

export const Switch: React.FC<SwitchProps> = ({ color = 'green', ...props }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <div
      className={`switch__wrapper ${props.className} ${props.disabled && 'switch__wrapper-disabled'} ${clicked && 'clicked'}`}
      style={props.style}
      onClick={(e) => {
        e.stopPropagation();
        props.onChange(!props.value);
        setClicked(true);
        setTimeout(() => setClicked(false), 200);
      }}
    >
      <div
        className={`switch__input ${props.value && `switch__input-checked switch__input-checked-${color}`} ${props.disabled && 'switch__input-disabled'} ${clicked && 'switch__input-clicked'}`}
      >
        <div className={'switch__circle'} />
      </div>
      {props.label && <div className={'switch__label'}>{props.label}</div>}
    </div>
  );
};
