import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { DEFAULT_ICON_COLOR } from './common';
export default function Avatar({ color = DEFAULT_ICON_COLOR, size = 28 }) {
  return _jsxs('svg', {
    width: size,
    height: size,
    viewBox: '0 0 28 28',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    children: [
      _jsx('path', {
        d: 'M14 15.75C16.9879 15.75 19.4101 13.3995 19.4101 10.5C19.4101 7.60051 16.9879 5.25 14 5.25C11.012 5.25 8.58982 7.60051 8.58982 10.5C8.58982 13.3995 11.012 15.75 14 15.75Z',
        fill: color,
        fillOpacity: '0.32',
      }),
      _jsx('path', {
        d: 'M14 18.6667C9.80159 18.6667 5.98984 20.2731 3.18182 22.887C5.74948 26.009 9.64222 28 14 28C18.3577 28 22.2505 26.009 24.8181 22.887C22.0101 20.2731 18.1984 18.6667 14 18.6667Z',
        fill: color,
        fillOpacity: '0.32',
      }),
      _jsx('path', {
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        d: 'M14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0Z',
        fill: color,
        fillOpacity: '0.04',
      }),
      _jsx('path', {
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        d: 'M1 14C1 21.1797 6.8203 27 14 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 14 1C6.8203 1 1 6.8203 1 14ZM14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0Z',
        fill: color,
        fillOpacity: '0.12',
      }),
    ],
  });
}
//# sourceMappingURL=avatar.js.map
