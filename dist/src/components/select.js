import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Expand } from './icons';
import { TextField } from './text_field';
export const Select = (props) => {
    var _a, _b;
    const [value, setValue] = useState(props.value);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [ref, setRef] = useState(null);
    const [selectOptions, setSelectOptions] = useState((_a = props.options) !== null && _a !== void 0 ? _a : []);
    useEffect(() => {
        setValue(props.value);
        setSearch('');
    }, [props.value]);
    useEffect(() => {
        if (!open)
            return;
        const handleBodyClick = (event) => {
            if (!ref || ref.contains(event.target))
                return;
            setOpen(false);
        };
        document.body.addEventListener('click', handleBodyClick);
        return () => document.body.removeEventListener('click', handleBodyClick);
    }, [ref, open]);
    const isSelectFilled = value && value.value != null && value.value !== '';
    let classNames = `select__wrapper ${props.className} select-size_${(_b = props.size) !== null && _b !== void 0 ? _b : 'default'}`;
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
    useEffect(() => {
        var _a;
        setSelectOptions(((_a = props.options) !== null && _a !== void 0 ? _a : []).filter((option) => option.label.toString().toLowerCase().includes(search.toLowerCase())));
    }, [props.options, search]);
    return (_jsxs("div", { style: props.wrapperStyle, className: props.wrapperClassName, children: [_jsxs("div", { onClick: () => setOpen(!open), className: classNames, ref: setRef, style: props.style, children: [_jsxs("div", { className: 'select__input', children: [props.size != 'mini' && _jsx("div", { className: 'select__label', children: props.label }), (props.size == 'mini' || value) && (_jsx("div", { className: 'select__value', children: isSelectFilled ? value.label : props.placeholder }))] }), _jsx(Expand, { rotated: open }), _jsxs("div", { className: 'select__options', children: [props.withSearch && (_jsx(TextField, { value: search, onChange: setSearch, onClick: (event) => event.stopPropagation() })), selectOptions.map((option, index) => (_jsx("div", { className: 'select__option', onClick: (e) => {
                                    e.stopPropagation();
                                    if (props.onChange) {
                                        props.onChange(option);
                                    }
                                    else {
                                        setValue(option);
                                    }
                                    setOpen(false);
                                }, children: option.label }, index)))] })] }), typeof props.error !== 'boolean' && props.error && (_jsx("div", { className: 'text_field__bottom_error', children: props.error }))] }));
};
//# sourceMappingURL=select.js.map