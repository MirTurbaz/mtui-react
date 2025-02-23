import { ICON_COLOR } from '../menu';

export default function MoreVert({ color = ICON_COLOR }) {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M10 13.3333C10.442 13.3333 10.8659 13.5089 11.1785 13.8215C11.4911 14.134 11.6667 14.558 11.6667 15C11.6667 15.442 11.4911 15.8659 11.1785 16.1785C10.8659 16.4911 10.442 16.6666 10 16.6666C9.55797 16.6666 9.13404 16.4911 8.82148 16.1785C8.50892 15.8659 8.33333 15.442 8.33333 15C8.33333 14.558 8.50892 14.134 8.82148 13.8215C9.13404 13.5089 9.55797 13.3333 10 13.3333ZM10 8.33331C10.442 8.33331 10.8659 8.50891 11.1785 8.82147C11.4911 9.13403 11.6667 9.55795 11.6667 9.99998C11.6667 10.442 11.4911 10.8659 11.1785 11.1785C10.8659 11.4911 10.442 11.6666 10 11.6666C9.55797 11.6666 9.13404 11.4911 8.82148 11.1785C8.50892 10.8659 8.33333 10.442 8.33333 9.99998C8.33333 9.55795 8.50892 9.13403 8.82148 8.82147C9.13404 8.50891 9.55797 8.33331 10 8.33331ZM10 3.33331C10.442 3.33331 10.8659 3.50891 11.1785 3.82147C11.4911 4.13403 11.6667 4.55795 11.6667 4.99998C11.6667 5.44201 11.4911 5.86593 11.1785 6.17849C10.8659 6.49105 10.442 6.66665 10 6.66665C9.55797 6.66665 9.13404 6.49105 8.82148 6.17849C8.50892 5.86593 8.33333 5.44201 8.33333 4.99998C8.33333 4.55795 8.50892 4.13403 8.82148 3.82147C9.13404 3.50891 9.55797 3.33331 10 3.33331Z'
        fill={color}
      />
    </svg>
  );
}
