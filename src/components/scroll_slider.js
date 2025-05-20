import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from './icons';
export const ScrollSlider = (props) => {
    var _a;
    const [ref, setRef] = useState(null);
    const [isLeft, setIsLeft] = useState(false);
    const [isRight, setIsRight] = useState(false);
    const handlePrev = () => {
        ref.scrollTo({
            top: 0,
            left: Math.max(ref.scrollLeft - 500, 0),
            behavior: 'smooth',
        });
    };
    const handleNext = () => {
        ref.scrollTo({
            top: 0,
            left: ref.scrollLeft + 500,
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
    return (_jsxs("div", { className: `scroll_slider__wrapper ${(_a = props.className) !== null && _a !== void 0 ? _a : ''}`, children: [_jsx("div", { className: `scroll_slider`, ref: setRef, onScroll: handleScroll, children: props.children }), _jsxs("div", { className: 'scroll_slider__arrows', children: [_jsx("div", { className: `scroll_slider__arrow ${isLeft ? 'scroll_slider__arrow_hidden' : ''}`, onClick: handlePrev, children: _jsx(ChevronLeft, { size: 24 }) }), _jsx("div", { className: `scroll_slider__arrow ${isRight ? 'scroll_slider__arrow_hidden' : ''}`, onClick: handleNext, children: _jsx(ChevronRight, { size: 24 }) })] })] }));
};
//# sourceMappingURL=scroll_slider.js.map