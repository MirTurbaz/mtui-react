import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export const Radio = (props) => {
    var _a;
    const [clicked, setClicked] = useState(false);
    let className = `radio__wrapper ${props.className} radio__wrapper-${(_a = props.variant) !== null && _a !== void 0 ? _a : 'default'}`;
    if (props.disabled)
        className += ' radio__wrapper-disabled';
    if (clicked)
        className += ' clicked';
    if (props.checked)
        className += ' radio__wrapper-checked';
    return (_jsxs("div", { style: props.style, className: className, onClick: (e) => {
            e.stopPropagation();
            props.onClick();
            setClicked(true);
            setTimeout(() => setClicked(false), 200);
        }, children: [_jsx("div", { className: `radio__input ${props.checked && 'radio__input-checked'} ${props.disabled && 'radio__input-disabled'}` }), _jsx("div", { className: 'radio__label', children: props.label })] }));
};
//# sourceMappingURL=radio.js.map