export default function BarcodeIcon({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      className={`size-${size}`}
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
    >
      <path d="M40-200v-560h80v560H40Zm120 0v-560h80v560h-80Zm120 0v-560h40v560h-40Zm120 0v-560h80v560h-80Zm120 0v-560h120v560H520Zm160 0v-560h40v560h-40Zm120 0v-560h120v560H800Z" />
      ;
    </svg>
  );
}
