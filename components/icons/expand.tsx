import { ICON_COLOR } from '../menu';

export default function Expand({ color = ICON_COLOR, className, rotated, size = 18 }) {
  const classNames = `${className} expand-icon ${rotated && 'expand-icon_rotated'}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={classNames}
    >
      <path
        d='M11.91 6.96751L9 9.87751L6.09 6.96751C5.7975 6.67501 5.325 6.67501 5.0325 6.96751C4.74 7.26001 4.74 7.73251 5.0325 8.02501L8.475 11.4675C8.7675 11.76 9.24 11.76 9.5325 11.4675L12.975 8.02501C13.2675 7.73251 13.2675 7.26001 12.975 6.96751C12.6825 6.68251 12.2025 6.67501 11.91 6.96751Z'
        fill={color}
      />
    </svg>
  );
}
