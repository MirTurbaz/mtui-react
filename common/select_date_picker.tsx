import * as moment from 'moment';
import * as React from 'react';
import { useState } from 'react';
import { DayPickerSingleDateController } from 'react-dates';
import { DateFormatUtils } from './date_period_picker.utils';
import { Popup } from './popup';
import { Select, SelectOption } from './select';
import { TextField, TextFieldProps } from './text_field';

export interface SelectDatePickerProps extends TextFieldProps {
  id: string;
  date?: moment.Moment;
  onChangeDate?: (date: moment.Moment) => void;
}

export const SelectDatePicker: React.FC<SelectDatePickerProps> = (props) => {
  const [date, setDate] = useState<moment.Moment>(props.date);
  const [open, setOpen] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<HTMLElement>(null);
  const [visibleMonth, setVisibleMonth] = useState<moment.Moment>(date);

  const monthOptions: SelectOption[] = Array.from({ length: 12 }, (_, i) => {
    const month = moment().month(i).format('MMMM');
    return {
      value: i,
      label: month.charAt(0).toUpperCase() + month.slice(1),
    };
  });

  const yearOptions: SelectOption[] = Array.from({ length: 100 }, (_, i) => {
    const year = moment().year() - i;
    return { value: year, label: String(year) };
  });

  const handleDateChange = (date: moment.Moment) => {
    setDate(date);
    setVisibleMonth(date);
    props.onChangeDate?.(date);
  };

  const handleMonthChange = (selectedOption: SelectOption) => {
    const newDate = moment(date).month(Number(selectedOption.value));
    setVisibleMonth(newDate);
    setDate(newDate);
    props.onChangeDate?.(date);
  };

  const handleYearChange = (selectedOption: SelectOption) => {
    const newDate = moment(date).year(Number(selectedOption.value));
    setVisibleMonth(newDate);
    setDate(newDate);
    props.onChangeDate?.(date);
  };

  const value = () => {
    if (date) {
      return date.format(DateFormatUtils.DEFAULT_DATE_FORMAT);
    } else {
      return '';
    }
  };

  return (
    <>
      <TextField {...props} inputRef={setAnchor} onClick={(e) => setOpen(true)} readonly value={value()} />
      <Popup
        open={open}
        onClose={() => setOpen(false)}
        id={`select_date_picker_${props.id}`}
        anchor={anchor}
        className={'date_picker__popup date_picker__popup-single select_date_picker__popup'}
      >
        <div className={'select_date_picker__top'}>
          <Select
            label={''}
            options={monthOptions}
            value={monthOptions.find((option) => option.value === visibleMonth.month())}
            onChange={handleMonthChange}
            wrapperClassName={'select_date_picker__month_select'}
            className={'select_date_picker__select'}
          />
          <Select
            label={''}
            options={yearOptions}
            value={yearOptions.find((option) => option.value === visibleMonth.year())}
            onChange={handleYearChange}
            wrapperClassName={'select_date_picker__year_select'}
            className={'select_date_picker__select'}
          />
        </div>

        <DayPickerSingleDateController
          date={date}
          key={visibleMonth.toString()}
          onDateChange={handleDateChange}
          focused
          onFocusChange={() => {}}
          initialVisibleMonth={null}
          startDateId={''}
          endDateId={''}
          numberOfMonths={1}
          daySize={44}
          hideKeyboardShortcutsPanel={true}
          renderDayContents={(date, dayTypes) => (
            <div className={`DayContent ${date.weekday() >= 5 && 'DayContent-Weekday'}`}>{date.date()}</div>
          )}
          noNavButtons
          renderCalendarInfo={null}
        />
      </Popup>
    </>
  );
};
