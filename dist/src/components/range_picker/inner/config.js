import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, TextField } from '../../';
import { CalendarDates } from '../../icons';
import { DEFAULT_DATE_FORMAT } from '../../../shared/constants/date';
import { capitalize } from '../../../shared/lib/string';
import { DateSelector } from '../../date_selector';
import { MonthSelector } from '../../month_selector';
export const RANGE_PICKER_CONFIG = {
    date: {
        defaultIcon: _jsx(CalendarDates, {}),
        formatDate: (date) => { var _a; return (_a = date === null || date === void 0 ? void 0 : date.format(DEFAULT_DATE_FORMAT)) !== null && _a !== void 0 ? _a : ''; },
        renderTwoInputs: (setAnchor, startDate, endDate, setShowCalendar, focusedInput, textFieldProps) => (_jsxs(Flex, { align: 'center', gap: 'middle', className: 'date-picker__wrapper', ref: setAnchor, children: [_jsx(TextField, Object.assign({ icon: _jsx(CalendarDates, {}), readonly: true, size: 'mini', style: { minWidth: 200 }, value: startDate, placeholder: 'Начало периода', onClick: (e) => {
                        e.stopPropagation();
                        setShowCalendar(true);
                    }, focus: focusedInput == 'first' }, textFieldProps)), _jsx(TextField, Object.assign({ icon: _jsx(CalendarDates, {}), readonly: true, size: 'mini', style: { minWidth: 200 }, value: endDate, placeholder: 'Конец периода', onClick: (e) => {
                        e.stopPropagation();
                        setShowCalendar(true);
                    }, focus: focusedInput == 'last' }, textFieldProps))] })),
        renderSelector: (dates, datesBoundaries, hoverDate, handleDateClick, setHoverDate, twoPanels) => (_jsx(DateSelector, { rangePicker: true, startDate: dates === null || dates === void 0 ? void 0 : dates.startDate, endDate: dates === null || dates === void 0 ? void 0 : dates.endDate, hoverDate: hoverDate, minDate: datesBoundaries === null || datesBoundaries === void 0 ? void 0 : datesBoundaries.minDate, maxDate: datesBoundaries === null || datesBoundaries === void 0 ? void 0 : datesBoundaries.maxDate, onDateClick: handleDateClick, onHoverDate: setHoverDate, twoPanels: twoPanels })),
    },
    month: {
        defaultIcon: '',
        formatDate: (date) => { var _a; return (_a = capitalize(date === null || date === void 0 ? void 0 : date.format('MMMM YYYY'))) !== null && _a !== void 0 ? _a : ''; },
        renderTwoInputs: (setAnchor, startDate, endDate, setShowCalendar, focusedInput, textFieldProps) => (_jsxs(Flex, { align: 'center', gap: 10, ref: setAnchor, children: [_jsx(TextField, Object.assign({ readonly: true, style: { minWidth: 100 }, value: startDate, onClick: (e) => {
                        e.stopPropagation();
                        setShowCalendar(true);
                    }, focus: focusedInput == 'first' }, textFieldProps)), _jsx("span", { children: "\u2014" }), _jsx(TextField, Object.assign({ readonly: true, style: { minWidth: 100 }, value: endDate, onClick: (e) => {
                        e.stopPropagation();
                        setShowCalendar(true);
                    }, focus: focusedInput == 'last' }, textFieldProps))] })),
        renderSelector: (dates, _, hoverDate, handleDateClick, setHoverDate) => (_jsx(MonthSelector, { rangePicker: true, startMonth: dates === null || dates === void 0 ? void 0 : dates.startDate, endMonth: dates === null || dates === void 0 ? void 0 : dates.endDate, hoverMonth: hoverDate, onHoverMonth: setHoverDate, onMonthClick: handleDateClick })),
    },
};
//# sourceMappingURL=config.js.map