import * as React from 'react';
import { useEffect, useState } from 'react';
import { Popup, PopupProps, TextField, TextFieldProps } from '../';
import { DEFAULT_DATE_FORMAT } from '../../shared/constants/date';
import { dayjs, Dayjs } from '../../shared/lib/date';
import { TypePickerVariant } from '../../shared/types/date_picker';
import { DateSelector } from '../date_selector';
import { MonthSelector } from '../month_selector';
import { RangePicker } from '../range_picker';
import { DATE_PICKER_CONFIG } from './inner/config';
import { IDatePickerConfig, TypeDatePicker } from './inner/types';

const DatePicker: TypeDatePicker = ({
  picker = 'date' as TypePickerVariant,
  textFieldProps = {} as Partial<TextFieldProps>,
  popupProps = {} as Partial<PopupProps>,
  ...props
}) => {
  const minDate = props.minDate?.isValid() ? props.minDate : null;
  const maxDate = props.maxDate?.isValid() ? props.maxDate : null;

  const [date, setDate] = useState<Dayjs>(props[picker]?.isValid() ? props[picker] : null);
  const [hoverDate, setHoverDate] = useState<Dayjs | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<HTMLElement>(null);

  const { defaultIcon, getValue }: IDatePickerConfig = DATE_PICKER_CONFIG[picker] ?? {
    defaultIcon: null,
    getValue: () => null,
  };

  const handleChange = (newValue: Dayjs) => {
    if ((minDate && newValue.isBefore(minDate, picker)) || (maxDate && newValue.isAfter(maxDate, picker))) {
      return;
    }

    setDate(newValue);

    if (picker == 'date') {
      props.onChangeDate?.(newValue);
    } else if (picker == 'month') {
      props.onChangeMonth?.(newValue);
    }

    setShowCalendar(false);
  };

  const handleInputChange = (value: string) => {
    if (picker != 'date' && !props.allowManualInput) return;

    if (value === '') {
      handleChange(null);
    } else {
      const inputDate = dayjs(value, DEFAULT_DATE_FORMAT);
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

  useEffect(() => {
    if (showCalendar) {
      props.onOpen?.();
    } else {
      props.onClose?.();
    }
  }, [showCalendar]);

  useEffect(() => {
    if ((props[picker] == null && date == null) || props[picker]?.isSame(date, picker)) return;

    setDate(props[picker]);
  }, [props[picker]]);

  return (
    <>
      <TextField
        icon={defaultIcon}
        readonly={!props.allowManualInput}
        inputRef={setAnchor}
        value={getValue(date)}
        onClick={() => setShowCalendar(true)}
        onChange={props.allowManualInput ? handleInputChange : undefined}
        onKeyDown={props.allowManualInput ? handleKeyDown : undefined}
        {...textFieldProps}
      />
      <Popup
        id={popupProps.id ?? `date-picker-${props.id}`}
        className={popupProps.className ?? 'date-picker__popup'}
        open={popupProps.open ?? showCalendar}
        onClose={popupProps.onClose ?? (() => setShowCalendar(false))}
        anchor={popupProps.anchor ?? anchor}
        initContentHeight={popupProps.initContentHeight ?? 320}
        onMouseUp={popupProps.onMouseUp}
        onMouseDown={popupProps.onMouseDown}
        onCloseBtn={popupProps.onCloseBtn}
        title={popupProps.title}
        offset={popupProps.offset}
        level={popupProps.level}
        placement={popupProps.placement}
        preventMobileStyle={popupProps.preventMobileStyle}
        container={popupProps.container}
        disablePortal={popupProps.disablePortal}
        style={popupProps.style}
      >
        {picker == 'month' ? (
          <MonthSelector
            startMonth={date}
            endMonth={null}
            hoverMonth={hoverDate}
            onHoverMonth={setHoverDate}
            onMonthClick={handleChange}
          />
        ) : (
          <DateSelector
            startDate={date}
            endDate={null}
            hoverDate={hoverDate}
            onHoverDate={setHoverDate}
            onDateClick={handleChange}
            minDate={minDate}
            maxDate={maxDate}
            twoPanels={props.twoPanels ?? false}
            withInputs={props.withInputs}
          />
        )}
      </Popup>
    </>
  );
};

DatePicker.RangePicker = RangePicker;

export { DatePicker };
