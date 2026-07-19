import { Dayjs } from 'dayjs';
import { IDatesRange } from '../../shared/types/date_picker';
export interface ICalendarPanelProps extends IDatesRange {
    rangePicker?: boolean;
    hoverDate?: Dayjs;
    onDateClick: (date: Dayjs) => void;
    onHoverDate?: (date: Dayjs | null) => void;
    month: Dayjs;
    minDate?: Dayjs;
    maxDate?: Dayjs;
}
export interface IScrolledPanelsProps extends IDatesRange {
    rangePicker?: boolean;
    month: Dayjs;
    direction?: 'left' | 'right';
    twoPanels?: boolean;
    minDate?: Dayjs;
    maxDate?: Dayjs;
}
export interface IDateSelectorProps extends IDatesRange {
    rangePicker?: boolean;
    hoverDate?: Dayjs;
    onDateClick: (date: Dayjs) => void;
    onHoverDate?: (date: Dayjs | null) => void;
    twoPanels?: boolean;
    minDate?: Dayjs;
    maxDate?: Dayjs;
    withInputs?: boolean;
}
