import { ISquareIconProps } from './common';

export function Info({ className = null, color = '#417EE1', size = 20 }: ISquareIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M9.99999 1.66667C5.39999 1.66667 1.66666 5.40001 1.66666 10C1.66666 14.6 5.39999 18.3333 9.99999 18.3333C14.6 18.3333 18.3333 14.6 18.3333 10C18.3333 5.40001 14.6 1.66667 9.99999 1.66667ZM10.8333 14.1667H9.16666V9.16667H10.8333V14.1667ZM10.8333 7.50001H9.16666V5.83334H10.8333V7.50001Z'
        fill={color}
      />
    </svg>
  );
}
