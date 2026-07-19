import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createPortal } from 'react-dom';
import { Close } from './icons';
import { Button } from './button';
export const Modal = (props) => {
    var _a, _b, _c;
    if (!props.open)
        return;
    return createPortal(_jsx("div", { className: `modal__overlay ${props.overlayClassName}`, onMouseDown: props.onClose, children: _jsxs("div", { onClick: (e) => e.stopPropagation(), onMouseDown: (e) => e.stopPropagation(), className: `modal__wrapper ${props.className} modal__wrapper-size_${(_a = props.size) !== null && _a !== void 0 ? _a : 'sm'}`, children: [_jsxs("div", { className: `modal__title ${(_b = props.titleClassName) !== null && _b !== void 0 ? _b : ''}`, children: [_jsx("div", { children: props.title }), _jsx(Button, { onClick: props.onClose, icon: _jsx(Close, {}) })] }), _jsx("div", Object.assign({ className: `modal__body ${(_c = props.bodyClassName) !== null && _c !== void 0 ? _c : ''}`, ref: props.bodyRef }, props.bodyProps, { children: props.children })), props.footer && _jsx("div", { className: 'modal__footer', children: props.footer })] }) }), document.body);
};
//# sourceMappingURL=modal.js.map