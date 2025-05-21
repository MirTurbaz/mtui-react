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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Popup, TextField } from '../';
import { DEFAULT_DATE_FORMAT } from '../../shared/constants/date';
import { dayjs } from '../../shared/lib/date';
import { DateSelector } from '../date_selector';
import { MonthSelector } from '../month_selector';
import { RangePicker } from '../range_picker';
import { DATE_PICKER_CONFIG } from './inner/config';
const DatePicker = (_a) => {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var { picker = 'date', popupProps } = _a, props = __rest(_a, ["picker", "popupProps"]);
    const minDate = ((_b = props.minDate) === null || _b === void 0 ? void 0 : _b.isValid()) ? props.minDate : null;
    const maxDate = ((_c = props.maxDate) === null || _c === void 0 ? void 0 : _c.isValid()) ? props.maxDate : null;
    const [date, setDate] = useState(((_d = props[picker]) === null || _d === void 0 ? void 0 : _d.isValid()) ? props[picker] : null);
    const [hoverDate, setHoverDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const { defaultIcon, getValue } = (_e = DATE_PICKER_CONFIG[picker]) !== null && _e !== void 0 ? _e : {
        defaultIcon: null,
        getValue: () => null,
    };
    const handleChange = (newValue) => {
        var _a, _b;
        if ((minDate && newValue.isBefore(minDate, picker)) || (maxDate && newValue.isAfter(maxDate, picker))) {
            return;
        }
        setDate(newValue);
        if (picker == 'date') {
            (_a = props.onChangeDate) === null || _a === void 0 ? void 0 : _a.call(props, newValue);
        }
        else if (picker == 'month') {
            (_b = props.onChangeMonth) === null || _b === void 0 ? void 0 : _b.call(props, newValue);
        }
        setShowCalendar(false);
    };
    const handleInputChange = (value) => {
        if (picker != 'date' && !props.allowManualInput)
            return;
        if (value === '') {
            handleChange(null);
        }
        else {
            const inputDate = dayjs(value, DEFAULT_DATE_FORMAT);
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
    useEffect(() => {
        var _a, _b;
        if (showCalendar) {
            (_a = props.onOpen) === null || _a === void 0 ? void 0 : _a.call(props);
        }
        else {
            (_b = props.onClose) === null || _b === void 0 ? void 0 : _b.call(props);
        }
    }, [showCalendar]);
    useEffect(() => {
        var _a;
        if ((props[picker] == null && date == null) || ((_a = props[picker]) === null || _a === void 0 ? void 0 : _a.isSame(date, picker)))
            return;
        setDate(props[picker]);
    }, [props[picker]]);
    return (_jsxs(_Fragment, { children: [_jsx(TextField, Object.assign({ icon: defaultIcon, readonly: !props.allowManualInput, inputRef: setAnchor, value: getValue(date), onClick: () => setShowCalendar(true), onChange: props.allowManualInput ? handleInputChange : undefined, onKeyDown: props.allowManualInput ? handleKeyDown : undefined }, props.textFieldProps)), _jsx(Popup, { id: (_f = popupProps.id) !== null && _f !== void 0 ? _f : `date-picker-${props.id}`, className: (_g = popupProps.className) !== null && _g !== void 0 ? _g : 'date-picker__popup', open: (_h = popupProps.open) !== null && _h !== void 0 ? _h : showCalendar, onClose: (_j = popupProps.onClose) !== null && _j !== void 0 ? _j : (() => setShowCalendar(false)), anchor: (_k = popupProps.anchor) !== null && _k !== void 0 ? _k : anchor, initContentHeight: (_l = popupProps.initContentHeight) !== null && _l !== void 0 ? _l : 320, onMouseUp: popupProps.onMouseUp, onMouseDown: popupProps.onMouseDown, onCloseBtn: popupProps.onCloseBtn, title: popupProps.title, offset: popupProps.offset, level: popupProps.level, placement: popupProps.placement, preventMobileStyle: popupProps.preventMobileStyle, container: popupProps.container, disablePortal: popupProps.disablePortal, style: popupProps.style, children: picker == 'month' ? (_jsx(MonthSelector, { startMonth: date, endMonth: null, hoverMonth: hoverDate, onHoverMonth: setHoverDate, onMonthClick: handleChange })) : (_jsx(DateSelector, { startDate: date, endDate: null, hoverDate: hoverDate, onHoverDate: setHoverDate, onDateClick: handleChange, minDate: minDate, maxDate: maxDate, twoPanels: (_m = props.twoPanels) !== null && _m !== void 0 ? _m : false, withInputs: props.withInputs })) })] }));
};
DatePicker.RangePicker = RangePicker;
export { DatePicker };
//# sourceMappingURL=date_picker.js.map