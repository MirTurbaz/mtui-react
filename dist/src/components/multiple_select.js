import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Done, Expand } from './icons';
import { Popup } from './popup';
export const MultipleSelect = (props) => {
    var _a, _b, _c, _d;
    const [open, setOpen] = useState(false);
    const [ref, setRef] = useState(null);
    return (_jsxs("div", { style: props.wrapperStyle, className: props.wrapperClassName, children: [_jsxs("div", { onClick: (e) => {
                    e.stopPropagation();
                    setOpen(!open);
                }, className: `multiple_select__wrapper ${open && 'multiple_select__wrapper-open'} multiple_select-size_${(_a = props.size) !== null && _a !== void 0 ? _a : 'default'}`, style: props.style, ref: setRef, children: [props.icon && _jsx("div", { className: 'text_field__icon', children: props.icon }), _jsxs("div", { className: 'multiple_select__input', children: [!((_b = props.value) === null || _b === void 0 ? void 0 : _b.length) && _jsx("div", { className: 'multiple_select__label', children: props.label }), (_c = props.value) === null || _c === void 0 ? void 0 : _c.map((v, i) => {
                                var _a;
                                let option = props.options.find((o) => o.value == v);
                                if (props.renderOption) {
                                    return (_jsx("div", { onClick: (e) => {
                                            e.stopPropagation();
                                            props.onChange(props.value.filter((v) => v != option.value));
                                        }, children: props.renderOption(option, true) }));
                                }
                                else {
                                    return (_jsxs("div", { children: [option.label, i + 1 != ((_a = props.value) === null || _a === void 0 ? void 0 : _a.length) && ', '] }));
                                }
                            })] }), _jsx(Expand, { rotated: open })] }), _jsx(Popup, { open: open, anchor: ref, onClose: () => setOpen(false), id: 'multiselect_popup', children: _jsx("div", { className: 'multiple_select__options', children: (_d = props.options) === null || _d === void 0 ? void 0 : _d.map((option, index) => {
                        var _a, _b;
                        return (_jsxs("div", { className: `multiple_select__option ${((_a = props.value) === null || _a === void 0 ? void 0 : _a.includes(option.value)) && 'multiple_select__option-selected'}`, onClick: (e) => {
                                var _a, _b;
                                e.stopPropagation();
                                if ((_a = props.value) === null || _a === void 0 ? void 0 : _a.includes(option.value)) {
                                    props.onChange(props.value.filter((v) => v != option.value));
                                }
                                else {
                                    props.onChange([...((_b = props.value) !== null && _b !== void 0 ? _b : []), option.value]);
                                }
                                setOpen(false);
                            }, children: [props.renderOption ? props.renderOption(option, false) : option.label, ((_b = props.value) === null || _b === void 0 ? void 0 : _b.includes(option.value)) && _jsx(Done, { color: '#000000CC' })] }, index));
                    }) }) })] }));
};
//# sourceMappingURL=multiple_select.js.map