import { jsx as _jsx } from "react/jsx-runtime";
import { ICON_COLOR } from '../menu';
export default function SquareEditOutline({ color = ICON_COLOR, size = 16 }) {
    return (_jsx("svg", { width: size, height: size, viewBox: '0 0 16 16', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', children: _jsx("path", { d: 'M3.33333 2C2.59333 2 2 2.59333 2 3.33333V12.6667C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14H12.6667C13.0203 14 13.3594 13.8595 13.6095 13.6095C13.8595 13.3594 14 13.0203 14 12.6667V8H12.6667V12.6667H3.33333V3.33333H8V2H3.33333ZM11.8533 2.66667C11.74 2.66667 11.62 2.71333 11.5333 2.8L10.72 3.60667L12.3867 5.27333L13.2 4.46667C13.3733 4.29333 13.3733 4 13.2 3.83333L12.1667 2.8C12.08 2.71333 11.9667 2.66667 11.8533 2.66667ZM10.2467 4.08L5.33333 9V10.6667H7L11.9133 5.74667L10.2467 4.08Z', fill: color }) }));
}
//# sourceMappingURL=square_edit_outline.js.map