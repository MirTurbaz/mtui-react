import * as React from 'react';
import { useState } from 'react';
import { Button, Flex } from '../';
import { ChevronLeft, ChevronRight } from '../icons';
import { dayjs } from '../../shared/lib/date';
import { CalendarPanel } from './calendar_panel';
import { IMonthSelectorProps } from './types';

export const MonthSelector: React.FC<IMonthSelectorProps> = ({
  startMonth,
  endMonth,
  hoverMonth,
  onHoverMonth,
  onMonthClick,
  rangePicker = false,
}) => {
  const [currentYear, setCurrentYear] = useState<number>((startMonth ?? dayjs()).year());

  const goToPrevYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const goToNextYear = () => {
    setCurrentYear(currentYear + 1);
  };

  const getWrapperClassName = () => {
    const classes = ['date-selector__wrapper', 'date-selector__wrapper--month-selector'];

    if (rangePicker) classes.push('date-selector__wrapper--range-selector');

    return classes.join(' ');
  };

  return (
    <div className={'date-selector'}>
      <Flex gap={32} className={getWrapperClassName()}>
        <Flex justify={'space-between'} className={'date-selector__header'}>
          <Button
            variant={'link'}
            className={'date-selector__nav-button'}
            onClick={goToPrevYear}
            icon={<ChevronLeft size={24} />}
          />
          <Button
            variant={'link'}
            className={'date-selector__nav-button'}
            onClick={goToNextYear}
            icon={<ChevronRight size={24} />}
          />
        </Flex>
        <CalendarPanel
          rangePicker={rangePicker}
          startMonth={startMonth}
          endMonth={endMonth}
          hoverMonth={hoverMonth}
          onMonthClick={onMonthClick}
          onHoverMonth={onHoverMonth}
          selectedYear={currentYear}
        />
      </Flex>
    </div>
  );
};
