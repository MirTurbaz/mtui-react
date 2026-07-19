import { jsx as _jsx } from "react/jsx-runtime";
export const Loader = (props) => {
    var _a, _b;
    return (_jsx("div", { className: `loader ${(_a = props.className) !== null && _a !== void 0 ? _a : ''} loader-${(_b = props.variant) !== null && _b !== void 0 ? _b : 'square'}`, style: Object.assign(Object.assign({}, props.style), { height: props.height, width: props.width, borderRadius: props.radius }), children: props.children }));
};
//# sourceMappingURL=loader.js.map