export default function Calendar({ color, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M7.5 8.33325V9.99992H5.83333V8.33325H7.5ZM10.8333 8.33325V9.99992H9.16667V8.33325H10.8333ZM14.1667 8.33325V9.99992H12.5V8.33325H14.1667ZM15.8333 2.49992C16.2754 2.49992 16.6993 2.67551 17.0118 2.98807C17.3244 3.30063 17.5 3.72456 17.5 4.16659V15.8333C17.5 16.2753 17.3244 16.6992 17.0118 17.0118C16.6993 17.3243 16.2754 17.4999 15.8333 17.4999H4.16667C3.24167 17.4999 2.5 16.7499 2.5 15.8333V4.16659C2.5 3.72456 2.67559 3.30063 2.98816 2.98807C3.30072 2.67551 3.72464 2.49992 4.16667 2.49992H5V1.66659C5 1.20635 5.3731 0.833252 5.83333 0.833252C6.29357 0.833252 6.66667 1.20635 6.66667 1.66659V2.49992H13.3333V1.66659C13.3333 1.20635 13.7064 0.833252 14.1667 0.833252C14.6269 0.833252 15 1.20635 15 1.66659V2.49992H15.8333ZM15.8333 15.8333V6.66658H4.16667V15.8333H15.8333ZM7.5 11.6666V13.3333H5.83333V11.6666H7.5ZM10.8333 11.6666V13.3333H9.16667V11.6666H10.8333ZM14.1667 11.6666V13.3333H12.5V11.6666H14.1667Z'
        fill={color}
      />
    </svg>
  );
}
