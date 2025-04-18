import * as React from 'react';

export interface ButtonProps {
  className?: string;
  children?: any;
  wrap?: boolean;
}

export const InputGroup: React.FC<ButtonProps> = (props) => {
  const className = `${props.className} ${props.wrap ? 'input_group-wrapped' : 'input_group'}`;

  const render = () => {
    if (props.children instanceof Array) {
      return props.children.map((el) => (el ? <div className={'input_group__item'}>{el}</div> : null));
    } else {
      return <div className={'input_group__item'}>{props.children}</div>;
    }
  };

  return <div className={className}>{render()}</div>;
};
