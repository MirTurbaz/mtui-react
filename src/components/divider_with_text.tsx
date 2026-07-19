import * as React from 'react';
import { HTMLAttributes, ReactElement } from 'react';

interface DividerWithTextProps extends HTMLAttributes<HTMLDivElement> {
  text: string | ReactElement | React.ReactNode;
}

export const DividerWithText: React.FC<DividerWithTextProps> = ({ text, className, ...props }) => {
  return (
    <div className={`divider_with_text__wrapper ${className}`} {...props}>
      <div className={'divider_with_text__text'}>{text}</div>
      <div className={'divider_with_text__line'} />
    </div>
  );
};
