import * as moment from 'moment';
import * as React from 'react';
import { TextFieldProps } from './text_field';
export interface SelectDatePickerProps extends TextFieldProps {
    id: string;
    date?: moment.Moment;
    onChangeDate?: (date: moment.Moment) => void;
}
export declare const SelectDatePicker: React.FC<SelectDatePickerProps>;
