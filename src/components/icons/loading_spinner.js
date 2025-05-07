import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DEFAULT_ICON_COLOR } from './common';
const RADIUS = 18;
const CIRCLE_LENGTH = Math.PI * RADIUS * 2;
export function LoadingSpinner({ className = null, color = DEFAULT_ICON_COLOR, size = 40, progress = 0, }) {
    const length = Math.max(4, (progress / 100) * CIRCLE_LENGTH);
    return (_jsxs("svg", { width: size, height: size, viewBox: '0 0 40 40', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', className: className, children: [_jsx("circle", { cx: '20', cy: '20', r: RADIUS, fill: 'none', stroke: color, strokeOpacity: '0.12', strokeWidth: '3' }), _jsx("circle", { cx: '20', cy: '20', r: RADIUS, fill: 'none', stroke: color, strokeOpacity: '0.64', strokeWidth: '3', strokeDasharray: `${length} ${CIRCLE_LENGTH - length}`, strokeLinecap: 'round', style: { transition: '0.3s' }, strokeDashoffset: CIRCLE_LENGTH / 4 })] }));
}
//# sourceMappingURL=loading_spinner.js.map