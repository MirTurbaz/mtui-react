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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Expand } from '../icons';
export const Button = (_a) => {
    var { variant = 'link', size = 'middle', color = 'default', htmlType = 'button', toggled = false, icon = null } = _a, props = __rest(_a, ["variant", "size", "color", "htmlType", "toggled", "icon"]);
    const [clicked, setClicked] = useState(false);
    let buttonType;
    if (!props.children && icon) {
        buttonType = 'icon-only';
    }
    else if (props.children && icon) {
        buttonType = 'label-with-icon';
    }
    else {
        buttonType = 'label-only';
    }
    const classes = [
        'button',
        `button_variant_${variant}`,
        `button_size_${size}`,
        `button_color_${color}`,
        `button_type_${buttonType}`,
    ];
    if (props.className)
        classes.push(props.className);
    if (props.disabled)
        classes.push('button--disabled');
    if (props.fullWidth)
        classes.push('button--full-width');
    if (props.dropdown)
        classes.push('button--with-dropdown');
    if (props.dropdown && props.opened)
        classes.push('button--dropdown-opened');
    if (toggled)
        classes.push('button--pressed');
    if (clicked)
        classes.push('button--clicked');
    const className = classes.join(' ');
    const renderChildren = () => (_jsxs(_Fragment, { children: [icon, props.children ? _jsx("span", { children: props.children }) : null, props.dropdown ? _jsx(Expand, { rotated: props.opened }) : null] }));
    if (!props.href) {
        return (_jsx("button", { className: className, style: props.style, type: htmlType, ref: props.btnRef, title: props.title, onMouseEnter: props.onMouseEnter, onMouseLeave: props.onMouseLeave, onClick: (e) => {
                var _a;
                (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props, e);
                setClicked(true);
                setTimeout(() => setClicked(false), 100);
            }, children: renderChildren() }));
    }
    else if (!props.native) {
        return (_jsx(NavLink, { className: className, style: props.style, ref: props.btnRef, to: props.href, target: props.target, onClick: (e) => {
                var _a;
                (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props, e);
                setClicked(true);
                setTimeout(() => setClicked(false), 100);
            }, children: renderChildren() }));
    }
    else {
        return (_jsx("a", { className: className, style: props.style, ref: props.btnRef, title: props.title, href: props.href, target: props.target, onMouseEnter: props.onMouseEnter, onMouseLeave: props.onMouseLeave, onClick: (e) => {
                var _a;
                (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props, e);
                setClicked(true);
                setTimeout(() => setClicked(false), 100);
            }, children: renderChildren() }));
    }
};
//# sourceMappingURL=button.js.map