import * as React from 'react';
import { ReactElement } from 'react';

export interface ToggleProps {
  labelOn: string | ReactElement;
  labelOff: string | ReactElement;
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
  size?: 'normal' | 'small';
}

export const Toggle: React.FC<ToggleProps> = (props) => {
  return (
    <div className={`toggle__wrapper ${props.className} toggle-size_${props.size ?? 'normal'}`}>
      <div
        className={`toggle__background ${props.value === true && 'toggle__background-on'} ${props.value === null && 'toggle__background-unset'}`}
      />
      <div
        className={`toggle__btn_on ${props.value === true && 'toggle__btn_on-active'} ${props.value === null && 'toggle__btn_on-unset'}`}
        onClick={() => props.onChange(true)}
      >
        {props.labelOn}
      </div>
      <div
        className={`toggle__btn_off ${props.value === false && 'toggle__btn_off-active'} ${props.value === null && 'toggle__btn_off-unset'}`}
        onClick={() => props.onChange(false)}
      >
        {props.labelOff}
      </div>
    </div>
  );
};
