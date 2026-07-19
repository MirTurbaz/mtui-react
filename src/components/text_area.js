import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
export const TextArea = (props) => {
    var _a, _b;
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState((_a = props.value) !== null && _a !== void 0 ? _a : '');
    const ref = useRef(null);
    useEffect(() => {
        var _a;
        setValue((_a = props.value) !== null && _a !== void 0 ? _a : '');
    }, [props.value]);
    let classNames = `text_area__wrapper ${props.className}`;
    if (focus)
        classNames += ' text_area-focus';
    if ((value === null || value === void 0 ? void 0 : value.length) > 0)
        classNames += ' text_area-filled';
    if (props.disabled)
        classNames += ' text_area-disabled';
    if (((_b = props.placeholder) === null || _b === void 0 ? void 0 : _b.length) == 0 || !props.placeholder)
        classNames += ' text_area-no_placeholder';
    const updateHeight = () => {
        if (!ref.current)
            return;
        ref.current.style.height = '0px';
        const scrollHeight = ref.current.scrollHeight + 20;
        ref.current.style.height = Math.max(scrollHeight, 96) + 'px';
    };
    useEffect(() => {
        updateHeight();
    }, []);
    return (_jsxs("div", { className: 'text_area', style: props.wrapperStyle, children: [_jsx("div", { className: classNames, children: _jsxs("div", { className: 'text_area__input_wrapper', children: [_jsx("textarea", { className: 'text_area__input', onFocus: () => setFocus(true), onClick: props.onClick, disabled: props.disabled, onBlur: () => {
                                var _a;
                                (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props);
                                setFocus(false);
                            }, ref: ref, rows: 3, style: props.style, readOnly: props.readonly, value: value, onChange: (e) => {
                                var _a;
                                updateHeight();
                                setValue(e.target.value);
                                (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, e.target.value);
                            } }), props.placeholder && _jsx("div", { className: 'text_area__placeholder', children: props.placeholder })] }) }), props.bottomLabel && _jsx("div", { className: 'text_area__bottom_label', children: props.bottomLabel })] }));
};
//# sourceMappingURL=text_area.js.map