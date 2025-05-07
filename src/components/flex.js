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
import { forwardRef } from 'react';
export const Flex = forwardRef((_a, ref) => {
    var { vertical = false, wrap = false, flex, align, justify, gap, className = '', style = {}, component: Component = 'div', children } = _a, props = __rest(_a, ["vertical", "wrap", "flex", "align", "justify", "gap", "className", "style", "component", "children"]);
    let flexClassName = `${className} flex-container ${vertical ? 'flex-container_vertical' : ''} ${wrap ? 'flex-container_wrap' : ''}`;
    const styles = Object.assign({}, style);
    if (justify)
        flexClassName += ` flex-container_justify_${justify}`;
    if (align)
        flexClassName += ` flex-container_align_${align}`;
    if (typeof gap === 'string') {
        flexClassName += ` flex-container_gap_${gap}`;
    }
    else if (gap != null) {
        styles.gap = gap;
    }
    if (flex)
        styles.flex = flex;
    return (_jsx(Component, Object.assign({ ref: ref, className: flexClassName, style: styles }, props, { children: children })));
});
//# sourceMappingURL=flex.js.map