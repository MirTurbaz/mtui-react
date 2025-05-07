var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { DayPickerRangeController } from 'react-dates';
import { useResize } from '../../hooks';
import { DateFormatUtils } from './utils';
import { TextField } from '../text_field';
import { CalendarDates } from '../icons/calendar_dates';
import { Button } from '../button/index';
import { Today } from '../icons/today';
import { Popup } from '../popup';
export const DatePeriodPicker = (_a) => {
    var { allowSingleDate = false } = _a, props = __rest(_a, ["allowSingleDate"]);
    const [endDate, setEndDate] = useState(props.endDate);
    const [startDate, setStartDate] = useState(props.startDate);
    const [focusedDate, setFocusedDate] = useState('startDate');
    const [open, setOpen] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const { isMobile } = useResize();
    const handleChange = (dates) => {
        setStartDate(dates.startDate);
        setEndDate(dates.endDate);
        if (dates.startDate && dates.endDate)
            setFocusedDate('startDate');
    };
    const handleFocusChange = (focus) => {
        setFocusedDate(!focus ? 'startDate' : focus);
        if (focus == 'endDate')
            setEndDate(null);
        if (!focus)
            setOpen(false);
    };
    const value = () => {
        let valueText = '';
        if (allowSingleDate) {
            if (startDate) {
                valueText += startDate.format(DateFormatUtils.DEFAULT_DATE_FORMAT);
            }
            if (endDate) {
                if (!valueText)
                    valueText = '...';
                valueText += ` - ${endDate.format(DateFormatUtils.DEFAULT_DATE_FORMAT)}`;
            }
        }
        else {
            if (startDate && endDate) {
                return `${startDate.format(DateFormatUtils.DEFAULT_DATE_FORMAT)} - ${endDate.format(DateFormatUtils.DEFAULT_DATE_FORMAT)}`;
            }
        }
        return valueText;
    };
    useEffect(() => {
        var _a;
        if ((startDate && endDate) || (allowSingleDate && (startDate || endDate))) {
            (_a = props.onChangeDates) === null || _a === void 0 ? void 0 : _a.call(props, startDate, endDate);
        }
    }, [startDate, endDate]);
    useEffect(() => {
        if (props.startDate != startDate)
            setStartDate(props.startDate);
        if (props.endDate != endDate)
            setEndDate(props.endDate);
    }, [props.startDate, props.endDate]);
    const renderInputs = () => {
        var _a, _b, _c, _d;
        if (props.variant == 'twoInputs') {
            return (_jsxs("div", { className: 'date_picker_range__wrapper', children: [_jsx(TextField, Object.assign({}, props, { icon: (_a = props.icon) !== null && _a !== void 0 ? _a : _jsx(CalendarDates, {}), readonly: true, style: { minWidth: 200 }, inputRef: setAnchor, value: startDate === null || startDate === void 0 ? void 0 : startDate.format(DateFormatUtils.DEFAULT_DATE_FORMAT), placeholder: 'Начало периода', onClick: (e) => {
                            e.stopPropagation();
                            setOpen(true);
                        } })), _jsx(TextField, Object.assign({}, props, { icon: (_b = props.icon) !== null && _b !== void 0 ? _b : _jsx(CalendarDates, {}), readonly: true, style: { minWidth: 200 }, value: endDate === null || endDate === void 0 ? void 0 : endDate.format(DateFormatUtils.DEFAULT_DATE_FORMAT), placeholder: 'Конец периода', onClick: (e) => {
                            e.stopPropagation();
                            setOpen(true);
                        } }))] }));
        }
        else if (props.variant == 'button') {
            return (_jsx(Button, { variant: 'outline', size: 'square', btnRef: setAnchor, onClick: () => setOpen(true), children: (_c = props.icon) !== null && _c !== void 0 ? _c : _jsx(Today, {}) }));
        }
        else {
            return (_jsx(TextField, Object.assign({}, props, { icon: (_d = props.icon) !== null && _d !== void 0 ? _d : _jsx(CalendarDates, {}), readonly: true, style: { minWidth: 200 }, wrapperRef: setAnchor, value: value(), onClick: (_) => {
                    setOpen(true);
                } })));
        }
    };
    return (_jsxs(_Fragment, { children: [renderInputs(), _jsx(Popup, { id: `date_picker_${props.id}`, className: 'date_picker__popup', onClose: () => setOpen(false), open: open, title: props.placeholder, anchor: anchor, placement: props.placement, disablePortal: props.disablePortal, children: _jsx(DayPickerRangeController
                /*@ts-ignore*/
                , { 
                    /*@ts-ignore*/
                    endDate: endDate, 
                    /*@ts-ignore*/
                    startDate: startDate, focusedInput: focusedDate, initialVisibleMonth: null, onDatesChange: handleChange, onFocusChange: handleFocusChange, endDateId: '', numberOfMonths: isMobile ? 1 : 2, renderCalendarInfo: null, startDateId: '', daySize: 44, hideKeyboardShortcutsPanel: true, renderDayContents: (date) => (_jsx("div", { className: `DayContent ${date.weekday() >= 5 && 'DayContent-Weekday'}`, children: date.date() })) }) })] }));
};
//# sourceMappingURL=date_period_picker.js.map