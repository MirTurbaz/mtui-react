import * as React from 'react';
import { Flex } from '../flex';
import { ILabelProps } from './types';

export const Label: React.FC<ILabelProps> = ({ children, icon, color, className }) => {
  const classes = ['status_label', `status_label__${color}`];
  if (className) classes.push(className);

  if (icon) {
    return (
      <Flex gap={'small'} className={classes.join(' ')}>
        {icon}
        <div>{children}</div>
      </Flex>
    );
  } else {
    return <div className={classes.join(' ')}>{children}</div>;
  }
};
