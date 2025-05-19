import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as moment from 'moment';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from './icons';
import { Button } from './button';
import { Flex } from './flex';
import { Popup } from './popup';
import { TextField } from './text_field';
const CUSTOM_TOP_POPUP = 5;
export const MonthPicker = (props) => {
    const [year, setYear] = useState(moment().year());
    const [open, setOpen] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const handleChange = (date) => {
        props.onMonthChange(date);
        setOpen(false);
    };
    const handlePreviousYear = () => {
        setYear(year - 1);
    };
    const handleNextYear = () => {
        setYear(year + 1);
    };
    const renderCalendar = () => {
        var _a;
        const months = moment.monthsShort().map((month) => month.charAt(0).toUpperCase() + month.slice(1));
        const currentYear = year;
        const currentMonth = ((_a = props.month) === null || _a === void 0 ? void 0 : _a.month()) || moment().month();
        return (_jsxs("div", { className: 'month-picker', children: [_jsxs("div", { className: 'year-selection', children: [_jsx(Button, { onClick: handlePreviousYear, icon: _jsx(ChevronLeft, { size: 24 }) }), _jsx("span", { children: currentYear }), _jsx(Button, { onClick: handleNextYear, icon: _jsx(ChevronRight, { size: 24 }) })] }), _jsx("div", { className: 'months-grid', children: months.map((month, index) => {
                        let momentMonth = moment().year(currentYear).month(index);
                        return (_jsx("div", { className: `month ${index === currentMonth ? 'selected' : ''} ${momentMonth.isSame(moment(), 'month') && 'month-today'}`, onClick: () => handleChange(momentMonth), children: month }, month));
                    }) })] }));
    };
    return (_jsxs(_Fragment, { children: [_jsx(Flex, { align: 'center', children: _jsx(TextField, Object.assign({}, props, { readonly: true, wrapperRef: setAnchor, style: { minWidth: 130 }, value: props.month.format('MMMM YYYY').charAt(0).toUpperCase() + props.month.format('MMMM YYYY').slice(1), onClick: () => {
                        setOpen(true);
                    } })) }), _jsx(Popup, { id: `month_picker_${props.id}`, onClose: () => setOpen(false), open: open, anchor: anchor, offset: CUSTOM_TOP_POPUP, children: renderCalendar() })] }));
};
//# sourceMappingURL=month_picker.js.map