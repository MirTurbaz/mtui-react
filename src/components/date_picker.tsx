import * as moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { DayPickerSingleDateController } from 'react-dates';
import 'react-dates/initialize';
import { CalendarDates } from './icons';
import { Popup, PopupProps } from './popup';
import { TextField, TextFieldProps } from './text_field';
import { DateFormatUtils } from './date_period_picker/utils';

export interface DatePickerProps extends TextFieldProps {
  id: string;
  onChangeDate?: (date: moment.Moment) => void;
  date?: moment.Moment;
  allowManualInput?: boolean;
  popupProps?: Partial<PopupProps>;
  minDate?: moment.Moment;
  maxDate?: moment.Moment;
  onOpen?: () => void;
}

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const [date, setDate] = useState<moment.Moment>(props.date);
  const [open, setOpen] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<HTMLElement>(null);

  const handleChange = (date: moment.Moment) => {
    setDate(date);
    props.onChange?.(value());
    props.onChangeDate?.(date);
  };

  useEffect(() => {
    setDate(props.date);
  }, [props.date]);

  const handleInputChange = (value: string) => {
    if (value === '') {
      handleChange(null);
    } else {
      const inputDate = moment(value, DateFormatUtils.DEFAULT_DATE_FORMAT, true);
      if (inputDate.isValid()) {
        handleChange(inputDate);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/[0-9.]/.test(event.key) &&
      event.key !== 'Backspace' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowRight'
    ) {
      event.preventDefault();
    }
  };

  const value = () => {
    if (date) {
      return date.format(DateFormatUtils.DEFAULT_DATE_FORMAT);
    } else {
      return '';
    }
  };

  const isOutsideRange = (day: moment.Moment) => {
    if (props.id === 'date_from') {
      return props.maxDate ? day.isAfter(props.maxDate, 'day') : false;
    }
    if (props.id === 'date_to') {
      return props.minDate ? day.isBefore(props.minDate, 'day') : false;
    }
    return false;
  };

  return (
    <>
      <TextField
        {...props}
        icon={props.icon ?? <CalendarDates />}
        readonly={!props.allowManualInput}
        inputRef={setAnchor}
        value={value()}
        onClick={(e) => {
          setOpen(true);
          props.onOpen?.();
        }}
        onChange={props.allowManualInput ? handleInputChange : undefined}
        onKeyDown={props.allowManualInput ? handleKeyDown : undefined}
      />
      <Popup
        id={`date_picker_${props.id}`}
        className={'date_picker__popup date_picker__popup-single'}
        onClose={() => setOpen(false)}
        open={open}
        title={props.placeholder}
        anchor={anchor}
        initContentHeight={320}
        {...props.popupProps}
      >
        {/*@ts-ignore*/}
        <DayPickerSingleDateController
          //@ts-ignore
          date={date}
          initialVisibleMonth={null}
          endDateId={''}
          numberOfMonths={1}
          renderCalendarInfo={null}
          startDateId={''}
          daySize={44}
          onDateChange={handleChange}
          hideKeyboardShortcutsPanel={true}
          renderDayContents={(date, dayTypes) => (
            <div className={`DayContent ${date.weekday() >= 5 && 'DayContent-Weekday'}`}>{date.date()}</div>
          )}
          focused
          onFocusChange={() => {}}
          isOutsideRange={isOutsideRange}
        />
      </Popup>
    </>
  );
};
