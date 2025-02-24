import * as moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { DayPickerRangeController, FocusedInputShape } from 'react-dates';
import 'react-dates/initialize';
import { useResize } from '../../hooks/use_resize';
import CalendarDates from '../icons/calendar_dates';
import Today from '../icons/today';
import { Button } from './button';
import { DatePeriodPickerProps, IDatesObject } from './date_period_picker.dto';
import { DateFormatUtils } from './date_period_picker.utils';
import { Popup } from './popup';
import { TextField } from './text_field';

export const DatePeriodPicker: React.FC<DatePeriodPickerProps> = ({ allowSingleDate = false, ...props }) => {
  const [endDate, setEndDate] = useState<moment.Moment>(props.endDate);
  const [startDate, setStartDate] = useState<moment.Moment>(props.startDate);
  const [focusedDate, setFocusedDate] = useState<FocusedInputShape>('startDate');
  const [open, setOpen] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<HTMLElement>(null);

  const { isMobile } = useResize();

  const handleChange = (dates: IDatesObject) => {
    setStartDate(dates.startDate);
    setEndDate(dates.endDate);
    if (dates.startDate && dates.endDate) setFocusedDate('startDate');
  };

  const handleFocusChange = (focus: FocusedInputShape) => {
    setFocusedDate(!focus ? 'startDate' : focus);
    if (focus == 'endDate') setEndDate(null);
    if (!focus) setOpen(false);
  };

  const value = () => {
    let valueText = '';
    if (allowSingleDate) {
      if (startDate) {
        valueText += startDate.format(DateFormatUtils.DEFAULT_DATE_FORMAT);
      }

      if (endDate) {
        if (!valueText) valueText = '...';
        valueText += ` - ${endDate.format(DateFormatUtils.DEFAULT_DATE_FORMAT)}`;
      }
    } else {
      if (startDate && endDate) {
        return `${startDate.format(DateFormatUtils.DEFAULT_DATE_FORMAT)} - ${endDate.format(DateFormatUtils.DEFAULT_DATE_FORMAT)}`;
      }
    }
    return valueText;
  };

  useEffect(() => {
    if ((startDate && endDate) || (allowSingleDate && (startDate || endDate))) {
      props.onChangeDates?.(startDate, endDate);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (props.startDate != startDate) setStartDate(props.startDate);
    if (props.endDate != endDate) setEndDate(props.endDate);
  }, [props.startDate, props.endDate]);

  const renderInputs = () => {
    if (props.variant == 'twoInputs') {
      return (
        <div className={'date_picker_range__wrapper'}>
          <TextField
            {...props}
            icon={props.icon ?? <CalendarDates />}
            readonly={true}
            style={{ minWidth: 200 }}
            inputRef={setAnchor}
            value={startDate?.format(DateFormatUtils.DEFAULT_DATE_FORMAT)}
            placeholder={'Начало периода'}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          />
          <TextField
            {...props}
            icon={props.icon ?? <CalendarDates />}
            readonly={true}
            style={{ minWidth: 200 }}
            value={endDate?.format(DateFormatUtils.DEFAULT_DATE_FORMAT)}
            placeholder={'Конец периода'}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          />
        </div>
      );
    } else if (props.variant == 'button') {
      return (
        <Button variant={'outline'} size={'square'} btnRef={setAnchor} onClick={() => setOpen(true)}>
          {props.icon ?? <Today />}
        </Button>
      );
    } else {
      return (
        <TextField
          {...props}
          icon={props.icon ?? <CalendarDates />}
          readonly={true}
          style={{ minWidth: 200 }}
          wrapperRef={setAnchor}
          value={value()}
          onClick={(e) => {
            setOpen(true);
          }}
        />
      );
    }
  };

  return (
    <>
      {renderInputs()}
      <Popup
        id={`date_picker_${props.id}`}
        className={'date_picker__popup'}
        onClose={() => setOpen(false)}
        open={open}
        title={props.placeholder}
        anchor={anchor}
        placement={props.placement}
        disablePortal={props.disablePortal}
      >
        {/*@ts-ignore*/}
        <DayPickerRangeController
            /*@ts-ignore*/
            endDate={endDate}
            /*@ts-ignore*/
            startDate={startDate}
            focusedInput={focusedDate}
            initialVisibleMonth={null}
            onDatesChange={handleChange}
            onFocusChange={handleFocusChange}
            endDateId={''}
            numberOfMonths={isMobile ? 1 : 2}
            renderCalendarInfo={null}
            startDateId={''}
            daySize={44}
            hideKeyboardShortcutsPanel={true}
            renderDayContents={(date, dayTypes) => (
                <div className={`DayContent ${date.weekday() >= 5 && 'DayContent-Weekday'}`}>{date.date()}</div>
            )}
        />
      </Popup>
    </>
  );
};
