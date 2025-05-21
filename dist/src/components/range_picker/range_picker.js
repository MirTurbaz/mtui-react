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
import { Button, Popup, TextField } from '../';
import { Today } from '../icons';
import { RANGE_PICKER_CONFIG } from './inner/config';
export const RangePicker = (_a) => {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    var { picker = 'date', textFieldProps = {}, popupProps = {} } = _a, props = __rest(_a, ["picker", "textFieldProps", "popupProps"]);
    const minDate = ((_b = props.minDate) === null || _b === void 0 ? void 0 : _b.isValid()) ? props.minDate : null;
    const maxDate = ((_c = props.maxDate) === null || _c === void 0 ? void 0 : _c.isValid()) ? props.maxDate : null;
    const [showCalendar, setShowCalendar] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [hoverDate, setHoverDate] = useState(null);
    const [anchor, setAnchor] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const { defaultIcon, renderTwoInputs, renderSelector } = (_d = RANGE_PICKER_CONFIG[picker]) !== null && _d !== void 0 ? _d : {
        defaultIcon: null,
        renderTwoInputs: () => null,
        renderSelector: () => null,
        formatDate: () => '',
    };
    const formatDate = (_g = (_e = props.formatDate) !== null && _e !== void 0 ? _e : (_f = RANGE_PICKER_CONFIG[picker]) === null || _f === void 0 ? void 0 : _f.formatDate) !== null && _g !== void 0 ? _g : (() => '');
    const handleDateClick = (date) => {
        if ((minDate && date.isBefore(minDate, picker)) || (maxDate && date.isAfter(maxDate, picker))) {
            return;
        }
        if (!startDate || (startDate && endDate)) {
            setStartDate(date);
            setEndDate(null);
            setFocusedInput('last');
        }
        else {
            if (date.isBefore(startDate, picker)) {
                setStartDate(date);
                setEndDate(startDate);
                setShowCalendar(false);
            }
            else if (props.allowSingleDate || !date.isSame(startDate, picker)) {
                setEndDate(date);
                setShowCalendar(false);
            }
        }
    };
    const getValue = () => {
        if (startDate && !startDate.isSame(endDate)) {
            return `${formatDate(startDate)} - ${formatDate(endDate) || '...'}`;
        }
        else if (startDate && startDate.isSame(endDate)) {
            return formatDate(startDate);
        }
        else {
            return '';
        }
    };
    const renderInputs = () => {
        var _a;
        if (props.variant == 'twoInputs') {
            return renderTwoInputs === null || renderTwoInputs === void 0 ? void 0 : renderTwoInputs(setAnchor, formatDate(startDate), formatDate(endDate), setShowCalendar, focusedInput, textFieldProps);
        }
        else if (props.variant == 'button') {
            return (_jsx(Button, { variant: 'outline', btnRef: setAnchor, onClick: () => setShowCalendar(true), icon: (_a = textFieldProps === null || textFieldProps === void 0 ? void 0 : textFieldProps.icon) !== null && _a !== void 0 ? _a : _jsx(Today, {}) }));
        }
        else {
            return (_jsx(TextField, Object.assign({ icon: defaultIcon, readonly: true, size: 'mini', style: { minWidth: 200 }, wrapperRef: setAnchor, value: getValue(), onClick: (_) => {
                    setShowCalendar(true);
                } }, textFieldProps)));
        }
    };
    useEffect(() => {
        if (props.variant != 'twoInputs')
            return;
        setFocusedInput(showCalendar ? 'first' : null);
    }, [showCalendar]);
    useEffect(() => {
        var _a, _b;
        if (picker == 'date') {
            (_a = props.onChangeDates) === null || _a === void 0 ? void 0 : _a.call(props, startDate, endDate);
        }
        else if (picker == 'month') {
            (_b = props.onChangeMonths) === null || _b === void 0 ? void 0 : _b.call(props, startDate, endDate);
        }
    }, [startDate, endDate]);
    useEffect(() => {
        var _a, _b, _c, _d;
        if (picker != 'date')
            return;
        if (((_a = props.startDate) === null || _a === void 0 ? void 0 : _a.isValid()) && !((_b = props.startDate) === null || _b === void 0 ? void 0 : _b.isSame(startDate, picker))) {
            setStartDate(props.startDate);
        }
        if (((_c = props.endDate) === null || _c === void 0 ? void 0 : _c.isValid()) && !((_d = props.endDate) === null || _d === void 0 ? void 0 : _d.isSame(endDate, picker))) {
            setEndDate(props.endDate);
        }
    }, [props.startDate, props.endDate]);
    useEffect(() => {
        var _a, _b, _c, _d;
        if (picker != 'month')
            return;
        if (((_a = props.startMonth) === null || _a === void 0 ? void 0 : _a.isValid()) && !((_b = props.startMonth) === null || _b === void 0 ? void 0 : _b.isSame(startDate, picker))) {
            setStartDate(props.startMonth);
        }
        if (((_c = props.endMonth) === null || _c === void 0 ? void 0 : _c.isValid()) && !((_d = props.endMonth) === null || _d === void 0 ? void 0 : _d.isSame(endDate, picker))) {
            setEndDate(props.endMonth);
        }
    }, [props.startMonth, props.endMonth]);
    return (_jsxs(_Fragment, { children: [renderInputs(), _jsx(Popup, { id: (_h = popupProps.id) !== null && _h !== void 0 ? _h : `range-picker-${props.id}`, className: (_j = popupProps.className) !== null && _j !== void 0 ? _j : 'date-picker__popup', open: (_k = popupProps.open) !== null && _k !== void 0 ? _k : showCalendar, onClose: (_l = popupProps.onClose) !== null && _l !== void 0 ? _l : (() => setShowCalendar(false)), anchor: (_m = popupProps.anchor) !== null && _m !== void 0 ? _m : anchor, initContentHeight: (_o = popupProps.initContentHeight) !== null && _o !== void 0 ? _o : 320, onMouseUp: popupProps.onMouseUp, onMouseDown: popupProps.onMouseDown, onCloseBtn: popupProps.onCloseBtn, title: popupProps.title, offset: popupProps.offset, level: popupProps.level, placement: popupProps.placement, preventMobileStyle: popupProps.preventMobileStyle, container: popupProps.container, disablePortal: popupProps.disablePortal, style: popupProps.style, children: renderSelector === null || renderSelector === void 0 ? void 0 : renderSelector({ startDate, endDate }, { minDate, maxDate }, hoverDate, handleDateClick, setHoverDate, (_p = props.twoPanels) !== null && _p !== void 0 ? _p : true) })] }));
};
//# sourceMappingURL=range_picker.js.map