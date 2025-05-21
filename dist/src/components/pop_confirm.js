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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useResize } from '../hooks';
import { Button } from './button';
import { Flex } from './flex';
import { Modal } from './modal';
export const PopConfirm = (_a) => {
    var { cancelText = 'Отмена', okText = 'Да' } = _a, props = __rest(_a, ["cancelText", "okText"]);
    const [open, setOpen] = useState(props.open);
    const { isMobile } = useResize();
    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);
    function handleClose() {
        setOpen(false);
    }
    function handleCancel(e) {
        var _a;
        (_a = props.onCancel) === null || _a === void 0 ? void 0 : _a.call(props, e);
        handleClose();
    }
    function handleConfirm(e) {
        props.onConfirm(e);
        handleClose();
    }
    return (_jsxs(_Fragment, { children: [props.children && _jsx("div", { onClick: () => setOpen(true), children: props.children }), _jsxs(Modal, { className: 'modal_mobile-height_auto', open: open, onClose: handleCancel, title: _jsx(Flex, { vertical: true, className: 'margin-top-14 margin-bottom-14', children: _jsx("span", { className: 'typography-h2', children: props.title }) }), titleClassName: 'flex-container flex-container_align_start no-border padding-bottom-0', bodyClassName: 'padding-top-12', size: isMobile ? 'xs' : 'sm', children: [_jsx(Flex, { children: props.description && _jsx("span", { className: 'typography-regular-3', children: props.description }) }), _jsxs(Flex, { justify: 'start', className: 'modal__buttons', gap: 'small', children: [_jsx(Button, { variant: 'filled', color: 'primary', onClick: handleConfirm, children: okText }), !props.withoutCancel && (_jsx(Button, { variant: 'outline', onClick: handleCancel, children: cancelText }))] })] })] }));
};
//# sourceMappingURL=pop_confirm.js.map