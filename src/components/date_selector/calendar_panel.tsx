import * as React from 'react';
import { Flex } from '../flex';
import { dayjs, Dayjs } from '../../shared/lib/date';
import { capitalize } from '../../shared/lib/string';
import { WEEK_DAYS } from './constants';
import { ICalendarPanelProps } from './types';

export const CalendarPanel: React.FC<ICalendarPanelProps> = ({
  startDate = null as Dayjs,
  endDate = null as Dayjs,
  hoverDate = null as Dayjs,
  onDateClick,
  onHoverDate = null as (date: Dayjs | null) => void,
  month: currentMonth,
  rangePicker = false,
  minDate,
  maxDate,
}) => {
  const firstDay = (currentMonth.day() + 6) % 7;

  const isWeekend = (date: Dayjs) => date.day() === 0 || date.day() === 6;

  const getCellClassName = (date: Dayjs) => {
    const classes = ['date-selector__cell'];

    // Selected cells
    if (date.isSame(startDate, 'day')) {
      classes.push('date-selector__cell--selected');

      if (!endDate && hoverDate?.isBefore(startDate)) {
        classes.push('date-selector__cell--selected-end');
      } else if (rangePicker && !startDate.isSame(endDate)) {
        classes.push('date-selector__cell--selected-start');
      }
    } else if (date.isSame(endDate, 'day')) {
      classes.push('date-selector__cell--selected', 'date-selector__cell--selected-end');
    }

    // Cells in range
    if (rangePicker && startDate && (endDate ?? hoverDate) && !startDate.isSame(endDate ?? hoverDate, 'day')) {
      if (endDate && date.isAfter(startDate) && date.isBefore(endDate)) {
        classes.push('date-selector__cell--in-range');
      } else if (
        !endDate &&
        hoverDate &&
        date.isAfter(dayjs.min(startDate, hoverDate.subtract(1, 'day'))) &&
        date.isBefore(dayjs.max(startDate, hoverDate.add(1, 'day')))
      ) {
        classes.push('date-selector__cell--in-range');
      }
    }

    // Disabled cell
    if ((minDate && date.isBefore(minDate, 'day')) || (maxDate && date.isAfter(maxDate, 'day'))) {
      classes.push('date-selector__cell--disabled');
    }

    if (date.isSame(hoverDate, 'day') && classes.length == 1) {
      classes.push('date-selector__cell--hover');
    }

    if (date.isSame(dayjs(), 'day')) {
      classes.push('date-selector__cell--today');
    }

    if (isWeekend(date)) {
      classes.push('date-selector__cell--weekend');
    }

    return classes.join(' ');
  };

  getCellClassName.weekday = (index) => {
    const classes = ['date-selector__cell', 'date-selector__cell--weekday'];
    if (index > 4) classes.push('date-selector__cell--weekend');
    return classes.join(' ');
  };

  const calendarDays: (Dayjs | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array(currentMonth.daysInMonth())
      .fill(null)
      .map((_, i) => currentMonth.date(i + 1)),
  ];

  const renderHeader = () => {
    return (
      <Flex justify={'center'} align={'center'} className={'date-selector__month-label'}>
        {capitalize(currentMonth.format('MMMM, YYYY'))}
      </Flex>
    );
  };

  const renderGrid = () => {
    return (
      <div className={'date-selector__grid'}>
        {WEEK_DAYS.map((day, i) => (
          <div key={day} className={getCellClassName.weekday(i)}>
            {day}
          </div>
        ))}
        {calendarDays.map((date, i) =>
          date ? (
            <div
              key={i}
              className={getCellClassName(date)}
              onClick={() => onDateClick(date)}
              onMouseEnter={() => onHoverDate?.(date)}
              onMouseLeave={() => onHoverDate?.(null)}
            >
              <div className={'date-selector__cell-inner'}>{date.date()}</div>
            </div>
          ) : (
            <div key={i} className={`date-selector__cell date-selector__cell--empty`}></div>
          )
        )}
      </div>
    );
  };

  return (
    <Flex vertical gap={'middle'} className={'date-selector__panel'}>
      {renderHeader()}
      {renderGrid()}
    </Flex>
  );
};
