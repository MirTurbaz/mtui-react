import { Dayjs } from 'dayjs';
import * as React from 'react';
import { ReactElement } from 'react';
import {
  IBaseDatePickerProps,
  IRangePickerProps,
  ISingleDatePicker,
  ISingleMonthPicker,
} from '../../../shared/types/date_picker';

export interface IDatePickerConfig {
  defaultIcon: ReactElement | string;
  getValue: (date: Dayjs) => string;
}

export type TypeDatePicker = React.FC<IDatePickerProps> & {
  RangePicker?: React.FC<IRangePickerProps>;
};

export interface IDatePickerProps extends IBaseDatePickerProps, ISingleDatePicker, ISingleMonthPicker {
  allowManualInput?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}
