import { DEFAULT_ICON_COLOR, ISquareIconProps } from './common';

export function FilePdf({ className = null, color = DEFAULT_ICON_COLOR, size = 16 }: ISquareIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M12.6667 2H3.33333C2.6 2 2 2.6 2 3.33333V12.6667C2 13.4 2.6 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667V3.33333C14 2.6 13.4 2 12.6667 2ZM6.33333 7.66667C6.33333 8.2 5.86667 8.66667 5.33333 8.66667H4.66667V10H3.66667V6H5.33333C5.86667 6 6.33333 6.46667 6.33333 7V7.66667ZM9.66667 9C9.66667 9.53333 9.2 10 8.66667 10H7V6H8.66667C9.2 6 9.66667 6.46667 9.66667 7V9ZM12.3333 7H11.3333V7.66667H12.3333V8.66667H11.3333V10H10.3333V6H12.3333V7ZM8 7H8.66667V9H8V7ZM4.66667 7H5.33333V7.66667H4.66667V7Z'
        fill={color}
      />
    </svg>
  );
}
