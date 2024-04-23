import "./Card.css";
import { IRecord } from "../../services/SummaryService";

// import Status from "../status/Status";
import StateComponent from "../stateComponent/StateComponent";

interface CardProps {
  item: IRecord;
}
export default function Card(props: CardProps) {
  return (
    <div className="card_container">
      <div className="card_code_field">
        <div className="card_code_field_header">Код 1С</div>
        <div className="card_code_field_value">{props.item.product.code1C}</div>
      </div>
      <div className="card_marking_field">{props.item.product.marking}</div>
      <div className="card_boil_field">{props.item.boil.value}</div>
      <div className="card_plan_field">
        <div className="card_plan_field_header">План</div>
        <div className="card_plan_field_value">{props.item.plan}</div>
      </div>

      <div className="card_can_field">
        <div className="card_can_field_header">Аппарат</div>
        <div className="card_can_field_value">{props.item.apparatus.value}</div>
      </div>
      <div className="card_can_field">
        <div className="card_can_field_header">Емкость</div>
        <div className="card_can_field_value">{props.item.can.value}</div>
      </div>

      <div className="card_conveyor_field">
        <div className="card_conveyor_field_header">Конвейер</div>
        <div className="card_conveyor_field_value">{props.item.conveyor.value}</div>
      </div>
      {/* <div className="card_bbf_field">{props.item.bbf}</div> */}
      {/* <div className="card_note_field">{props.item.note}</div> */}
      {/* <div>
        <Status severity={"base_check"} />
      </div> */}
      <div className="card_status_field">
        {props.item.histories.length > 0 ? (
          //   ? props.item.histories[props.item.histories.length - 1].historyType.description

          <StateComponent historyRecord={props.item.histories[props.item.histories.length - 1]} />
        ) : (
          "-"
        )}
      </div>
    </div>
  );
}
