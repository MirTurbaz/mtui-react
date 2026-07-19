import * as React from 'react';
import { Flex } from '../';
import { dayjs, Dayjs } from '../../shared/lib/date/dayjs';
import { MONTHS_SHORT_NAMES } from './constants';
import { ICalendarPanelProps } from './types';

export const CalendarPanel: React.FC<ICalendarPanelProps> = ({
  startMonth,
  endMonth,
  hoverMonth = null as Dayjs,
  selectedYear,
  onMonthClick,
  onHoverMonth = null as (date: Dayjs | null) => void,
  rangePicker = false,
}) => {
  const getMonth = (monthNumber: number): Dayjs => dayjs().year(selectedYear).month(monthNumber).date(1);

  const handleHoverMonth = (monthNumber: number | null) => {
    if (monthNumber == null) return onHoverMonth?.(null);

    onHoverMonth?.(getMonth(monthNumber));
  };

  const handleClickMonth = (monthNumber: number) => onMonthClick?.(getMonth(monthNumber));

  const getCellClassName = (monthNumber: number) => {
    const classes = ['date-selector__cell'];
    const month = dayjs().year(selectedYear).month(monthNumber);

    // Selected cells
    if (startMonth && month.isSame(startMonth, 'month')) {
      classes.push('date-selector__cell--selected');

      if (!endMonth && hoverMonth?.isBefore(startMonth, 'month')) {
        classes.push('date-selector__cell--selected-end');
      } else if (rangePicker && !startMonth.isSame(endMonth, 'month')) {
        classes.push('date-selector__cell--selected-start');
      }
    } else if (endMonth && month.isSame(endMonth, 'month')) {
      classes.push('date-selector__cell--selected', 'date-selector__cell--selected-end');
    }

    // Cells in range
    if (rangePicker && startMonth && (endMonth ?? hoverMonth) && !startMonth.isSame(endMonth ?? hoverMonth, 'month')) {
      if (endMonth && month.isAfter(startMonth, 'month') && month.isBefore(endMonth, 'month')) {
        classes.push('date-selector__cell--in-range');
      } else if (
        !endMonth &&
        hoverMonth &&
        month.isAfter(dayjs.min(startMonth, dayjs(hoverMonth).subtract(1, 'month')), 'month') &&
        month.isBefore(dayjs.max(startMonth, dayjs(hoverMonth).add(1, 'month')), 'month')
      ) {
        classes.push('date-selector__cell--in-range');
      }
    }

    if (monthNumber == hoverMonth?.month() && classes.length == 1) {
      classes.push('date-selector__cell--hover');
    }

    if (month.isSame(dayjs(), 'month')) {
      classes.push('date-selector__cell--today');
    }

    return classes.join(' ');
  };

  const renderHeader = () => {
    return (
      <Flex justify={'center'} align={'center'} className={'date-selector__month-label'}>
        {selectedYear}
      </Flex>
    );
  };

  const renderGrid = () => {
    return (
      <div className={'date-selector__grid'}>
        {MONTHS_SHORT_NAMES.map((monthName, monthIndex) => (
          <div
            key={monthIndex}
            className={getCellClassName(monthIndex)}
            onMouseEnter={() => handleHoverMonth(monthIndex)}
            onMouseLeave={() => handleHoverMonth(null)}
            onClick={() => handleClickMonth(monthIndex)}
          >
            <div className={'date-selector__cell-inner'}>{monthName}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={'date-selector__panel'}>
      {renderHeader()}
      {renderGrid()}
    </div>
  );
};
