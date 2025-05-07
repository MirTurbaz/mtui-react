import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export const Checkbox = (props) => {
    const [clicked, setClicked] = useState(false);
    return (_jsxs("div", { className: `checkbox__wrapper ${props.className} ${props.disabled && 'checkbox__wrapper-disabled'} ${clicked && 'clicked'}`, style: props.style, onClick: (e) => {
            e.stopPropagation();
            props.onChange(!props.value);
            setClicked(true);
            setTimeout(() => setClicked(false), 200);
        }, children: [_jsxs("div", { className: `checkbox__input ${props.value && 'checkbox__input-checked'} ${props.disabled && 'checkbox__input-disabled'} ${props.withBackground && 'checkbox__input-with_background'}`, children: [_jsx("div", { className: 'checkbox__checkmark-first' }), _jsx("div", { className: 'checkbox__checkmark-second' })] }), props.label && _jsx("div", { className: 'checkbox__label', children: props.label })] }));
};
//# sourceMappingURL=checkbox.js.map