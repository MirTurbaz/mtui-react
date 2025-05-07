var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
    return t;
  };
import { jsx as _jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
export const Button = (_a) => {
  var { variant = 'link', height = 'default', color = 'default', toggled = false } = _a,
    props = __rest(_a, ['variant', 'height', 'color', 'toggled']);
  const [clicked, setClicked] = useState(false);
  const classes = ['button', `button_variant_${variant}`, `button_height_${height}`, `button_color_${color}`];
  if (props.size) classes.push(`button_size_${props.size}`);
  if (props.padding) classes.push(`button_p_${props.padding}`);
  if (props.className) classes.push(props.className);
  if (props.disabled) classes.push('disabled');
  if (toggled) classes.push('button_pressed');
  if (clicked) classes.push('clicked');
  const className = classes.join(' ');
  if (props.href && !props.native) {
    return _jsx(NavLink, {
      style: props.style,
      to: props.href,
      ref: props.btnRef,
      onClick: (e) => {
        var _a;
        (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props, e);
        setClicked(true);
        setTimeout(() => setClicked(false), 100);
      },
      className: className,
      target: props.target,
      children: props.children,
    });
  } else {
    return _jsx('a', {
      style: props.style,
      href: props.href,
      ref: props.btnRef,
      onClick: (e) => {
        var _a;
        (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props, e);
        setClicked(true);
        setTimeout(() => setClicked(false), 100);
      },
      className: className,
      target: props.target,
      title: props.title,
      onMouseEnter: props.onMouseEnter,
      onMouseLeave: props.onMouseLeave,
      children: props.children,
    });
  }
};
//# sourceMappingURL=button.js.map
