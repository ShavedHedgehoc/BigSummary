import { IHistory } from "../../services/SummaryService";
import StatusLedDash from "../status-led-dash/StatusLedDash";
// import StatusLed from "../status-led/StatusLed";
import "./StateComponent.css";

interface StateComponentProps {
  historyRecord: IHistory;
}
export default function StateComponent(props: StateComponentProps) {
  function isUpdated(createTime: Date): boolean {
    const currDateInMs = new Date().getTime();
    const createDateInMs = new Date(createTime).getTime();
    return currDateInMs - createDateInMs < 1000 * 60 * 5;
  }
  return (
    <div className="state_container">
      <div className="state_status">
        <StatusLedDash state={props.historyRecord.historyType.value} />
      </div>
      <div className="state_info">
        <div className={`state_description ${isUpdated(props.historyRecord.createdAt) && " blink"}`}>
          {props.historyRecord.historyType.description}
        </div>
        <div className={`state_time ${isUpdated(props.historyRecord.createdAt) && " blink"}`}>
          {new Date(props.historyRecord.createdAt).toLocaleTimeString("en-US", {
            timeZone: "Europe/Moscow",
            hour12: false,
          })}
        </div>
      </div>
    </div>
  );
}
