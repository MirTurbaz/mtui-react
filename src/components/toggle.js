import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Toggle = (props) => {
    var _a;
    return (_jsxs("div", { className: `toggle__wrapper ${props.className} toggle-size_${(_a = props.size) !== null && _a !== void 0 ? _a : 'normal'}`, children: [_jsx("div", { className: `toggle__background ${props.value === true && 'toggle__background-on'} ${props.value === null && 'toggle__background-unset'}` }), _jsx("div", { className: `toggle__btn_on ${props.value === true && 'toggle__btn_on-active'} ${props.value === null && 'toggle__btn_on-unset'}`, onClick: () => props.onChange(true), children: props.labelOn }), _jsx("div", { className: `toggle__btn_off ${props.value === false && 'toggle__btn_off-active'} ${props.value === null && 'toggle__btn_off-unset'}`, onClick: () => props.onChange(false), children: props.labelOff })] }));
};
//# sourceMappingURL=toggle.js.map