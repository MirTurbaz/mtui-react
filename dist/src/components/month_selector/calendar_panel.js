import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex } from '../';
import { dayjs } from '../../shared/lib/date/dayjs';
import { MONTHS_SHORT_NAMES } from './constants';
export const CalendarPanel = ({ startMonth, endMonth, hoverMonth = null, selectedYear, onMonthClick, onHoverMonth = null, rangePicker = false, }) => {
    const getMonth = (monthNumber) => dayjs().year(selectedYear).month(monthNumber).date(1);
    const handleHoverMonth = (monthNumber) => {
        if (monthNumber == null)
            return onHoverMonth === null || onHoverMonth === void 0 ? void 0 : onHoverMonth(null);
        onHoverMonth === null || onHoverMonth === void 0 ? void 0 : onHoverMonth(getMonth(monthNumber));
    };
    const handleClickMonth = (monthNumber) => onMonthClick === null || onMonthClick === void 0 ? void 0 : onMonthClick(getMonth(monthNumber));
    const getCellClassName = (monthNumber) => {
        const classes = ['date-selector__cell'];
        const month = dayjs().year(selectedYear).month(monthNumber);
        // Selected cells
        if (startMonth && month.isSame(startMonth, 'month')) {
            classes.push('date-selector__cell--selected');
            if (!endMonth && (hoverMonth === null || hoverMonth === void 0 ? void 0 : hoverMonth.isBefore(startMonth, 'month'))) {
                classes.push('date-selector__cell--selected-end');
            }
            else if (rangePicker && !startMonth.isSame(endMonth, 'month')) {
                classes.push('date-selector__cell--selected-start');
            }
        }
        else if (endMonth && month.isSame(endMonth, 'month')) {
            classes.push('date-selector__cell--selected', 'date-selector__cell--selected-end');
        }
        // Cells in range
        if (rangePicker && startMonth && (endMonth !== null && endMonth !== void 0 ? endMonth : hoverMonth) && !startMonth.isSame(endMonth !== null && endMonth !== void 0 ? endMonth : hoverMonth, 'month')) {
            if (endMonth && month.isAfter(startMonth, 'month') && month.isBefore(endMonth, 'month')) {
                classes.push('date-selector__cell--in-range');
            }
            else if (!endMonth &&
                hoverMonth &&
                month.isAfter(dayjs.min(startMonth, dayjs(hoverMonth).subtract(1, 'month')), 'month') &&
                month.isBefore(dayjs.max(startMonth, dayjs(hoverMonth).add(1, 'month')), 'month')) {
                classes.push('date-selector__cell--in-range');
            }
        }
        if (monthNumber == (hoverMonth === null || hoverMonth === void 0 ? void 0 : hoverMonth.month()) && classes.length == 1) {
            classes.push('date-selector__cell--hover');
        }
        if (month.isSame(dayjs(), 'month')) {
            classes.push('date-selector__cell--today');
        }
        return classes.join(' ');
    };
    const renderHeader = () => {
        return (_jsx(Flex, { justify: 'center', align: 'center', className: 'date-selector__month-label', children: selectedYear }));
    };
    const renderGrid = () => {
        return (_jsx("div", { className: 'date-selector__grid', children: MONTHS_SHORT_NAMES.map((monthName, monthIndex) => (_jsx("div", { className: getCellClassName(monthIndex), onMouseEnter: () => handleHoverMonth(monthIndex), onMouseLeave: () => handleHoverMonth(null), onClick: () => handleClickMonth(monthIndex), children: _jsx("div", { className: 'date-selector__cell-inner', children: monthName }) }, monthIndex))) }));
    };
    return (_jsxs("div", { className: 'date-selector__panel', children: [renderHeader(), renderGrid()] }));
};
//# sourceMappingURL=calendar_panel.js.map