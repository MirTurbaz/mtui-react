import { jsx as _jsx } from "react/jsx-runtime";
import { ICON_COLOR } from '../menu';
export default function Email({ color = ICON_COLOR }) {
    return (_jsx("svg", { width: '20', height: '20', viewBox: '0 0 20 20', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', children: _jsx("path", { d: 'M18.3332 4.99998C18.3332 4.08331 17.5832 3.33331 16.6665 3.33331H3.33317C2.4165 3.33331 1.6665 4.08331 1.6665 4.99998V15C1.6665 15.9166 2.4165 16.6666 3.33317 16.6666H16.6665C17.5832 16.6666 18.3332 15.9166 18.3332 15V4.99998ZM16.6665 4.99998L9.99984 9.16665L3.33317 4.99998H16.6665ZM16.6665 15H3.33317V6.66665L9.99984 10.8333L16.6665 6.66665V15Z', fill: color }) }));
}
//# sourceMappingURL=email.js.map