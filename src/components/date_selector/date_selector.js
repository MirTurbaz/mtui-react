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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Button, Flex, Select } from '../';
import { ChevronLeft, ChevronRight } from '../icons';
import { dayjs } from '../../shared/lib/date';
import { CalendarPanel } from './calendar_panel';
import { MONTHS_OPTIONS, SLIDE_ANIMATION_DURATION, YEAR_OPTIONS } from './constants';
import { ScrolledPanels } from './scrolled_panels';
export const DateSelector = (_a) => {
    var _b, _c, _d, _e, _f;
    var { rangePicker = false, onDateClick, onHoverDate = null, twoPanels = false } = _a, props = __rest(_a, ["rangePicker", "onDateClick", "onHoverDate", "twoPanels"]);
    const startDate = ((_b = props.startDate) === null || _b === void 0 ? void 0 : _b.isValid()) ? props.startDate : null;
    const endDate = ((_c = props.endDate) === null || _c === void 0 ? void 0 : _c.isValid()) ? props.endDate : null;
    const hoverDate = ((_d = props.hoverDate) === null || _d === void 0 ? void 0 : _d.isValid()) ? props.hoverDate : null;
    const minDate = ((_e = props.minDate) === null || _e === void 0 ? void 0 : _e.isValid()) ? props.minDate : null;
    const maxDate = ((_f = props.maxDate) === null || _f === void 0 ? void 0 : _f.isValid()) ? props.maxDate : null;
    const [currentMonth, setCurrentMonth] = useState((startDate !== null && startDate !== void 0 ? startDate : dayjs()).startOf('month'));
    const [displayedMonth, setDisplayedMonth] = useState(currentMonth);
    const [direction, setDirection] = useState(null);
    const withInputs = rangePicker || twoPanels ? false : props.withInputs;
    const goToPrevMonth = () => {
        if (direction)
            return;
        setDirection('left');
    };
    const goToNextMonth = () => {
        if (direction)
            return;
        setDirection('right');
    };
    const commonPanelProps = {
        startDate,
        endDate,
        hoverDate,
        rangePicker,
        minDate,
        maxDate,
    };
    const getWrapperClassName = () => {
        const classes = ['date-selector__wrapper'];
        if (twoPanels)
            classes.push('date-selector__wrapper--two-panels');
        if (rangePicker)
            classes.push('date-selector__wrapper--range-selector');
        return classes.join(' ');
    };
    useEffect(() => {
        if (!direction)
            return;
        const newMonth = dayjs(currentMonth).add(direction == 'right' ? 1 : -1, 'month');
        setCurrentMonth(newMonth);
        const directionTimeout = setTimeout(() => {
            setDirection(null);
            setDisplayedMonth(newMonth);
        }, SLIDE_ANIMATION_DURATION);
        return () => clearTimeout(directionTimeout);
    }, [direction]);
    return (_jsx("div", { className: 'date-selector', children: _jsxs(Flex, { gap: 32, className: getWrapperClassName(), children: [withInputs ? (_jsxs(Flex, { justify: 'space-between', className: 'date-selector__header', gap: 12, children: [_jsx(Select, { label: '', size: 'mini', options: MONTHS_OPTIONS, value: MONTHS_OPTIONS.find(({ value }) => value == displayedMonth.month()), onChange: ({ value }) => {
                                const newMonth = dayjs(currentMonth).month(value);
                                setCurrentMonth(newMonth);
                                setDisplayedMonth(newMonth);
                            }, wrapperClassName: 'date-selector__input-wrapper', className: 'date-selector__input' }), _jsx(Select, { label: '', size: 'mini', options: YEAR_OPTIONS, value: YEAR_OPTIONS.find(({ value }) => value == displayedMonth.year()), onChange: ({ value }) => {
                                const newMonth = dayjs(currentMonth).year(value);
                                setCurrentMonth(newMonth);
                                setDisplayedMonth(newMonth);
                            }, wrapperClassName: 'date-selector__input-wrapper', className: 'date-selector__input' })] })) : (_jsxs(Flex, { justify: 'space-between', className: 'date-selector__header', children: [_jsx(Button, { variant: 'link', className: 'date-selector__nav-button', onClick: goToPrevMonth, icon: _jsx(ChevronLeft, { size: 24 }) }), _jsx(Button, { variant: 'link', className: 'date-selector__nav-button', onClick: goToNextMonth, icon: _jsx(ChevronRight, { size: 24 }) })] })), _jsx(CalendarPanel, Object.assign({}, commonPanelProps, { month: currentMonth, onDateClick: onDateClick, onHoverDate: onHoverDate })), twoPanels && (_jsx(CalendarPanel, Object.assign({}, commonPanelProps, { month: dayjs(currentMonth).add(1, 'month'), onDateClick: onDateClick, onHoverDate: onHoverDate }))), direction && (_jsx(ScrolledPanels, Object.assign({}, commonPanelProps, { month: displayedMonth, direction: direction, twoPanels: twoPanels })))] }) }));
};
//# sourceMappingURL=date_selector.js.map