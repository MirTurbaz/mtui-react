import * as moment from 'moment';
import { PopupProps } from './popup';
import { TextFieldProps } from './text_field';
export interface IDatesObject {
    startDate?: moment.Moment;
    endDate?: moment.Moment;
}
export interface DatePeriodPickerProps extends TextFieldProps, IDatesObject, PopupProps {
    id: string;
    onChangeDates?: (dateStart: moment.Moment, dateEnd: moment.Moment) => void;
    variant?: 'twoInputs' | 'button' | 'input';
    allowSingleDate?: boolean;
}
