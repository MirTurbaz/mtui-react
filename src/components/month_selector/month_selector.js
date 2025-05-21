import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Flex } from '../';
import { ChevronLeft, ChevronRight } from '../icons';
import { dayjs } from '../../shared/lib/date';
import { CalendarPanel } from './calendar_panel';
export const MonthSelector = ({ startMonth, endMonth, hoverMonth, onHoverMonth, onMonthClick, rangePicker = false, }) => {
    const [currentYear, setCurrentYear] = useState((startMonth !== null && startMonth !== void 0 ? startMonth : dayjs()).year());
    const goToPrevYear = () => {
        setCurrentYear(currentYear - 1);
    };
    const goToNextYear = () => {
        setCurrentYear(currentYear + 1);
    };
    const getWrapperClassName = () => {
        const classes = ['date-selector__wrapper', 'date-selector__wrapper--month-selector'];
        if (rangePicker)
            classes.push('date-selector__wrapper--range-selector');
        return classes.join(' ');
    };
    return (_jsx("div", { className: 'date-selector', children: _jsxs(Flex, { gap: 32, className: getWrapperClassName(), children: [_jsxs(Flex, { justify: 'space-between', className: 'date-selector__header', children: [_jsx(Button, { variant: 'link', className: 'date-selector__nav-button', onClick: goToPrevYear, icon: _jsx(ChevronLeft, { size: 24 }) }), _jsx(Button, { variant: 'link', className: 'date-selector__nav-button', onClick: goToNextYear, icon: _jsx(ChevronRight, { size: 24 }) })] }), _jsx(CalendarPanel, { rangePicker: rangePicker, startMonth: startMonth, endMonth: endMonth, hoverMonth: hoverMonth, onMonthClick: onMonthClick, onHoverMonth: onHoverMonth, selectedYear: currentYear })] }) }));
};
//# sourceMappingURL=month_selector.js.map