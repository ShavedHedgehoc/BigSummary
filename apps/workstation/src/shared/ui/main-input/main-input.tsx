import * as React from 'react';
import classes from './mainInput.module.css';

interface MainInputProps {
  handleInput: (value: string) => void;
  isDisable: boolean;
}

export function MainInput(props: MainInputProps) {
  const [inputField, setInputField] = React.useState('');
  const refInput = React.useRef<HTMLInputElement | null>(null);

  const focusInput = () => {
    refInput.current?.focus();
  };

  const clearInput = () => {
    setInputField('');
    focusInput();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.handleInput(inputField);
      clearInput();
    }
  };

  React.useEffect(() => {
    focusInput();
  }, []);

  React.useEffect(() => {
    if (!props.isDisable) {
      focusInput();
    }
  }, [props.isDisable]);

  return (
    <input
      id="mainInput"
      className={classes.input}
      type="text"
      ref={refInput}
      value={inputField}
      onChange={(e) => setInputField(e.target.value)}
      onKeyDown={(e) => handleInputKeyDown(e)}
    />
  );
}
