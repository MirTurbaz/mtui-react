import { jsx as _jsx } from "react/jsx-runtime";
import { DEFAULT_ICON_COLOR } from './common';
function Remove({ className = null, color = DEFAULT_ICON_COLOR, size = 20 }) {
    return (_jsx("svg", { width: size, height: size, viewBox: '0 0 20 20', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', className: className, children: _jsx("path", { d: 'M15 10.8333H5.00002C4.54169 10.8333 4.16669 10.4583 4.16669 10C4.16669 9.54167 4.54169 9.16667 5.00002 9.16667H15C15.4584 9.16667 15.8334 9.54167 15.8334 10C15.8334 10.4583 15.4584 10.8333 15 10.8333Z', fill: color }) }));
}
const Minus = Remove;
export { Minus, Remove };
//# sourceMappingURL=remove.js.map