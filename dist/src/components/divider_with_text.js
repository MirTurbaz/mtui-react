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
export const DividerWithText = (_a) => {
    var { text, className } = _a, props = __rest(_a, ["text", "className"]);
    return (_jsxs("div", Object.assign({ className: `divider_with_text__wrapper ${className}` }, props, { children: [_jsx("div", { className: 'divider_with_text__text', children: text }), _jsx("div", { className: 'divider_with_text__line' })] })));
};
//# sourceMappingURL=divider_with_text.js.map