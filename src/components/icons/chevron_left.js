import { jsx as _jsx } from 'react/jsx-runtime';
import { DEFAULT_ICON_COLOR } from './common';
export default function ChevronLeft({ color = DEFAULT_ICON_COLOR, size = 18 }) {
  return _jsx('svg', {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    children: _jsx('path', {
      d: 'M14.71 6.71C14.32 6.32 13.69 6.32 13.3 6.71L8.71001 11.3C8.32001 11.69 8.32001 12.32 8.71001 12.71L13.3 17.3C13.69 17.69 14.32 17.69 14.71 17.3C15.1 16.91 15.1 16.28 14.71 15.89L10.83 12L14.71 8.12C15.1 7.73 15.09 7.09 14.71 6.71Z',
      fill: color,
    }),
  });
}
//# sourceMappingURL=chevron_left.js.map
