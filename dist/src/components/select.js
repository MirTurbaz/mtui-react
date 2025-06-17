import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Expand } from './icons';
export const Select = (props) => {
    var _a, _b, _c;
    const [value, setValue] = useState(props.value);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [ref, setRef] = useState(null);
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);
    const handleOutsideCLick = (event) => {
        if (ref.contains(event.target)) {
            setOpen(false);
        }
    };
    useEffect(() => {
        if (open)
            document.body.addEventListener('click', handleOutsideCLick);
        return () => document.body.removeEventListener('click', handleOutsideCLick);
    }, [open]);
    const isSelectFilled = value && value.value != null && value.value !== '';
    let classNames = `select__wrapper ${props.className} select-size_${(_a = props.size) !== null && _a !== void 0 ? _a : 'default'}`;
    if (open)
        classNames += ' select-opened';
    if (isSelectFilled)
        classNames += ' select-filled';
    if (props.disabled)
        classNames += ' select-disabled';
    if (window.innerHeight - (ref === null || ref === void 0 ? void 0 : ref.getBoundingClientRect().bottom) < 350 && !props.forcePositionBottom) {
        classNames += ' select-open_top';
    }
    if (props.error)
        classNames += ' select-error';
    const valueElement = props.withSearch ? (_jsx("input", { value: open ? search : isSelectFilled ? value.label : props.placeholder, onChange: (e) => setSearch(e.target.value), className: 'select__search' })) : (_jsx("div", { className: 'select__value', children: isSelectFilled ? value.label : props.placeholder }));
    return (_jsxs("div", { style: props.wrapperStyle, className: props.wrapperClassName, children: [_jsxs("div", { onClick: () => setOpen(!open), className: classNames, ref: setRef, style: props.style, children: [_jsxs("div", { className: 'select__left', children: [props.icon && _jsx("div", { className: 'text_field__icon', children: props.icon }), _jsxs("div", { className: 'select__input', children: [props.size != 'mini' && _jsx("div", { className: 'select__label', children: props.label }), (props.size == 'mini' || value) && valueElement] })] }), _jsx(Expand, { rotated: open }), _jsx("div", { className: 'select__options', children: (_c = (_b = props.options) === null || _b === void 0 ? void 0 : _b.filter((option) => option.label.toString().toLowerCase().includes(search.toLowerCase()))) === null || _c === void 0 ? void 0 : _c.map((option, index) => (_jsx("div", { className: 'select__option', onClick: (e) => {
                                e.stopPropagation();
                                if (props.onChange) {
                                    props.onChange(option);
                                }
                                else {
                                    setValue(option);
                                }
                                setOpen(false);
                            }, children: option.label }, index))) })] }), typeof props.error !== 'boolean' && props.error && (_jsx("div", { className: 'text_field__bottom_error', children: props.error }))] }));
};
//# sourceMappingURL=select.js.map