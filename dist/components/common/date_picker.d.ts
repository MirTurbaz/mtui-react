import * as moment from 'moment';
import * as React from 'react';
import 'react-dates/initialize';
import { PopupProps } from './popup';
import { TextFieldProps } from './text_field';
export interface DatePickerProps extends TextFieldProps {
    id: string;
    onChangeDate?: (date: moment.Moment) => void;
    date?: moment.Moment;
    allowManualInput?: boolean;
    popupProps?: Partial<PopupProps>;
    minDate?: moment.Moment;
    maxDate?: moment.Moment;
    onOpen?: () => void;
}
export declare const DatePicker: React.FC<DatePickerProps>;
