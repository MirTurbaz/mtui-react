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
import { useState } from 'react';
export const Switch = (_a) => {
    var { color = 'green' } = _a, props = __rest(_a, ["color"]);
    const [clicked, setClicked] = useState(false);
    return (_jsxs("div", { className: `switch__wrapper ${props.className} ${props.disabled && 'switch__wrapper-disabled'} ${clicked && 'clicked'}`, style: props.style, onClick: (e) => {
            e.stopPropagation();
            props.onChange(!props.value);
            setClicked(true);
            setTimeout(() => setClicked(false), 200);
        }, children: [_jsx("div", { className: `switch__input ${props.value && `switch__input-checked switch__input-checked-${color}`} ${props.disabled && 'switch__input-disabled'} ${clicked && 'switch__input-clicked'}`, children: _jsx("div", { className: 'switch__circle' }) }), props.label && _jsx("div", { className: 'switch__label', children: props.label })] }));
};
//# sourceMappingURL=switch.js.map