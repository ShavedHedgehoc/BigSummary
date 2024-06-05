import * as React from "react";
import classes from "./message.module.css";

interface MessageProps {
  message: string;
  severity: string;
}

export default function Message(props: MessageProps) {
  return (
    <div className={classes.message_container}>
      {props.severity === "success" && <div className={classes.success}>Успешный успех!</div>}
      {props.severity === "fail" && <div className={classes.fail}>Печаль-беда!</div>}
      <div className={classes.message_text}>
        <p>{props.message}</p>
      </div>
    </div>
  );
}
