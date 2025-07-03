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
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from './icons';
export const ScrollSlider = (_a) => {
    var _b;
    var { scrollWidth = 500 } = _a, props = __rest(_a, ["scrollWidth"]);
    const [ref, setRef] = useState(null);
    const [isLeft, setIsLeft] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const handlePrev = () => {
        ref.scrollTo({
            top: 0,
            left: Math.max(ref.scrollLeft - scrollWidth, 0),
            behavior: 'smooth',
        });
    };
    const handleNext = () => {
        ref.scrollTo({
            top: 0,
            left: ref.scrollLeft + scrollWidth,
            behavior: 'smooth',
        });
    };
    const handleScroll = () => {
        setIsLeft(!ref.scrollLeft);
        setIsRight(ref.scrollWidth === ref.scrollLeft + ref.getBoundingClientRect().width);
    };
    useEffect(() => {
        if (ref)
            handleScroll();
    }, [ref]);
    return (_jsxs("div", { className: `scroll-slider__wrapper ${(_b = props.className) !== null && _b !== void 0 ? _b : ''}`, children: [_jsx("div", { className: `scroll-slider`, ref: setRef, onScroll: handleScroll, children: props.children }), _jsxs("div", { className: 'scroll-slider__arrows', children: [_jsx("div", { className: `scroll-slider__arrow ${isLeft ? 'scroll-slider__arrow_hidden' : ''}`, onClick: handlePrev, children: _jsx(ChevronLeft, { size: 24 }) }), _jsx("div", { className: `scroll-slider__arrow ${isRight ? 'scroll-slider__arrow_hidden' : ''}`, onClick: handleNext, children: _jsx(ChevronRight, { size: 24 }) })] })] }));
};
//# sourceMappingURL=scroll_slider.js.map