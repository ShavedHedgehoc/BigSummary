import * as React from "react";
import classes from "./mainInput.module.css";

interface MainInputProps {
  handleInput: (value: string) => void;
  isDisable: boolean;
}

export default function MainInput(props: MainInputProps) {
  const [inputField, setInputField] = React.useState("");
  const refInput = React.useRef<HTMLInputElement | null>(null);

  const focusInput = () => {
    refInput.current?.focus();
  };

  const clearInput = () => {
    setInputField("");
    focusInput();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.handleInput(inputField);
      clearInput();
    }
  };

  React.useEffect(() => {
    focusInput();
  }, []);

  React.useEffect(() => {
    !props.isDisable && focusInput();
  }, [props.isDisable]);

  return (
    <input
      className={classes.input}
      type="text"
      disabled={props.isDisable}
      ref={refInput}
      value={inputField}
      onChange={(e) => setInputField(e.target.value)}
      onKeyDown={(e) => handleInputKeyDown(e)}
    />
  );
}
