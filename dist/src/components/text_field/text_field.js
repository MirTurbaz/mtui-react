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
import Inputmask from 'inputmask';
import { useEffect, useRef, useState } from 'react';
import { Clear } from '../icons/clear';
export const TextField = (_a) => {
    var _b, _c, _d, _e, _f;
    var props = __rest(_a, []);
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState((_b = props.value) !== null && _b !== void 0 ? _b : '');
    const inputRef = useRef(null);
    const validBoundaries = props.min == null || props.max == null || props.min <= props.max;
    function handleChange({ target: { value: newValue } }) {
        var _a, _b;
        let validValue = newValue !== null && newValue !== void 0 ? newValue : '';
        if (validValue != '' && props.type == 'number' && validBoundaries) {
            if (props.isInteger) {
                validValue = validValue.replace(/\.\d*/, '');
            }
            const numberValue = Number(newValue);
            if (props.min != null && props.min > numberValue)
                validValue = String(props.min);
            if (props.max != null && props.max < numberValue)
                validValue = String(props.max);
        }
        setValue(validValue);
        if (props.mask) {
            (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, validValue.replaceAll('_', ''));
        }
        else {
            (_b = props.onChange) === null || _b === void 0 ? void 0 : _b.call(props, validValue);
        }
    }
    function handleClear(event) {
        var _a;
        setValue('');
        (_a = props.onClear) === null || _a === void 0 ? void 0 : _a.call(props, event);
    }
    function handleBlur(e) {
        var _a;
        (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props);
        setFocus(false);
        if (props.uncontrolled) {
            handleChange(e);
        }
    }
    useEffect(() => {
        var _a, _b, _c, _d, _e, _f;
        if (props.value !== value) {
            if (props.uncontrolled) {
                ((_b = (_a = props.inputRef) === null || _a === void 0 ? void 0 : _a.current) !== null && _b !== void 0 ? _b : inputRef.current).value = (_c = props.value) !== null && _c !== void 0 ? _c : '';
                if (((_d = props.value) === null || _d === void 0 ? void 0 : _d.length) > 0 != (value === null || value === void 0 ? void 0 : value.length) > 0) {
                    setValue((_e = props.value) !== null && _e !== void 0 ? _e : '');
                }
            }
            else {
                setValue((_f = props.value) !== null && _f !== void 0 ? _f : '');
            }
        }
    }, [props.value]);
    let classNames = `text_field__wrapper ${props.className} text_field-size_${(_c = props.size) !== null && _c !== void 0 ? _c : 'default'}`;
    if (focus)
        classNames += ' text_field-focus';
    if ((value === null || value === void 0 ? void 0 : value.length) > 0)
        classNames += ' text_field-filled';
    if (props.disabled)
        classNames += ' text_field-disabled';
    if (props.error)
        classNames += ' text_field-error';
    if (props.borderless)
        classNames += ' text_field__wrapper--borderless';
    useEffect(() => {
        var _a, _b, _c, _d;
        if (!props.mask)
            return;
        if (props.mask != 'Hh:Mm') {
            new Inputmask(props.mask, { showMaskOnHover: false }).mask((_b = (_a = props.inputRef) === null || _a === void 0 ? void 0 : _a.current) !== null && _b !== void 0 ? _b : inputRef.current);
            return;
        }
        new Inputmask(props.mask, {
            definitions: {
                H: {
                    validator: '[0-2]',
                    cardinality: 1,
                },
                h: {
                    validator: function (ch, maskset, pos, strict, opts) {
                        const firstDigit = maskset.buffer[0];
                        if (firstDigit === '2') {
                            return /^[0-3]$/.test(ch);
                        }
                        return /^[0-9]$/.test(ch);
                    },
                    cardinality: 1,
                },
                M: {
                    validator: '[0-5]',
                    cardinality: 1,
                },
                m: {
                    validator: '[0-9]',
                    cardinality: 1,
                },
            },
        }).mask((_c = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) !== null && _c !== void 0 ? _c : (_d = props.inputRef) === null || _d === void 0 ? void 0 : _d.current);
    }, [props.mask]);
    const controlProps = props.uncontrolled ? {} : { value: value, onChange: handleChange };
    const showClearButton = Boolean(!props.uncontrolled && props.onClear && value.length);
    useEffect(() => {
        if (props.focus == null)
            return;
        if (props.focus != focus)
            setFocus(props.focus);
    }, [props.focus]);
    return (_jsxs("div", { className: `text_field ${(_d = props.wrapperClassName) !== null && _d !== void 0 ? _d : ''}`, style: props.wrapperStyle, ref: props.wrapperRef, children: [_jsxs("div", { className: classNames, children: [props.icon && _jsx("div", { className: 'text_field__icon', children: props.icon }), _jsxs("div", { className: 'text_field__input_wrapper', children: [_jsx("input", Object.assign({ ref: (_e = props.inputRef) !== null && _e !== void 0 ? _e : inputRef, className: `text_field__input ${props.hideSpinButtons && 'text_field__input-hide_spin'}`, onFocus: () => {
                                    var _a;
                                    if (props.focus != null)
                                        return;
                                    setFocus(true);
                                    (_a = props.onFocus) === null || _a === void 0 ? void 0 : _a.call(props);
                                }, onClick: props.onClick, onMouseDown: props.onMouseDown, disabled: props.disabled, onBlur: handleBlur, onWheel: (event) => {
                                    if (props.type == 'number') {
                                        const target = event.target;
                                        target.blur();
                                    }
                                }, type: props.type, required: props.required, style: props.style, readOnly: props.readonly, min: validBoundaries ? props.min : undefined, max: validBoundaries ? props.max : undefined }, controlProps, { onKeyDown: (e) => {
                                    var _a, _b;
                                    if (e.key === 'Enter')
                                        (_a = props.onEnter) === null || _a === void 0 ? void 0 : _a.call(props);
                                    (_b = props.onKeyDown) === null || _b === void 0 ? void 0 : _b.call(props, e);
                                }, autoFocus: props.autofocus })), _jsx("div", { className: 'text_field__placeholder', children: props.placeholder })] }), showClearButton ? (_jsxs("label", { className: 'text_field__clear', children: [_jsx("button", { type: 'button', hidden: true, onClick: handleClear }), (_f = props.clearIcon) !== null && _f !== void 0 ? _f : _jsx(Clear, {})] })) : ('')] }), props.bottomLabel && _jsx("div", { className: 'text_field__bottom_label', children: props.bottomLabel }), typeof props.error !== 'boolean' && props.error && (_jsx("div", { className: 'text_field__bottom_error', children: props.error }))] }));
};
//# sourceMappingURL=text_field.js.map