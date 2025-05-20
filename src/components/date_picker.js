import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as moment from 'moment';
import { useEffect, useState } from 'react';
import { DayPickerSingleDateController } from 'react-dates';
import 'react-dates/initialize';
import { CalendarDates } from './icons';
import { Popup } from './popup';
import { TextField } from './text_field';
import { DateFormatUtils } from './date_period_picker/utils';
export const DatePicker = (props) => {
    var _a;
    const [date, setDate] = useState(props.date);
    const [open, setOpen] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const handleChange = (date) => {
        var _a, _b;
        setDate(date);
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, value());
        (_b = props.onChangeDate) === null || _b === void 0 ? void 0 : _b.call(props, date);
        setOpen(false);
    };
    useEffect(() => {
        setDate(props.date);
    }, [props.date]);
    const handleInputChange = (value) => {
        if (value === '') {
            handleChange(null);
        }
        else {
            const inputDate = moment(value, DateFormatUtils.DEFAULT_DATE_FORMAT, true);
            if (inputDate.isValid()) {
                handleChange(inputDate);
            }
        }
    };
    const handleKeyDown = (event) => {
        if (!/[0-9.]/.test(event.key) &&
            event.key !== 'Backspace' &&
            event.key !== 'ArrowLeft' &&
            event.key !== 'ArrowRight') {
            event.preventDefault();
        }
    };
    const value = () => {
        if (date) {
            return date.format(DateFormatUtils.DEFAULT_DATE_FORMAT);
        }
        else {
            return '';
        }
    };
    const isOutsideRange = (day) => {
        if (props.id === 'date_from') {
            return props.maxDate ? day.isAfter(props.maxDate, 'day') : false;
        }
        if (props.id === 'date_to') {
            return props.minDate ? day.isBefore(props.minDate, 'day') : false;
        }
        return false;
    };
    return (_jsxs(_Fragment, { children: [_jsx(TextField, Object.assign({}, props, { icon: (_a = props.icon) !== null && _a !== void 0 ? _a : _jsx(CalendarDates, {}), readonly: !props.allowManualInput, inputRef: setAnchor, value: value(), onClick: (e) => {
                    var _a;
                    setOpen(true);
                    (_a = props.onOpen) === null || _a === void 0 ? void 0 : _a.call(props);
                }, onChange: props.allowManualInput ? handleInputChange : undefined, onKeyDown: props.allowManualInput ? handleKeyDown : undefined })), _jsx(Popup, Object.assign({ id: `date_picker_${props.id}`, className: 'date_picker__popup date_picker__popup-single', onClose: () => {
                    var _a;
                    (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props);
                    setOpen(false);
                }, open: open, title: props.placeholder, anchor: anchor, initContentHeight: 320 }, props.popupProps, { children: _jsx(DayPickerSingleDateController, { date: date, initialVisibleMonth: null, endDateId: '', numberOfMonths: 1, renderCalendarInfo: null, startDateId: '', daySize: 44, onDateChange: handleChange, hideKeyboardShortcutsPanel: true, renderDayContents: (date, dayTypes) => (_jsx("div", { className: `DayContent ${date.weekday() >= 5 && 'DayContent-Weekday'}`, children: date.date() })), focused: true, onFocusChange: () => { }, isOutsideRange: isOutsideRange }) }))] }));
};
//# sourceMappingURL=date_picker.js.map