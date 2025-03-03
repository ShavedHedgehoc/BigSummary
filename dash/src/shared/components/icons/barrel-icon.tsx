export default function BarrelIcon({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      className={`size-${size}`}
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
    >
      <path d="M160-120q-17 0-28.5-11.5T120-160q0-17 11.5-28.5T160-200h40v-240h-40q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h40v-240h-40q-17 0-28.5-11.5T120-800q0-17 11.5-28.5T160-840h640q17 0 28.5 11.5T840-800q0 17-11.5 28.5T800-760h-40v240h40q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440h-40v240h40q17 0 28.5 11.5T840-160q0 17-11.5 28.5T800-120H160Zm120-80h400v-240q-17 0-28.5-11.5T640-480q0-17 11.5-28.5T680-520v-240H280v240q17 0 28.5 11.5T320-480q0 17-11.5 28.5T280-440v240Zm200-120q50 0 85-34.5t35-83.5q0-39-22.5-67T480-620q-75 86-97.5 114.5T360-438q0 49 35 83.5t85 34.5ZM280-200v-560 560Z" />
    </svg>
  );
}
