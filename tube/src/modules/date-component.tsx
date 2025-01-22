import { useDate } from "../use-date";

export default function DateComponent() {
  const { date } = useDate();
  return <div className="text-2xl text-amber-600">{date}</div>;
}
