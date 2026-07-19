import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex } from '../flex';
export const Label = ({ children, icon, color, className }) => {
    const classes = ['status_label', `status_label__${color}`];
    if (className)
        classes.push(className);
    if (icon) {
        return (_jsxs(Flex, { gap: 'small', className: classes.join(' '), children: [icon, _jsx("div", { children: children })] }));
    }
    else {
        return _jsx("div", { className: classes.join(' '), children: children });
    }
};
//# sourceMappingURL=label.js.map