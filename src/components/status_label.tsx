import * as React from 'react';
import { ReactElement } from 'react';

import { Flex } from './flex';

export const STATUSES_CLASS_NAMES = {
  Новая: 'new',
  'Ожидает заезда': 'pending-arrival',
  Заехал: 'arrived',
  Выехал: 'done',
  Отменена: 'canceled',
  Незаезд: 'not-arrived',
};

interface StatusLabelProps {
  dummyStatus?: string;
  statusName?: string | ReactElement;
  color?: 'red' | 'orange' | 'blue' | 'green';
  className?: string;
  icon?: ReactElement;
  isBooking?: boolean;
}

export const StatusLabel: React.FC<StatusLabelProps> = (props) => {
  let className, value;

  if (props.dummyStatus) {
    className = STATUSES_CLASS_NAMES[props.dummyStatus];
    if (className === 'new' && !props.isBooking) {
      className = 'blue';
    }
    value = props.dummyStatus;
    if (!className) return props.dummyStatus;
  } else {
    className = props.color;
    value = props.statusName;
  }

  if (props.icon) {
    return (
      <Flex gap={'small'} className={`status_label status_label__${className} ${props.className}`}>
        {props.icon}
        <div>{value}</div>
      </Flex>
    );
  } else {
    return <label className={`status_label status_label__${className} ${props.className}`}>{value}</label>;
  }
};
