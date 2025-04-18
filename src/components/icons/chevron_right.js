import { jsx as _jsx } from "react/jsx-runtime";
import { ICON_COLOR } from '../menu';
export default function ChevronRight({ color = ICON_COLOR, size = 18 }) {
    return (_jsx("svg", { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', children: _jsx("path", { d: 'M9.29 6.71C8.9 7.1 8.9 7.73 9.29 8.12L13.17 12L9.29 15.88C8.9 16.27 8.9 16.9 9.29 17.29C9.68 17.68 10.31 17.68 10.7 17.29L15.29 12.7C15.68 12.31 15.68 11.68 15.29 11.29L10.7 6.7C10.32 6.32 9.68 6.32 9.29 6.71Z', fill: color }) }));
}
//# sourceMappingURL=chevron_right.js.map