// import * as React from "react";
import classes from "./message.module.css";

interface MessageProps {
  message: string[];
  severity: string;
  visible: boolean;
}

export default function Message(props: MessageProps) {
  return (
    <div className={props.visible ? classes.message_pane : classes.message_pane_hide}>
      <div className={classes.message_container}>
        {props.severity === "success" && props.visible && <div className={classes.success}>Успешный успех!</div>}
        {props.severity === "fail" && props.visible && <div className={classes.fail}>Ошибка!</div>}
        <div className={classes.message_text}>
          {props.message.map((msg) => (
            <p key={msg}> - {msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
