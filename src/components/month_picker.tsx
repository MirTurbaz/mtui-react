import * as moment from 'moment';
import * as React from 'react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from './icons';
import { Button } from './button';
import { Flex } from './flex';
import { Popup } from './popup';
import { TextField, TextFieldProps } from './text_field';

export interface MonthPickerProps extends TextFieldProps {
  id: string;
  month: moment.Moment;
  onMonthChange: (date: moment.Moment) => void;
}

const CUSTOM_TOP_POPUP = 5;

export const MonthPicker: React.FC<MonthPickerProps> = (props) => {
  const [year, setYear] = useState<number>(moment().year());
  const [open, setOpen] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<HTMLElement>(null);

  const handleChange = (date: moment.Moment) => {
    props.onMonthChange(date);
    setOpen(false);
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
    const currentMonth = props.month?.month() || moment().month();
    return (
      <div className='month-picker'>
        <div className='year-selection'>
          <Button onClick={handlePreviousYear}>
            <ChevronLeft size={24} />
          </Button>
          <span>{currentYear}</span>
          <Button onClick={handleNextYear}>
            <ChevronRight size={24} />
          </Button>
        </div>
        <div className='months-grid'>
          {months.map((month, index) => {
            let momentMonth = moment().year(currentYear).month(index);
            return (
              <div
                key={month}
                className={`month ${index === currentMonth ? 'selected' : ''} ${momentMonth.isSame(moment(), 'month') && 'month-today'}`}
                onClick={() => handleChange(momentMonth)}
              >
                {month}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <Flex align={'center'}>
        <TextField
          {...props}
          readonly={true}
          wrapperRef={setAnchor}
          style={{ minWidth: 130 }}
          value={props.month.format('MMMM YYYY').charAt(0).toUpperCase() + props.month.format('MMMM YYYY').slice(1)}
          onClick={() => {
            setOpen(true);
          }}
        />
      </Flex>
      <Popup
        id={`month_picker_${props.id}`}
        onClose={() => setOpen(false)}
        open={open}
        anchor={anchor}
        offset={CUSTOM_TOP_POPUP}
      >
        {renderCalendar()}
      </Popup>
    </>
  );
};
