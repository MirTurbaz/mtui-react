import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useResize } from '../hooks/use_resize';
import { Close } from './icons';
import { Button } from './button';
export const Tooltip = (props) => {
    const [anchor, setAnchor] = useState(null);
    const [ref, setRef] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const { isMobile } = useResize();
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        let newClicked = !clicked && !props.isLeaveOnClick;
        setClicked(newClicked);
        setIsOpen(newClicked);
        props.onChange(newClicked);
    };
    const handleMouseEnter = () => {
        if (!isMobile && !clicked) {
            setIsOpen(true);
            props.onChange(true);
        }
    };
    const handleMouseLeave = (e) => {
        if (!isMobile && !clicked && (!ref || !ref.contains(e.relatedTarget))) {
            setIsOpen(false);
            props.onChange(false);
        }
    };
    const calculateTooltipPosition = (anchor, placement = 'bottom', ref) => {
        let left = 0;
        let top = 0;
        if (!anchor || !ref)
            return [left, top];
        const anchorRect = anchor.getBoundingClientRect();
        const tooltipRect = ref.getBoundingClientRect();
        const scrollY = window.scrollY;
        const vertical = ['top', 'bottom'].includes(placement);
        if (vertical) {
            left = anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2;
        }
        else {
            top = anchorRect.top + (anchorRect.height / 2 - tooltipRect.height / 2) + scrollY;
        }
        if (placement.includes('right')) {
            left = anchorRect.left + anchorRect.width;
        }
        else if (placement.includes('left')) {
            left = anchorRect.left - tooltipRect.width;
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
        if (left + tooltipRect.width > window.innerWidth)
            left = window.innerWidth - tooltipRect.width - 18;
        return [left, top];
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobile && ref && !ref.contains(event.target) && anchor && !anchor.contains(event.target)) {
                setIsOpen(false);
                props.onChange(false);
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
                                }, children: _jsx(Close, {}) })] }), _jsx("div", { className: 'tooltip__body', children: props.content })] })) : (_jsx("div", { className: 'tooltip__body', children: props.content })) }), document.body);
    };
    return (_jsxs("div", { ref: setAnchor, onClick: handleClick, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [props.children, isOpen && renderTooltip()] }));
};
//# sourceMappingURL=tooltip.js.map