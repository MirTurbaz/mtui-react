import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
export const ExpandText = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflowed, setIsOverflowed] = useState(false);
    const contentRef = useRef(null);
    useEffect(() => {
        if (contentRef.current) {
            const contentHeight = contentRef.current.scrollHeight;
            setIsOverflowed(contentHeight > props.maxHeight);
        }
    }, [props.children, props.maxHeight]);
    return (_jsxs("div", { className: 'expand-text expand-text__wrapper', children: [_jsx("div", { className: `expand-text__content ${isExpanded || !isOverflowed ? 'expanded' : 'collapsed'}`, style: { maxHeight: isExpanded ? 'none' : `${props.maxHeight}px` }, ref: contentRef, children: props.children }), !isExpanded && isOverflowed && (_jsx("div", { className: 'typography-regular expand-btn', onClick: () => setIsExpanded(true), children: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E" }))] }));
};
//# sourceMappingURL=expand_text.js.map