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
import { useEffect, useRef, useState } from 'react';
import { HEADER_HEIGHT } from './common';
import { Expand } from './icons';
export const Accordion = (_a) => {
    var _b;
    var { showExpand = true, scrollOnOpen = false } = _a, props = __rest(_a, ["showExpand", "scrollOnOpen"]);
    const [open, setOpen] = useState((_b = props.opened) !== null && _b !== void 0 ? _b : false);
    const contentRef = useRef(null);
    useEffect(() => {
        var _a;
        setOpen((_a = props.opened) !== null && _a !== void 0 ? _a : false);
    }, [props.opened]);
    useEffect(() => {
        if (open && scrollOnOpen && contentRef.current) {
            setTimeout(() => {
                if (contentRef.current) {
                    const offset = HEADER_HEIGHT;
                    const elementPosition = contentRef.current.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                }
            }, 100);
        }
    }, [open, scrollOnOpen]);
    const handleToggle = (e) => {
        var _a;
        const target = e.target;
        if (target.closest('.text_field') || target.closest('.button'))
            return;
        (_a = props.onToggle) === null || _a === void 0 ? void 0 : _a.call(props);
        setOpen(!open);
    };
    return (_jsxs("div", { ref: contentRef, className: `accordion__wrapper ${props.className} ${open && 'opened'}`, "data-id": props.dataId, children: [_jsxs("div", { className: 'accordion__header', onClick: handleToggle, children: [props.header, showExpand && _jsx(Expand, { rotated: open })] }), open && _jsx("div", { className: 'accordion__content', children: props.children })] }));
};
//# sourceMappingURL=accordion.js.map