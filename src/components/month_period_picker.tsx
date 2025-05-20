import * as moment from 'moment';
import * as React from 'react';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from './icons';
import { Button } from './button';
import { Flex } from './flex';
import { Popup } from './popup';
import { TextField, TextFieldProps } from './text_field';

export interface MonthPeriodPickerProps extends TextFieldProps {
  id: string;
  startMonth: moment.Moment;
  endMonth: moment.Moment;
  onStartMonthChange: (date: moment.Moment) => void;
  onEndMonthChange: (date: moment.Moment) => void;
  disabled: boolean;
}

const CUSTOM_TOP_POPUP = 5;

export const MonthPeriodPicker: React.FC<MonthPeriodPickerProps> = (props) => {
  const [year, setYear] = useState<number>(moment().year());
  const [open, setOpen] = useState<boolean>(false);
  const anchor = useRef<HTMLDivElement>(null);
  const [focusedMonth, setFocusedMonth] = useState<'startMonth' | 'endMonth'>('startMonth');

  const handleChange = (date: moment.Moment) => {
    if (focusedMonth === 'startMonth') {
      props.onStartMonthChange(date);
      setFocusedMonth('endMonth');
    } else {
      props.onEndMonthChange(date);
    }
    setOpen(false);
  };

  const value = () => {
    return {
      start:
        props.startMonth.format('MMMM YYYY').charAt(0).toUpperCase() + props.startMonth.format('MMMM YYYY').slice(1),
      end: props.endMonth.format('MMMM YYYY').charAt(0).toUpperCase() + props.endMonth.format('MMMM YYYY').slice(1),
    };
  };

  const handlePreviousYear = () => {
    setYear(year - 1);
  };

  const handleNextYear = () => {
    setYear(year + 1);
  };

  const renderCalendar = () => {
    const months = moment.monthsShort().map((month) => month.charAt(0).toUpperCase() + month.slice(1));
    const currentYear = year;
    const currentMonth =
      (focusedMonth === 'startMonth' && props.startMonth ? props.startMonth : props.endMonth)?.month() ||
      moment().month();
    return (
      <div className='month-picker'>
        <div className='year-selection'>
          <Button onClick={handlePreviousYear} icon={<ChevronLeft size={24} />} />
          <span>{currentYear}</span>
          <Button onClick={handleNextYear} icon={<ChevronRight size={24} />} />
        </div>
        <div className='months-grid'>
          {months.map((month, index) => (
            <div
              key={month}
              className={`month ${index === currentMonth ? 'selected' : ''}`}
              onClick={() => handleChange(moment().year(currentYear).month(index))}
            >
              {month}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Flex align={'center'} ref={anchor}>
        <TextField
          {...props}
          readonly={true}
          style={{ minWidth: 100 }}
          value={(value() as { start: string }).start}
          onClick={(e) => {
            e.stopPropagation();
            setFocusedMonth('startMonth');
            setOpen(true);
          }}
        />
        <span style={{ margin: '0 10px' }}>—</span>
        <TextField
          {...props}
          readonly={true}
          style={{ minWidth: 100 }}
          value={(value() as { end: string }).end}
          onClick={(e) => {
            e.stopPropagation();
            setFocusedMonth('endMonth');
            setOpen(true);
          }}
        />
      </Flex>
      <Popup
        id={`month_picker_${props.id}`}
        onClose={() => setOpen(false)}
        open={open}
        anchor={anchor.current}
        offset={CUSTOM_TOP_POPUP}
      >
        {renderCalendar()}
      </Popup>
    </>
  );
};
