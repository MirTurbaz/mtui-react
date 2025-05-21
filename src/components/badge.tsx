import * as React from 'react';
import { ReactElement } from 'react';

export interface BadgeProps {
  className?: string;
  children?: ReactElement;
  value?: string | number;
}

export const Badge: React.FC<BadgeProps> = (props) => {
  return (
    <div className={`badge__wrapper ${props.className}`}>
      {props.children}
      {!isNaN(+props.value) && +props.value > 0 && <div className={'badge__value'}>{props.value}</div>}
    </div>
  );
};
