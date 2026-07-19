import { Dayjs } from 'dayjs';
import { PopupProps, TextFieldProps } from '../../components';

export type TypePickerVariant = 'date' | 'month';

export interface IDatesRange {
  startDate?: Dayjs;
  endDate?: Dayjs;
}

export interface IBaseDatePickerProps {
  id: string;
  picker?: TypePickerVariant;
  popupProps?: Partial<PopupProps>;
  textFieldProps?: Partial<TextFieldProps>;
}

/** Only if props.picker = 'date' */
export interface ISingleDatePicker {
  date?: Dayjs;
  onChangeDate?: (date: Dayjs) => void;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  twoPanels?: boolean;
  withInputs?: boolean;
}

/** Only if props.picker = 'month' */
export interface ISingleMonthPicker {
  month?: Dayjs;
  onChangeMonth?: (month: Dayjs) => void;
}

/** Only if props.picker = 'date' */
interface IRangeDatePicker extends IDatesRange {
  onChangeDates?: (startDate: Dayjs | null, endDate: Dayjs | null) => void;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  twoPanels?: boolean;
  formatDate?: (date?: Dayjs | null) => string;
}

/** Only if props.picker = 'month' */
interface IRangeMonthPicker {
  startMonth?: Dayjs;
  endMonth?: Dayjs;
  onChangeMonths?: (startMonth: Dayjs | null, endMonth: Dayjs | null) => void;
}

export interface IRangePickerProps extends IBaseDatePickerProps, IRangeDatePicker, IRangeMonthPicker {
  variant?: 'twoInputs' | 'button' | 'input';
  allowSingleDate?: boolean;
}
