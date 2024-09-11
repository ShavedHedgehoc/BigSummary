import "./StatusLed.css";

interface StatusLedProps {
  severity: string;
}
export default function StatusLed(props: StatusLedProps) {
  // return <div className={`status ${props.severity}`}></div>;
  return <div className={`status ${props.severity}`}></div>;
}
