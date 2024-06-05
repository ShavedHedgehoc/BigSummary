import classes from "./userPane.module.css";

interface UserPaneProps {
  name: string;
  logout(): void;
}

export default function UserPane(props: UserPaneProps) {
  return (
    <div className={classes.user_pane_container}>
      <div className={classes.user_pane_name}>{props.name}</div>
      <button className={classes.user_pane_button} onClick={() => props.logout()}>
        Выход
      </button>
    </div>
  );
}
