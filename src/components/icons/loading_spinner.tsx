import { DEFAULT_ICON_COLOR, ISquareIconProps } from './common';

const RADIUS = 18;
const CIRCLE_LENGTH = Math.PI * RADIUS * 2;

interface ILoadingSpinnerProps extends ISquareIconProps {
  progress?: number;
}

export function LoadingSpinner({
  className = null,
  color = DEFAULT_ICON_COLOR,
  size = 40,
  progress = 0,
}: ILoadingSpinnerProps) {
  const length = Math.max(4, (progress / 100) * CIRCLE_LENGTH);

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <circle cx='20' cy='20' r={RADIUS} fill='none' stroke={color} strokeOpacity='0.12' strokeWidth='3' />
      <circle
        cx='20'
        cy='20'
        r={RADIUS}
        fill='none'
        stroke={color}
        strokeOpacity='0.64'
        strokeWidth='3'
        strokeDasharray={`${length} ${CIRCLE_LENGTH - length}`}
        strokeLinecap={'round'}
        style={{ transition: '0.3s' }}
        strokeDashoffset={CIRCLE_LENGTH / 4}
      />
    </svg>
  );
}
