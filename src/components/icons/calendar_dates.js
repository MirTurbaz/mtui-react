import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { DEFAULT_ICON_COLOR } from './common';
export function CalendarDates({ className = null, color = DEFAULT_ICON_COLOR, size = 20 }: ISquareIconProps) {
  return _jsxs('svg', {
    width: size,
    height: size,
    viewBox: '0 0 20 20',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    children: [
      _jsx('path', { d: 'M5.41667 7.91665H8.75V10.4166H5.41667V7.91665Z', fill: color }),
      _jsx('path', {
        d: 'M6.25 13.75C6.01988 13.75 5.83333 13.5634 5.83333 13.3333C5.83333 13.1032 6.01988 12.9166 6.25 12.9166H10V13.75H6.25Z',
        fill: color,
      }),
      _jsx('path', {
        d: 'M10 9.58331H13.75C13.9801 9.58331 14.1667 9.39676 14.1667 9.16665C14.1667 8.93653 13.9801 8.74998 13.75 8.74998H10V9.58331Z',
        fill: color,
      }),
      _jsx('path', { d: 'M14.5833 12.0833H11.25V14.5833H14.5833V12.0833Z', fill: color }),
      _jsx('path', {
        fillRule: 'evenodd',
        clipRule: 'evenodd',
        d: 'M15.8333 2.49998H15V1.66665C15 1.20831 14.625 0.833313 14.1667 0.833313C13.7083 0.833313 13.3333 1.20831 13.3333 1.66665V2.49998H6.66667V1.66665C6.66667 1.20831 6.29167 0.833313 5.83333 0.833313C5.375 0.833313 5 1.20831 5 1.66665V2.49998H4.16667C3.24167 2.49998 2.50833 3.24998 2.50833 4.16665L2.5 15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V4.16665C17.5 3.24998 16.75 2.49998 15.8333 2.49998ZM15.8333 15C15.8333 15.4583 15.4583 15.8333 15 15.8333H5C4.54167 15.8333 4.16667 15.4583 4.16667 15V6.66665H15.8333V15Z',
        fill: color,
      }),
    ],
  });
}
//# sourceMappingURL=calendar_dates.js.map
