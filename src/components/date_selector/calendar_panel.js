import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex } from '../flex';
import { dayjs } from '../../shared/lib/date';
import { capitalize } from '../../shared/lib/string';
import { WEEK_DAYS } from './constants';
export const CalendarPanel = ({ startDate = null, endDate = null, hoverDate = null, onDateClick, onHoverDate = null, month: currentMonth, rangePicker = false, minDate, maxDate, }) => {
    const firstDay = (currentMonth.day() + 6) % 7;
    const isWeekend = (date) => date.day() === 0 || date.day() === 6;
    const getCellClassName = (date) => {
        const classes = ['date-selector__cell'];
        // Selected cells
        if (date.isSame(startDate, 'day')) {
            classes.push('date-selector__cell--selected');
            if (!endDate && (hoverDate === null || hoverDate === void 0 ? void 0 : hoverDate.isBefore(startDate))) {
                classes.push('date-selector__cell--selected-end');
            }
            else if (rangePicker && !startDate.isSame(endDate)) {
                classes.push('date-selector__cell--selected-start');
            }
        }
        else if (date.isSame(endDate, 'day')) {
            classes.push('date-selector__cell--selected', 'date-selector__cell--selected-end');
        }
        // Cells in range
        if (rangePicker && startDate && (endDate !== null && endDate !== void 0 ? endDate : hoverDate) && !startDate.isSame(endDate !== null && endDate !== void 0 ? endDate : hoverDate, 'day')) {
            if (endDate && date.isAfter(startDate) && date.isBefore(endDate)) {
                classes.push('date-selector__cell--in-range');
            }
            else if (!endDate &&
                hoverDate &&
                date.isAfter(dayjs.min(startDate, hoverDate.subtract(1, 'day'))) &&
                date.isBefore(dayjs.max(startDate, hoverDate.add(1, 'day')))) {
                classes.push('date-selector__cell--in-range');
            }
        }
        // Disabled cell
        if ((minDate && date.isBefore(minDate, 'day')) || (maxDate && date.isAfter(maxDate, 'day'))) {
            classes.push('date-selector__cell--disabled');
        }
        if (date.isSame(hoverDate, 'day') && classes.length == 1) {
            classes.push('date-selector__cell--hover');
        }
        if (date.isSame(dayjs(), 'day')) {
            classes.push('date-selector__cell--today');
        }
        if (isWeekend(date)) {
            classes.push('date-selector__cell--weekend');
        }
        return classes.join(' ');
    };
    getCellClassName.weekday = (index) => {
        const classes = ['date-selector__cell', 'date-selector__cell--weekday'];
        if (index > 4)
            classes.push('date-selector__cell--weekend');
        return classes.join(' ');
    };
    const calendarDays = [
        ...Array(firstDay).fill(null),
        ...Array(currentMonth.daysInMonth())
            .fill(null)
            .map((_, i) => currentMonth.date(i + 1)),
    ];
    const renderHeader = () => {
        return (_jsx(Flex, { justify: 'center', align: 'center', className: 'date-selector__month-label', children: capitalize(currentMonth.format('MMMM, YYYY')) }));
    };
    const renderGrid = () => {
        return (_jsxs("div", { className: 'date-selector__grid', children: [WEEK_DAYS.map((day, i) => (_jsx("div", { className: getCellClassName.weekday(i), children: day }, day))), calendarDays.map((date, i) => date ? (_jsx("div", { className: getCellClassName(date), onClick: () => onDateClick(date), onMouseEnter: () => onHoverDate === null || onHoverDate === void 0 ? void 0 : onHoverDate(date), onMouseLeave: () => onHoverDate === null || onHoverDate === void 0 ? void 0 : onHoverDate(null), children: _jsx("div", { className: 'date-selector__cell-inner', children: date.date() }) }, i)) : (_jsx("div", { className: `date-selector__cell date-selector__cell--empty` }, i)))] }));
    };
    return (_jsxs(Flex, { vertical: true, gap: 'middle', className: 'date-selector__panel', children: [renderHeader(), renderGrid()] }));
};
//# sourceMappingURL=calendar_panel.js.map