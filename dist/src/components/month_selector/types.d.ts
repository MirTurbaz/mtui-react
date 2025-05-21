import { Dayjs } from 'dayjs';
export interface ICalendarPanelProps {
    startMonth?: Dayjs;
    endMonth?: Dayjs;
    selectedYear: number;
    hoverMonth?: Dayjs;
    onMonthClick: (date: Dayjs) => void;
    onHoverMonth?: (date: Dayjs | null) => void;
    rangePicker?: boolean;
}
export interface IMonthSelectorProps {
    startMonth?: Dayjs;
    endMonth?: Dayjs;
    rangePicker?: boolean;
    hoverMonth?: Dayjs;
    onMonthClick: (date: Dayjs) => void;
    onHoverMonth?: (date: Dayjs | null) => void;
}
