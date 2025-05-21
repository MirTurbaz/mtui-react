import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useResize } from '../hooks';
import { Close } from './icons';
import { Button } from './button';
export const Tooltip = (props) => {
    const [anchor, setAnchor] = useState(null);
    const [ref, setRef] = useState(null);
    const [height, setHeight] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const { isMobile } = useResize();
    const [clicked, setClicked] = useState(false);
    const timeout = useRef(null);
    useEffect(() => {
        if (!ref)
            return;
        const resizeObserver = new ResizeObserver(() => {
            setHeight(ref.getBoundingClientRect().height);
        });
        resizeObserver.observe(ref);
        return () => resizeObserver.disconnect(); // clean up
    }, [ref]);
    const handleClick = () => {
        var _a;
        let newClicked = !clicked && !props.isLeaveOnClick;
        setClicked(newClicked);
        setIsOpen(newClicked);
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, newClicked);
    };
    const handleMouseEnter = () => {
        var _a;
        if (!isMobile && !clicked) {
            if (props.delay > 0) {
                timeout.current = setTimeout(() => {
                    var _a;
                    setIsOpen(true);
                    (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, true);
                }, props.delay);
            }
            else {
                setIsOpen(true);
                (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, true);
            }
        }
    };
    const handleMouseLeave = (e) => {
        var _a;
        if (!isMobile && !clicked && (!ref || !ref.contains(e.relatedTarget))) {
            if (timeout.current)
                clearTimeout(timeout.current);
            setIsOpen(false);
            (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, false);
        }
    };
    const calculateTooltipPosition = (anchor, placement = 'bottom', ref) => {
        var _a;
        let left = 0;
        let top = 0;
        if (!anchor || !ref)
            return [left, top];
        const anchorRect = anchor.getBoundingClientRect();
        const tooltipRect = ref.getBoundingClientRect();
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;
        const vertical = ['top', 'bottom'].includes(placement);
        const popupHeight = (_a = height !== null && height !== void 0 ? height : ref === null || ref === void 0 ? void 0 : ref.getBoundingClientRect().height) !== null && _a !== void 0 ? _a : 0;
        if (vertical) {
            left = anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2 + scrollX;
        }
        else {
            top = anchorRect.top + (anchorRect.height / 2 - tooltipRect.height / 2) + scrollY;
        }
        if (placement.includes('right')) {
            left = anchorRect.left + anchorRect.width + scrollX;
        }
        else if (placement.includes('left')) {
            left = anchorRect.left - tooltipRect.width + scrollX;
        }
        else if (placement.includes('top')) {
            top = anchorRect.top - tooltipRect.height + scrollY;
        }
        else {
            top = anchorRect.top + anchorRect.height + scrollY;
        }
        if (left < 0)
            left = 18;
        if (top < 0)
            top = 10;
        if (top + popupHeight - scrollY > window.innerHeight) {
            top = anchorRect.top - popupHeight + scrollY;
        }
        if (left + tooltipRect.width - scrollX > window.innerWidth)
            left = window.innerWidth - tooltipRect.width - 18 + scrollX;
        return [left, top];
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            var _a;
            if (isMobile && ref && !ref.contains(event.target) && anchor && !anchor.contains(event.target)) {
                setIsOpen(false);
                (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, false);
                setClicked(false);
            }
        };
        if (isMobile && anchor) {
            document.body.addEventListener('click', handleClickOutside);
        }
        return () => {
            if (isMobile && anchor) {
                document.body.removeEventListener('click', handleClickOutside);
            }
        };
    }, [anchor, ref, isMobile]);
    const renderTooltip = () => {
        let left, top;
        [left, top] = calculateTooltipPosition(anchor, props.placement, ref);
        return createPortal(_jsx("div", { ref: setRef, className: `tooltip__wrapper ${props.className} ${props.animated === false ? 'no-animation' : ''}`, onClick: (e) => e.stopPropagation(), style: { left, top }, children: isMobile ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: 'tooltip__header', children: [_jsx("div", { className: 'tooltip__title', children: props.title }), _jsx(Button, { onClick: () => {
                                    setClicked(false);
                                    setIsOpen(false);
                                }, icon: _jsx(Close, {}) })] }), _jsx("div", { className: 'tooltip__body', children: props.content })] })) : (_jsx("div", { className: 'tooltip__body', children: props.content })) }), document.body);
    };
    return (_jsxs("div", { ref: setAnchor, onClick: handleClick, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [props.children, isOpen && renderTooltip()] }));
};
//# sourceMappingURL=tooltip.js.map