import * as React from 'react';
import { Flex } from '../';
import { dayjs } from '../../shared/lib/date/dayjs';
import { CalendarPanel } from './calendar_panel';
import { IScrolledPanelsProps } from './types';

export const ScrolledPanels: React.FC<IScrolledPanelsProps> = ({ month, twoPanels, direction, ...props }) => {
  return (
    <Flex gap={32} className={`date-selector__scrolled-panels date-selector__scrolled-panels--slide-${direction}`}>
      {Array(twoPanels ? 3 : 2)
        .fill('')
        .map((_, i) => (
          <CalendarPanel
            key={i}
            {...props}
            onDateClick={() => null}
            month={dayjs(month).add(i + +(direction == 'right') - 1, 'months')}
          />
        ))}
    </Flex>
  );
};
