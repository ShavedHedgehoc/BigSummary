import { useDate } from "../use-date";

export default function Clock() {
  const { time } = useDate();
  return <div className=" text-2xl text-amber-600">{time}</div>;
}
