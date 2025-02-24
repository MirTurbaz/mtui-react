import * as moment from 'moment';
import * as React from 'react';
import { TextFieldProps } from './text_field';
export interface MonthPeriodPickerProps extends TextFieldProps {
    id: string;
    startMonth: moment.Moment;
    endMonth: moment.Moment;
    onStartMonthChange: (date: moment.Moment) => void;
    onEndMonthChange: (date: moment.Moment) => void;
    disabled: boolean;
}
export declare const MonthPeriodPicker: React.FC<MonthPeriodPickerProps>;
