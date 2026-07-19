import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, Flex, Select } from '../';
import { ChevronLeft, ChevronRight } from '../icons';
import { dayjs, Dayjs } from '../../shared/lib/date';
import { CalendarPanel } from './calendar_panel';
import { MONTHS_OPTIONS, SLIDE_ANIMATION_DURATION, YEAR_OPTIONS } from './constants';
import { ScrolledPanels } from './scrolled_panels';
import { IDateSelectorProps } from './types';

export const DateSelector: React.FC<IDateSelectorProps> = ({
  rangePicker = false,
  onDateClick,
  onHoverDate = null as (date: Dayjs | null) => void,
  twoPanels = false,
  ...props
}) => {
  const startDate = props.startDate?.isValid() ? props.startDate : null;
  const endDate = props.endDate?.isValid() ? props.endDate : null;
  const hoverDate = props.hoverDate?.isValid() ? props.hoverDate : null;
  const minDate = props.minDate?.isValid() ? props.minDate : null;
  const maxDate = props.maxDate?.isValid() ? props.maxDate : null;

  const [currentMonth, setCurrentMonth] = useState<Dayjs>((startDate ?? dayjs()).startOf('month'));
  const [displayedMonth, setDisplayedMonth] = useState<Dayjs>(currentMonth);
  const [direction, setDirection] = useState<'left' | 'right'>(null);

  const withInputs = rangePicker || twoPanels ? false : props.withInputs;

  const goToPrevMonth = () => {
    if (direction) return;
    setDirection('left');
  };

  const goToNextMonth = () => {
    if (direction) return;
    setDirection('right');
  };

  const commonPanelProps = {
    startDate,
    endDate,
    hoverDate,
    rangePicker,
    minDate,
    maxDate,
  };

  const getWrapperClassName = () => {
    const classes = ['date-selector__wrapper'];
    if (twoPanels) classes.push('date-selector__wrapper--two-panels');
    if (rangePicker) classes.push('date-selector__wrapper--range-selector');
    return classes.join(' ');
  };

  useEffect(() => {
    if (!direction) return;

    const newMonth = dayjs(currentMonth).add(direction == 'right' ? 1 : -1, 'month');
    setCurrentMonth(newMonth);

    const directionTimeout = setTimeout(() => {
      setDirection(null);
      setDisplayedMonth(newMonth);
    }, SLIDE_ANIMATION_DURATION);

    return () => clearTimeout(directionTimeout);
  }, [direction]);

  return (
    <div className={'date-selector'}>
      <Flex gap={32} className={getWrapperClassName()}>
        {withInputs ? (
          <Flex justify={'space-between'} className={'date-selector__header'} gap={12}>
            <Select
              label={''}
              size={'mini'}
              options={MONTHS_OPTIONS}
              value={MONTHS_OPTIONS.find(({ value }) => value == displayedMonth.month())}
              onChange={({ value }) => {
                const newMonth = dayjs(currentMonth).month(value as number);
                setCurrentMonth(newMonth);
                setDisplayedMonth(newMonth);
              }}
              wrapperClassName={'date-selector__input-wrapper'}
              className={'date-selector__input'}
            />
            <Select
              label={''}
              size={'mini'}
              options={YEAR_OPTIONS}
              value={YEAR_OPTIONS.find(({ value }) => value == displayedMonth.year())}
              onChange={({ value }) => {
                const newMonth = dayjs(currentMonth).year(value as number);
                setCurrentMonth(newMonth);
                setDisplayedMonth(newMonth);
              }}
              wrapperClassName={'date-selector__input-wrapper'}
              className={'date-selector__input'}
            />
          </Flex>
        ) : (
          <Flex justify={'space-between'} className={'date-selector__header'}>
            <Button
              variant={'link'}
              className={'date-selector__nav-button'}
              onClick={goToPrevMonth}
              icon={<ChevronLeft size={24} />}
            />
            <Button
              variant={'link'}
              className={'date-selector__nav-button'}
              onClick={goToNextMonth}
              icon={<ChevronRight size={24} />}
            />
          </Flex>
        )}
        <CalendarPanel {...commonPanelProps} month={currentMonth} onDateClick={onDateClick} onHoverDate={onHoverDate} />
        {twoPanels && (
          <CalendarPanel
            {...commonPanelProps}
            month={dayjs(currentMonth).add(1, 'month')}
            onDateClick={onDateClick}
            onHoverDate={onHoverDate}
          />
        )}
        {direction && (
          <ScrolledPanels {...commonPanelProps} month={displayedMonth} direction={direction} twoPanels={twoPanels} />
        )}
      </Flex>
    </div>
  );
};
