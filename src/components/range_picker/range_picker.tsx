import { Dayjs } from 'dayjs';
import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import { Button, Popup, TextField } from '../';
import { Today } from '../icons';
import { IRangePickerProps, TypePickerVariant } from '../../shared/types/date_picker';
import { RANGE_PICKER_CONFIG } from './inner/config';
import { IRangePickerConfig } from './inner/types';

export const RangePicker: React.FC<IRangePickerProps> = ({ picker = 'date' as TypePickerVariant, ...props }) => {
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
    if ((minDate && date.isBefore(minDate, picker)) || (maxDate && date.isAfter(maxDate, picker))) {
      return;
    }

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      setFocusedInput('last');
    } else {
      if (date.isBefore(startDate, picker)) {
        setStartDate(date);
        setEndDate(startDate);
        setShowCalendar(false);
      } else if (props.allowSingleDate || !date.isSame(startDate, picker)) {
        setEndDate(date);
        setShowCalendar(false);
      }
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
        props.textFieldProps
      );
    } else if (props.variant == 'button') {
      return (
        <Button
          variant={'outline'}
          btnRef={setAnchor}
          onClick={() => setShowCalendar(true)}
          icon={(props.textFieldProps?.icon as ReactElement) ?? <Today />}
        />
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
          onClick={(_) => {
            setShowCalendar(true);
          }}
          {...props.textFieldProps}
        />
      );
    }
  };

  useEffect(() => {
    if (props.variant != 'twoInputs') return;
    setFocusedInput(showCalendar ? 'first' : null);
  }, [showCalendar]);

  useEffect(() => {
    if (picker == 'date') {
      props.onChangeDates?.(startDate, endDate);
    } else if (picker == 'month') {
      props.onChangeMonths?.(startDate, endDate);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (picker != 'date') return;

    if (props.startDate?.isValid() && !props.startDate?.isSame(startDate, picker)) {
      setStartDate(props.startDate);
    }
    if (props.endDate?.isValid() && !props.endDate?.isSame(endDate, picker)) {
      setEndDate(props.endDate);
    }
  }, [props.startDate, props.endDate]);

  useEffect(() => {
    if (picker != 'month') return;

    if (props.startMonth?.isValid() && !props.startMonth?.isSame(startDate, picker)) {
      setStartDate(props.startMonth);
    }
    if (props.endMonth?.isValid() && !props.endMonth?.isSame(endDate, picker)) {
      setEndDate(props.endMonth);
    }
  }, [props.startMonth, props.endMonth]);

  const { popupProps } = props;

  return (
    <>
      {renderInputs()}
      <Popup
        id={popupProps.id ?? `range-picker-${props.id}`}
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
