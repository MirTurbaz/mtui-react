import * as React from 'react';
import { ICON_COLOR } from '../menu';

export function DoubleArrowLeft({ color = ICON_COLOR, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M6.521 10.0001L9.75016 13.2501C9.90294 13.4028 9.9828 13.5938 9.98975 13.823C9.99669 14.0521 9.91683 14.25 9.75016 14.4167C9.59738 14.5695 9.40294 14.6459 9.16683 14.6459C8.93072 14.6459 8.73627 14.5695 8.5835 14.4167L4.75016 10.5834C4.66683 10.5001 4.6078 10.4098 4.57308 10.3126C4.53836 10.2153 4.521 10.1112 4.521 10.0001C4.521 9.88894 4.53836 9.78477 4.57308 9.68755C4.6078 9.59033 4.66683 9.50005 4.75016 9.41672L8.5835 5.58338C8.73627 5.43061 8.92725 5.35074 9.15641 5.3438C9.38558 5.33686 9.5835 5.41672 9.75016 5.58338C9.90294 5.73616 9.97933 5.93061 9.97933 6.16672C9.97933 6.40283 9.90294 6.59727 9.75016 6.75005L6.521 10.0001ZM12.021 10.0001L15.2502 13.2501C15.4029 13.4028 15.4828 13.5938 15.4897 13.823C15.4967 14.0521 15.4168 14.25 15.2502 14.4167C15.0974 14.5695 14.9029 14.6459 14.6668 14.6459C14.4307 14.6459 14.2363 14.5695 14.0835 14.4167L10.2502 10.5834C10.1668 10.5001 10.1078 10.4098 10.0731 10.3126C10.0384 10.2153 10.021 10.1112 10.021 10.0001C10.021 9.88894 10.0384 9.78477 10.0731 9.68755C10.1078 9.59033 10.1668 9.50005 10.2502 9.41672L14.0835 5.58338C14.2363 5.43061 14.4272 5.35074 14.6564 5.3438C14.8856 5.33686 15.0835 5.41672 15.2502 5.58338C15.4029 5.73616 15.4793 5.93061 15.4793 6.16672C15.4793 6.40283 15.4029 6.59727 15.2502 6.75005L12.021 10.0001Z'
        fill={color}
      />
    </svg>
  );
}
