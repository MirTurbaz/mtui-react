import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useResize } from '../../hooks/use_resize';
import Close from '../icons/close';
import { Button } from './button';
export const Tooltip = (props) => {
    const [anchor, setAnchor] = useState(null);
    const [ref, setRef] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const { isMobile } = useResize();
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        let newClicked = !clicked;
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
        var _a;
        let left, top;
        if (anchor) {
            const bbox = anchor.getBoundingClientRect();
            const tooltipWidth = (_a = ref === null || ref === void 0 ? void 0 : ref.getBoundingClientRect().width) !== null && _a !== void 0 ? _a : 0;
            left = bbox.left + bbox.width / 2 - tooltipWidth / 2;
            if (left + tooltipWidth > window.innerWidth)
                left = window.innerWidth - tooltipWidth - 18;
            if (left < 0)
                left = 18;
            top = bbox.top + bbox.height + window.scrollY;
            if (top < 0)
                top = 10;
        }
        return createPortal(_jsx("div", { ref: setRef, className: `tooltip__wrapper ${props.className} ${props.animated === false ? 'no-animation' : ''}`, onClick: (e) => e.stopPropagation(), style: { left, top }, children: isMobile ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: 'tooltip__header', children: [_jsx("div", { className: 'tooltip__title', children: props.title }), _jsx(Button, { onClick: () => {
                                    setClicked(false);
                                    setIsOpen(false);
                                }, children: _jsx(Close, {}) })] }), _jsx("div", { className: 'tooltip__body', children: props.content })] })) : (_jsx("div", { className: 'tooltip__body', children: props.content })) }), document.body);
    };
    return (_jsxs("div", { ref: setAnchor, onClick: handleClick, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [props.children, isOpen && renderTooltip()] }));
};
//# sourceMappingURL=tooltip.js.map