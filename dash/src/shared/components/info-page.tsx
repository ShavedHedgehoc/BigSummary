export default function InfoPage({ message }: { message: string }) {
  return (
    <div className=" h-dvh bg-gray-950 overflow-hidden flex flex-col justify-center items-center w-full">
      <div className="text-slate-50 text-4xl flex m-auto text-center p-4">{message}</div>
    </div>
  );
}
