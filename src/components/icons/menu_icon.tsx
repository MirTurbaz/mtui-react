import { ICON_COLOR } from '../menu';

export default function MenuIcon({ color = ICON_COLOR, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3 18H21C21.55 18 22 17.55 22 17C22 16.45 21.55 16 21 16H3C2.45 16 2 16.45 2 17C2 17.55 2.45 18 3 18ZM3 13H21C21.55 13 22 12.55 22 12C22 11.45 21.55 11 21 11H3C2.45 11 2 11.45 2 12C2 12.55 2.45 13 3 13ZM2 7C2 7.55 2.45 8 3 8H21C21.55 8 22 7.55 22 7C22 6.45 21.55 6 21 6H3C2.45 6 2 6.45 2 7Z'
        fill={color}
      />
    </svg>
  );
}
