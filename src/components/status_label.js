import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex } from './flex';
export const STATUSES_CLASS_NAMES = {
    Новая: 'new',
    'Ожидает заезда': 'pending-arrival',
    Заехал: 'arrived',
    Выехал: 'done',
    Отменена: 'canceled',
    Незаезд: 'not-arrived',
};
export const StatusLabel = (props) => {
    let className, value;
    if (props.dummyStatus) {
        className = STATUSES_CLASS_NAMES[props.dummyStatus];
        if (className === 'new' && !props.isBooking) {
            className = 'blue';
        }
        value = props.dummyStatus;
        if (!className)
            return props.dummyStatus;
    }
    else {
        className = props.color;
        value = props.statusName;
    }
    if (props.icon) {
        return (_jsxs(Flex, { gap: 'small', className: `status_label status_label__${className} ${props.className}`, children: [props.icon, _jsx("div", { children: value })] }));
    }
    else {
        return _jsx("label", { className: `status_label status_label__${className} ${props.className}`, children: value });
    }
};
//# sourceMappingURL=status_label.js.map