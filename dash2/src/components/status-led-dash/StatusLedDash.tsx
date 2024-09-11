import { IRecord } from "../../services/SummaryService";
import StatusLed from "../status-led/StatusLed";
import "./StatusLedDash.css";

interface StatusLedDashProps {
  item: IRecord;
}
export default function StatusLedDash(props: StatusLedDashProps) {
  let className1 = "";
  let className2 = "";
  let className3 = "";

  const status = props.item.histories[props.item.histories.length - 1]?.historyType.value;
  switch (status) {
    case "base_fail":
      className1 = "fail";
      className2 = "danger";
      className3 = "danger";
      break;
    case "base_check":
      className1 = "wait";
      className2 = "undefined";
      className3 = "undefined";
      break;
    case "plug_pass":
      className1 = "good";
      className2 = "success";
      className3 = "success";
      break;
    case "product_fail":
      className1 = "good";
      className2 = "fail";
      className3 = "danger";
      break;
    case "product_check":
      className1 = "good";
      className2 = "wait";
      className3 = "undefined";
      break;
    case "product_pass":
      className1 = "good";
      className2 = "good";
      className3 = "success";
      break;
    case "product_in_progress":
      className1 = "good";
      className2 = "good";
      className3 = "good blink";
      break;
    case "product_finished":
      className1 = "good";
      className2 = "good";
      className3 = "good";
      break;

    default:
      className1 = "";
      className2 = "";
      className3 = "";
      break;
  }

  return (
    <div className="status_led_dash__container">
      <div>
        <StatusLed severity={className1} />
      </div>
      <div>
        <StatusLed severity={className2} />
      </div>
      <div>
        <StatusLed severity={className3} />
      </div>
    </div>
  );
}
