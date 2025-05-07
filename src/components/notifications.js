import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createPortal } from 'react-dom';
import { CheckCircle, Close, Error, Info, Warning } from './icons';
import { Button } from './button';
import { Flex } from './flex';
export const Notifications = (props) => {
    const icon = (type) => {
        if (type == 'info') {
            return _jsx(Info, {});
        }
        else if (type == 'success') {
            return _jsx(CheckCircle, {});
        }
        else if (type == 'warning') {
            return _jsx(Warning, {});
        }
        else if (type == 'danger') {
            return _jsx(Error, {});
        }
    };
    return createPortal(_jsx("div", { className: `notifications`, children: props.notifications.map((notification, index) => (_jsxs("div", { className: `notifications__item notifications__item-${notification.type}`, children: [_jsx("div", { className: 'notifications__item_icon', children: icon(notification.type) }), _jsxs(Flex, { vertical: true, gap: 'small', children: [_jsx("div", { className: `notifications__item_title ${!notification.message && 'margin-top-5'}`, children: notification.title }), notification.message && _jsx("div", { className: 'notifications__item_message', children: notification.message })] }), _jsx(Button, { height: 'small', onClick: () => props.deleteNotification(notification.id), children: _jsx(Close, {}) })] }, index))) }), document.body);
};
//# sourceMappingURL=notifications.js.map