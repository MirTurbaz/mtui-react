import * as moment from 'moment';
export declare class DateFormatUtils {
    static DEFAULT_DATE_FORMAT: string;
    static useDatesState(defaultStartDate?: moment.Moment, defaultEndDate?: moment.Moment): [moment.Moment, moment.Moment, (startDate: moment.Moment, endDate: moment.Moment) => void];
}
