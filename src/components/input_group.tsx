import * as React from 'react';

export interface IInputGroupProps {
  className?: string;
  children?: any;
  wrap?: boolean;
}

export const InputGroup: React.FC<IInputGroupProps> = (props) => {
  const className = `${props.className} ${props.wrap ? 'input_group-wrapped' : 'input_group'}`;

  const render = () => {
    if (props.children instanceof Array) {
      return props.children.map((el, i) =>
        el ? (
          <div key={i} className={'input_group__item'}>
            {el}
          </div>
        ) : null
      );
    } else {
      return <div className={'input_group__item'}>{props.children}</div>;
    }
  };

  return <div className={className}>{render()}</div>;
};
