import * as moment from 'moment';
import * as React from 'react';
import { TextFieldProps } from './text_field';
export interface MonthPickerProps extends TextFieldProps {
    id: string;
    month: moment.Moment;
    onMonthChange: (date: moment.Moment) => void;
}
export declare const MonthPicker: React.FC<MonthPickerProps>;
