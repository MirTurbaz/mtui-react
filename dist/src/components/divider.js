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
import { jsx as _jsx } from "react/jsx-runtime";
export const Divider = (_a) => {
    var { vertical, outerPadding = 16, marginVertical = 28 } = _a, props = __rest(_a, ["vertical", "outerPadding", "marginVertical"]);
    const classes = ['divider'];
    classes.push(vertical ? 'divider--vertical' : 'divider--horizontal');
    if (props.className)
        classes.push(props.className);
    return vertical ? (_jsx("div", Object.assign({}, props, { className: classes.join(' '), style: Object.assign({ marginTop: marginVertical, marginBottom: marginVertical, marginLeft: outerPadding, marginRight: outerPadding }, props.style) }))) : (_jsx("div", Object.assign({}, props, { className: classes.join(' '), style: Object.assign({ marginTop: marginVertical, marginBottom: marginVertical, marginLeft: -outerPadding, marginRight: -outerPadding, width: `calc(100% + ${outerPadding * 2}px)` }, props.style) })));
};
//# sourceMappingURL=divider.js.map