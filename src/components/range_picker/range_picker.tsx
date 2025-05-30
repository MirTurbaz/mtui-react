import { Dayjs } from 'dayjs';
import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import { Button, Popup, PopupProps, TextField, TextFieldProps } from '../';
import { Today } from '../icons';
import { IRangePickerProps, TypePickerVariant } from '../../shared/types/date_picker';
import { RANGE_PICKER_CONFIG } from './inner/config';
import { IRangePickerConfig } from './inner/types';

export const RangePicker: React.FC<IRangePickerProps> = ({
  picker = 'date' as TypePickerVariant,
  textFieldProps = {} as Partial<TextFieldProps>,
  popupProps = {} as Partial<PopupProps>,
  ...props
}) => {
  const minDate = props.minDate?.isValid() ? props.minDate : null;
  const maxDate = props.maxDate?.isValid() ? props.maxDate : null;

  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [hoverDate, setHoverDate] = useState<Dayjs | null>(null);
  const [anchor, setAnchor] = useState<HTMLElement>(null);
  const [focusedInput, setFocusedInput] = useState<'first' | 'last' | null>(null);

  const { defaultIcon, renderTwoInputs, renderSelector }: IRangePickerConfig =
    RANGE_PICKER_CONFIG[picker] ??
    ({
      defaultIcon: null,
      renderTwoInputs: () => null,
      renderSelector: () => null,
      formatDate: () => '',
    } as IRangePickerConfig);
  const formatDate = props.formatDate ?? RANGE_PICKER_CONFIG[picker]?.formatDate ?? (() => '');

  const handleDateClick = (date: Dayjs) => {
    if ((minDate && date.isBefore(minDate, picker)) || (maxDate && date.isAfter(maxDate, picker))) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      onChangeDates(date, null);
      setFocusedInput('last');
    } else if (date.isBefore(startDate, picker)) {
      setStartDate(date);
      setEndDate(startDate);
      onChangeDates(date, startDate);
      setShowCalendar(false);
    } else if (props.allowSingleDate || !date.isSame(startDate, picker)) {
      setEndDate(date);
      onChangeDates(startDate, date);
      setShowCalendar(false);
    }
  };

  const onChangeDates = (startDate: Dayjs | null, endDate: Dayjs | null) => {
    if (picker == 'date') {
      props.onChangeDates?.(startDate, endDate);
    } else if (picker == 'month') {
      props.onChangeMonths?.(startDate, endDate);
    }
  };

  const getValue = (): string => {
    if (startDate && !startDate.isSame(endDate)) {
      return `${formatDate(startDate)} - ${formatDate(endDate) || '...'}`;
    } else if (startDate && startDate.isSame(endDate)) {
      return formatDate(startDate);
    } else {
      return '';
    }
  };

  const renderInputs = () => {
    if (props.variant == 'twoInputs') {
      return renderTwoInputs?.(
        setAnchor,
        formatDate(startDate),
        formatDate(endDate),
        setShowCalendar,
        focusedInput,
        textFieldProps
      );
    } else if (props.variant == 'button') {
      return (
        <Button variant={'outline'} btnRef={setAnchor} icon={(textFieldProps?.icon as ReactElement) ?? <Today />} />
      );
    } else {
      return (
        <TextField
          icon={defaultIcon}
          readonly
          size={'mini'}
          style={{ minWidth: 200 }}
          wrapperRef={setAnchor}
          value={getValue()}
          {...textFieldProps}
        />
      );
    }
  };

  useEffect(() => {
    if (props.variant != 'twoInputs') return;
    setFocusedInput(showCalendar ? 'first' : null);
  }, [showCalendar]);

  useEffect(() => {
    if (picker != 'date') return;

    if (
      (props.startDate == null && startDate != null) ||
      (props.startDate?.isValid() && !props.startDate?.isSame(startDate, picker))
    ) {
      setStartDate(props.startDate);
    }
    if (
      (props.endDate == null && endDate != null) ||
      (props.endDate?.isValid() && !props.endDate?.isSame(endDate, picker))
    ) {
      setEndDate(props.endDate);
    }
  }, [props.startDate, props.endDate]);

  useEffect(() => {
    if (picker != 'month') return;

    if (
      (props.startMonth == null && startDate != null) ||
      (props.startMonth?.isValid() && !props.startMonth?.isSame(startDate, picker))
    ) {
      setStartDate(props.startMonth);
    }
    if (
      (props.endMonth == null && endDate != null) ||
      (props.endMonth?.isValid() && !props.endMonth?.isSame(endDate, picker))
    ) {
      setEndDate(props.endMonth);
    }
  }, [props.startMonth, props.endMonth]);

  useEffect(() => {
    if (!anchor) return;
    anchor.removeEventListener('click', () => setShowCalendar(true));
    anchor.addEventListener('click', () => setShowCalendar(true));

    return () => anchor?.removeEventListener('click', () => setShowCalendar(true));
  }, [anchor]);

  return (
    <>
      {renderInputs()}
      <Popup
        id={`range-picker-${props.id}`}
        className={'date-picker__popup'}
        open={showCalendar}
        onClose={() => setShowCalendar(false)}
        anchor={anchor}
        initContentHeight={320}
        // @ts-ignore
        {...popupProps}
      >
        {renderSelector?.(
          { startDate, endDate },
          { minDate, maxDate },
          hoverDate,
          handleDateClick,
          setHoverDate,
          props.twoPanels ?? true
        )}
      </Popup>
    </>
  );
};
