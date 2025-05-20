import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as moment from 'moment';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from './icons';
import { Button } from './button';
import { Flex } from './flex';
import { Popup } from './popup';
import { TextField } from './text_field';
const CUSTOM_TOP_POPUP = 5;
export const MonthPeriodPicker = (props) => {
    const [year, setYear] = useState(moment().year());
    const [open, setOpen] = useState(false);
    const anchor = useRef(null);
    const [focusedMonth, setFocusedMonth] = useState('startMonth');
    const handleChange = (date) => {
        if (focusedMonth === 'startMonth') {
            props.onStartMonthChange(date);
            setFocusedMonth('endMonth');
        }
        else {
            props.onEndMonthChange(date);
        }
        setOpen(false);
    };
    const value = () => {
        return {
            start: props.startMonth.format('MMMM YYYY').charAt(0).toUpperCase() + props.startMonth.format('MMMM YYYY').slice(1),
            end: props.endMonth.format('MMMM YYYY').charAt(0).toUpperCase() + props.endMonth.format('MMMM YYYY').slice(1),
        };
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
        const currentMonth = ((_a = (focusedMonth === 'startMonth' && props.startMonth ? props.startMonth : props.endMonth)) === null || _a === void 0 ? void 0 : _a.month()) ||
            moment().month();
        return (_jsxs("div", { className: 'month-picker', children: [_jsxs("div", { className: 'year-selection', children: [_jsx(Button, { onClick: handlePreviousYear, icon: _jsx(ChevronLeft, { size: 24 }) }), _jsx("span", { children: currentYear }), _jsx(Button, { onClick: handleNextYear, icon: _jsx(ChevronRight, { size: 24 }) })] }), _jsx("div", { className: 'months-grid', children: months.map((month, index) => (_jsx("div", { className: `month ${index === currentMonth ? 'selected' : ''}`, onClick: () => handleChange(moment().year(currentYear).month(index)), children: month }, month))) })] }));
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Flex, { align: 'center', ref: anchor, children: [_jsx(TextField, Object.assign({}, props, { readonly: true, style: { minWidth: 100 }, value: value().start, onClick: (e) => {
                            e.stopPropagation();
                            setFocusedMonth('startMonth');
                            setOpen(true);
                        } })), _jsx("span", { style: { margin: '0 10px' }, children: "\u2014" }), _jsx(TextField, Object.assign({}, props, { readonly: true, style: { minWidth: 100 }, value: value().end, onClick: (e) => {
                            e.stopPropagation();
                            setFocusedMonth('endMonth');
                            setOpen(true);
                        } }))] }), _jsx(Popup, { id: `month_picker_${props.id}`, onClose: () => setOpen(false), open: open, anchor: anchor.current, offset: CUSTOM_TOP_POPUP, children: renderCalendar() })] }));
};
//# sourceMappingURL=month_period_picker.js.map