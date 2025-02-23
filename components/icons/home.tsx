export default function Home({ color }) {
  return (
    <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M9 14C9 13.4477 9.44772 13 10 13H14C14.5523 13 15 13.4477 15 14V19H18V10L12 5.5L6 10V19H9V14ZM6 21C4.89543 21 4 20.1046 4 19V10C4 9.37049 4.29639 8.77771 4.8 8.4L10.8 3.9C11.5111 3.36667 12.4889 3.36667 13.2 3.9L19.2 8.4C19.7036 8.77771 20 9.37049 20 10V19C20 20.1046 19.1046 21 18 21H6Z'
        fill={color}
      />
    </svg>
  );
}
