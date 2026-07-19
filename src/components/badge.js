import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Badge = (props) => {
    return (_jsxs("div", { className: `badge__wrapper ${props.className}`, children: [props.children, !isNaN(+props.value) && +props.value > 0 && _jsx("div", { className: 'badge__value', children: props.value })] }));
};
//# sourceMappingURL=badge.js.map