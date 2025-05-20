import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as moment from 'moment';
import { useState } from 'react';
import { DayPickerSingleDateController } from 'react-dates';
import { Popup } from './popup';
import { Select } from './select';
import { TextField } from './text_field';
import { DateFormatUtils } from './date_period_picker/utils';
export const SelectDatePicker = (props) => {
    const [date, setDate] = useState(props.date);
    const [open, setOpen] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const [visibleMonth, setVisibleMonth] = useState(date);
    const monthOptions = Array.from({ length: 12 }, (_, i) => {
        const month = moment().month(i).format('MMMM');
        return {
            value: i,
            label: month.charAt(0).toUpperCase() + month.slice(1),
        };
    });
    const yearOptions = Array.from({ length: 100 }, (_, i) => {
        const year = moment().year() - i;
        return { value: year, label: String(year) };
    });
    const handleDateChange = (date) => {
        var _a;
        setDate(date);
        setVisibleMonth(date);
        (_a = props.onChangeDate) === null || _a === void 0 ? void 0 : _a.call(props, date);
    };
    const handleMonthChange = (selectedOption) => {
        var _a;
        const newDate = moment(date).month(Number(selectedOption.value));
        setVisibleMonth(newDate);
        setDate(newDate);
        (_a = props.onChangeDate) === null || _a === void 0 ? void 0 : _a.call(props, date);
    };
    const handleYearChange = (selectedOption) => {
        var _a;
        const newDate = moment(date).year(Number(selectedOption.value));
        setVisibleMonth(newDate);
        setDate(newDate);
        (_a = props.onChangeDate) === null || _a === void 0 ? void 0 : _a.call(props, date);
    };
    const value = () => {
        if (date) {
            return date.format(DateFormatUtils.DEFAULT_DATE_FORMAT);
        }
        else {
            return '';
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(TextField, Object.assign({}, props, { inputRef: setAnchor, onClick: (e) => setOpen(true), readonly: true, value: value() })), _jsxs(Popup, { open: open, onClose: () => setOpen(false), id: `select_date_picker_${props.id}`, anchor: anchor, className: 'date_picker__popup date_picker__popup-single select_date_picker__popup', children: [_jsxs("div", { className: 'select_date_picker__top', children: [_jsx(Select, { label: '', options: monthOptions, value: monthOptions.find((option) => option.value === visibleMonth.month()), onChange: handleMonthChange, wrapperClassName: 'select_date_picker__month_select', className: 'select_date_picker__select' }), _jsx(Select, { label: '', options: yearOptions, value: yearOptions.find((option) => option.value === visibleMonth.year()), onChange: handleYearChange, wrapperClassName: 'select_date_picker__year_select', className: 'select_date_picker__select' })] }), _jsx(DayPickerSingleDateController
                    //@ts-ignore
                    , { 
                        //@ts-ignore
                        date: date, onDateChange: handleDateChange, focused: true, onFocusChange: () => { }, initialVisibleMonth: null, startDateId: '', endDateId: '', numberOfMonths: 1, daySize: 44, hideKeyboardShortcutsPanel: true, renderDayContents: (date, dayTypes) => (_jsx("div", { className: `DayContent ${date.weekday() >= 5 && 'DayContent-Weekday'}`, children: date.date() })), noNavButtons: true, renderCalendarInfo: null }, visibleMonth.toString())] })] }));
};
//# sourceMappingURL=select_date_picker.js.map