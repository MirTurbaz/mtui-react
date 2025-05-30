import { jsx as _jsx } from "react/jsx-runtime";
import { ICON_COLOR } from '../menu';
export default function Close({ color = ICON_COLOR, size = 20 }) {
    return (_jsx("svg", { width: size, height: size, viewBox: '0 0 20 20', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', children: _jsx("path", { d: 'M15.2496 4.75831C14.9246 4.43331 14.3996 4.43331 14.0746 4.75831L9.99961 8.82498L5.92461 4.74998C5.59961 4.42498 5.07461 4.42498 4.74961 4.74998C4.42461 5.07498 4.42461 5.59998 4.74961 5.92498L8.82461 9.99998L4.74961 14.075C4.42461 14.4 4.42461 14.925 4.74961 15.25C5.07461 15.575 5.59961 15.575 5.92461 15.25L9.99961 11.175L14.0746 15.25C14.3996 15.575 14.9246 15.575 15.2496 15.25C15.5746 14.925 15.5746 14.4 15.2496 14.075L11.1746 9.99998L15.2496 5.92498C15.5663 5.60831 15.5663 5.07498 15.2496 4.75831Z', fill: color }) }));
}
//# sourceMappingURL=close.js.map