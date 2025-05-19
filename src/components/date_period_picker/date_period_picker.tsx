import * as moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { DayPickerRangeController, FocusedInputShape } from 'react-dates';
import { DatePeriodPickerProps, IDatesObject } from './types';
import { DateFormatUtils } from './utils';
import { Button } from '../button';
import { CalendarDates, Today } from '../icons';
import { Popup } from '../popup';
import { TextField } from '../text_field';
import { useResize } from '../../hooks';

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
        <Button
          variant={'outline'}
          btnRef={setAnchor}
          onClick={() => setOpen(true)}
          icon={(props.icon as React.ReactElement) ?? <Today />}
        />
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
          onClick={(_) => {
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
          renderDayContents={(date) => (
            <div className={`DayContent ${date.weekday() >= 5 && 'DayContent-Weekday'}`}>{date.date()}</div>
          )}
        />
      </Popup>
    </>
  );
};
