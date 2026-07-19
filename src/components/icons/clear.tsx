import { DEFAULT_ICON_COLOR, IRectangleIconProps, ISquareIconProps } from './common';

interface IClearProps extends IRectangleIconProps {
  bgColor?: string;
}

export function Clear({
  className = null,
  color = 'white',
  bgColor = 'rgba(0,0,0,0.32)',
  width = 25,
  height = 24,
}: IClearProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g clipPath='url(#clip0_1744_4363)'>
        <path
          d='M12.75 2C7.22 2 2.75 6.47 2.75 12C2.75 17.53 7.22 22 12.75 22C18.28 22 22.75 17.53 22.75 12C22.75 6.47 18.28 2 12.75 2ZM17.05 16.3C16.66 16.69 16.03 16.69 15.64 16.3L12.75 13.41L9.86 16.3C9.47 16.69 8.84 16.69 8.45 16.3C8.06 15.91 8.06 15.28 8.45 14.89L11.34 12L8.45 9.11C8.06 8.72 8.06 8.09 8.45 7.7C8.84 7.31 9.47 7.31 9.86 7.7L12.75 10.59L15.64 7.7C16.03 7.31 16.66 7.31 17.05 7.7C17.44 8.09 17.44 8.72 17.05 9.11L14.16 12L17.05 14.89C17.43 15.27 17.43 15.91 17.05 16.3Z'
          fill={bgColor}
        />
      </g>
      <defs>
        <clipPath id='clip0_1744_4363'>
          <rect width='24' height='24' fill={color} transform='translate(0.75)' />
        </clipPath>
      </defs>
    </svg>
  );
}
