import { jsx as _jsx } from "react/jsx-runtime";
import { ICON_COLOR } from '../menu';
export function Call({ color = ICON_COLOR, size = 16 }) {
    return (_jsx("svg", { width: size, height: size, viewBox: '0 0 16 16', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', children: _jsx("path", { d: 'M12.82 10.1733L11.1267 9.97999C10.72 9.93332 10.32 10.0733 10.0334 10.36L8.80669 11.5867C6.92003 10.6267 5.37336 9.08665 4.41336 7.19332L5.64669 5.95999C5.93336 5.67332 6.07336 5.27332 6.02669 4.86665L5.83336 3.18665C5.75336 2.51332 5.18669 2.00665 4.50669 2.00665H3.35336C2.60003 2.00665 1.97336 2.63332 2.02003 3.38665C2.37336 9.07999 6.92669 13.6267 12.6134 13.98C13.3667 14.0267 13.9934 13.4 13.9934 12.6467V11.4933C14 10.82 13.4934 10.2533 12.82 10.1733Z', fill: color }) }));
}
//# sourceMappingURL=call.js.map