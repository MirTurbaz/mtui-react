import * as React from 'react';
import { Flex, TextField } from '../../';
import { CalendarDates } from '../../icons';
import { DEFAULT_DATE_FORMAT } from '../../../shared/constants/date';
import { capitalize } from '../../../shared/lib/string';
import { TypePickerVariant } from '../../../shared/types/date_picker';
import { DateSelector } from '../../date_selector';
import { MonthSelector } from '../../month_selector';
import { IRangePickerConfig } from './types';

export const RANGE_PICKER_CONFIG: Record<TypePickerVariant, IRangePickerConfig> = {
  date: {
    defaultIcon: <CalendarDates />,
    formatDate: (date) => date?.format(DEFAULT_DATE_FORMAT) ?? '',
    renderTwoInputs: (setAnchor, startDate, endDate, setShowCalendar, focusedInput, textFieldProps) => (
      <Flex align={'center'} gap={'middle'} className={'date-picker__wrapper'} ref={setAnchor}>
        <TextField
          icon={<CalendarDates />}
          readonly
          size={'mini'}
          style={{ minWidth: 200 }}
          value={startDate}
          placeholder={'Начало периода'}
          onClick={(e) => {
            e.stopPropagation();
            setShowCalendar(true);
          }}
          focus={focusedInput == 'first'}
          {...textFieldProps}
        />
        <TextField
          icon={<CalendarDates />}
          readonly
          size={'mini'}
          style={{ minWidth: 200 }}
          value={endDate}
          placeholder={'Конец периода'}
          onClick={(e) => {
            e.stopPropagation();
            setShowCalendar(true);
          }}
          focus={focusedInput == 'last'}
          {...textFieldProps}
        />
      </Flex>
    ),
    renderSelector: (dates, datesBoundaries, hoverDate, handleDateClick, setHoverDate, twoPanels) => (
      <DateSelector
        rangePicker
        startDate={dates?.startDate}
        endDate={dates?.endDate}
        hoverDate={hoverDate}
        minDate={datesBoundaries?.minDate}
        maxDate={datesBoundaries?.maxDate}
        onDateClick={handleDateClick}
        onHoverDate={setHoverDate}
        twoPanels={twoPanels}
      />
    ),
  },
  month: {
    defaultIcon: '',
    formatDate: (date) => capitalize(date?.format('MMMM YYYY')) ?? '',
    renderTwoInputs: (setAnchor, startDate, endDate, setShowCalendar, focusedInput, textFieldProps) => (
      <Flex align={'center'} gap={10} ref={setAnchor}>
        <TextField
          readonly
          style={{ minWidth: 100 }}
          value={startDate}
          onClick={(e) => {
            e.stopPropagation();
            setShowCalendar(true);
          }}
          focus={focusedInput == 'first'}
          {...textFieldProps}
        />
        <span>—</span>
        <TextField
          readonly
          style={{ minWidth: 100 }}
          value={endDate}
          onClick={(e) => {
            e.stopPropagation();
            setShowCalendar(true);
          }}
          focus={focusedInput == 'last'}
          {...textFieldProps}
        />
      </Flex>
    ),
    renderSelector: (dates, _, hoverDate, handleDateClick, setHoverDate) => (
      <MonthSelector
        rangePicker
        startMonth={dates?.startDate}
        endMonth={dates?.endDate}
        hoverMonth={hoverDate}
        onHoverMonth={setHoverDate}
        onMonthClick={handleDateClick}
      />
    ),
  },
};
