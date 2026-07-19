import { Dayjs } from 'dayjs';
import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { TextFieldProps } from '../../';
import { IDatesRange } from '../../../shared/types/date_picker';
export interface IRangePickerConfig {
    defaultIcon: ReactElement | string;
    formatDate: (date: Dayjs | null) => string;
    renderTwoInputs: (setAnchor: Dispatch<SetStateAction<HTMLElement>>, startDate: string, endDate: string, setShowCalendar: (show: boolean) => void, focusedInput: 'first' | 'last' | null, textFieldProps: TextFieldProps) => React.ReactNode;
    renderSelector: (dates: IDatesRange, datesBoundaries: {
        minDate?: Dayjs;
        maxDate?: Dayjs;
    }, hoverDate: Dayjs | null, handleDateClick: (date: Dayjs | null) => void, setHoverDate: (date: Dayjs | null) => void, twoPanels?: boolean) => ReactElement;
}
