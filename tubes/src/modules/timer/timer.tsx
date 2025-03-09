import { useDate } from "./use-date";

export default function Timer() {
  const { date, time } = useDate();
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-gray-900  px-4 py-4 gap-1">
      <div className="flex text-slate-300 text-2xl">{date}</div>
      <div className="flex text-slate-300 text-2xl">{time}</div>
    </div>
  );
}
