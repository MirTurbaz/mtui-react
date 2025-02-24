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
import { AlertCircle } from '../icons/alert_circle';
export const Alert = (_a) => {
    var _b;
    var { status = 'default', size = 'middle', type = 'default' } = _a, props = __rest(_a, ["status", "size", "type"]);
    return (_jsxs("div", { className: `${(_b = props.className) !== null && _b !== void 0 ? _b : ''} alert alert_status_${status} alert_size_${size} alert_type_${type}`, children: [props.icon, props.icon !== false && !props.icon && _jsx(AlertCircle, {}), _jsx("span", { children: props.message })] }));
};
//# sourceMappingURL=alert.js.map