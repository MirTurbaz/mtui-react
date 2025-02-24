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
import { createPortal } from 'react-dom';
import Close from '../icons/close';
import { Button } from './button';
export const Popup = (_a) => {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var { offset = 6, placement = 'bottom', preventMobileStyle = false } = _a, props = __rest(_a, ["offset", "placement", "preventMobileStyle"]);
    const [ref, setRef] = useState(null);
    const getAncestors = (el) => {
        let ancestors = [];
        while (el) {
            ancestors.unshift(el);
            el = el.parentNode;
        }
        return ancestors;
    };
    useEffect(() => {
        if (!props.container)
            return;
        props.container.style.position = 'relative';
    }, [props.container]);
    const handleBodyClick = (e) => {
        e.stopPropagation();
        const target = e.target;
        if (!target.closest(`#${props.id}`) &&
            !target.closest('.modal_mobile-height_auto') &&
            target.id != props.id &&
            target != props.anchor &&
            !getAncestors(target).includes(props.anchor)) {
            props.onClose();
        }
    };
    useEffect(() => {
        document.body.removeEventListener('click', handleBodyClick);
        if (props.open)
            document.body.addEventListener('click', handleBodyClick);
        return () => {
            document.body.removeEventListener('click', handleBodyClick);
        };
    }, [props.open]);
    if (!props.open)
        return;
    let left;
    let top;
    if (props.anchor && !props.disablePortal) {
        const bbox = props.anchor.getBoundingClientRect();
        const containerBbox = (_b = props.container) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
        const popupWidth = (_c = ref === null || ref === void 0 ? void 0 : ref.getBoundingClientRect().width) !== null && _c !== void 0 ? _c : 0;
        const popupHeight = Math.max((_d = props.initContentHeight) !== null && _d !== void 0 ? _d : 0, (_e = ref === null || ref === void 0 ? void 0 : ref.getBoundingClientRect().height) !== null && _e !== void 0 ? _e : 0);
        const sidebarWidth = (_g = (_f = document.getElementsByClassName('sidebar')[0]) === null || _f === void 0 ? void 0 : _f.clientWidth) !== null && _g !== void 0 ? _g : 0;
        // Calculating "left" position
        if (ref == null) {
            left = bbox.left + bbox.width;
        }
        else if (placement.includes('left')) {
            left = bbox.left - popupWidth - offset;
        }
        else if (['bottom-start', 'top-start'].includes(placement)) {
            left = bbox.left;
        }
        else if (['bottom', 'top'].includes(placement)) {
            left = bbox.left + bbox.width / 2 - popupWidth / 2;
        }
        else if (['bottom-end', 'top-end'].includes(placement)) {
            left = bbox.left + bbox.width - popupWidth;
        }
        else {
            left = bbox.left + bbox.width + offset;
        }
        if (containerBbox)
            left -= containerBbox.left;
        if (!containerBbox && left + popupWidth > window.innerWidth - 18)
            left = window.innerWidth - popupWidth - 18;
        if (!containerBbox && left < sidebarWidth)
            left = sidebarWidth + 18;
        // Calculating "top" position
        if (placement.includes('top')) {
            top = bbox.top - popupHeight - offset;
        }
        else if (['left-start', 'right-start'].includes(placement)) {
            top = bbox.top;
        }
        else if (['left', 'right'].includes(placement)) {
            top = bbox.top + bbox.height / 2 - popupHeight / 2;
        }
        else if (['left-end', 'right-end'].includes(placement)) {
            top = bbox.top + bbox.height - popupHeight;
        }
        else {
            top = bbox.top + bbox.height + offset;
        }
        if (containerBbox)
            top -= containerBbox.top;
        const scrollY = (_j = (_h = props.container) === null || _h === void 0 ? void 0 : _h.scrollTop) !== null && _j !== void 0 ? _j : window.scrollY;
        top += scrollY;
        if (top < 0)
            top = 10;
        if (top + popupHeight - scrollY > window.innerHeight) {
            top = bbox.top - popupHeight - offset + scrollY - ((_k = containerBbox === null || containerBbox === void 0 ? void 0 : containerBbox.top) !== null && _k !== void 0 ? _k : 0);
        }
    }
    const renderPopup = () => {
        var _a, _b;
        return (_jsxs("div", { id: props.id, ref: (newRef) => setRef(newRef), onClick: (e) => e.stopPropagation(), onMouseDown: props.onMouseDown, onMouseUp: props.onMouseUp, className: `popup__wrapper ${preventMobileStyle ? 'popup_prevent-mobile' : ''} ${(_a = props.className) !== null && _a !== void 0 ? _a : ''}`, style: Object.assign({ left: left, top: top, zIndex: 1000000 + ((_b = props.level) !== null && _b !== void 0 ? _b : 0) * 100, opacity: props.anchor && ref ? '1' : '0' }, props.style), children: [_jsxs("div", { className: 'popup__header', children: [_jsx("div", { className: 'popup__title', children: props.title }), _jsx(Button, { onClick: () => {
                                var _a;
                                props.onClose();
                                (_a = props.onCloseBtn) === null || _a === void 0 ? void 0 : _a.call(props);
                            }, children: _jsx(Close, {}) })] }), _jsx("div", { className: 'popup__body', children: props.children })] }));
    };
    if (props.disablePortal) {
        return renderPopup();
    }
    else {
        return createPortal(renderPopup(), (_l = props.container) !== null && _l !== void 0 ? _l : document.body);
    }
};
//# sourceMappingURL=popup.js.map